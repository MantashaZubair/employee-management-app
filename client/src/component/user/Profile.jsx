import React, { useState, useEffect } from 'react';
import { MdOutlineDateRange, MdOutlineLocationOn } from 'react-icons/md';
import UserMenu from '../UserMenu';
import './Profile.css'; // Profile page styles
import profilepic from '../../images/sideimage.jpg';
import UpdateUser from './UpdateUser';
import { handleSuccess } from '../../utils';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';

const Profile = () => {
  const [profileUpdate, setProfileUpdate] = useState(false);
  const [departmentName, setDepartmentName] = useState('');
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  // Function to update profile data in localStorage
  const handleUpdateProfile = (updatedUserData) => {
    localStorage.setItem('user', JSON.stringify(updatedUserData));
    setAuth(updatedUserData); // Update state to trigger re-render with new data
    handleSuccess(`success: User Updated`)
  };

    // Fetch department details by ID
    const getDepartmentById = async (departmentId) => {
      try {
        const response = await axios.get(`https://employee-management-app-wnce.onrender.com/api/v8/category/getsinglecategory/${departmentId}`);
        console.log(response.data.getsingle.department)
        setDepartmentName(response.data.getsingle.department); // Assuming response contains department name
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
      if (auth?.department) {
        getDepartmentById(auth.department);
      }
    }, [auth?.department]);

  return (
    <div className="userContainer">
          <button className='toggle-button' onClick={toggleSidebar}>
       { isSidebarActive? <>X</>: <>☰</>}
      </button>
      <div className={`sidebar ${isSidebarActive ? 'active' : ''}`}>
        <UserMenu />
      </div>
      <div className="content">
        <div className="profile-card">
          <div>
            <img src={auth.profileImage ||profilepic} alt="Profile" className="profile-image" />
          </div>
          <div className="contentbox">
            <h1>Role: {auth.isAdmin === false ? 'Employee' : 'Admin'}</h1>
            <h2>@{auth.username}</h2>
            <p>Name: {auth.name||'update your name'}</p>
            <p>Email: {auth.email}</p>
            <p>Phone: {auth.phone}</p>
            <div className="datelocation">
              <span>
                <MdOutlineDateRange className="profileicon" />
                {auth.dob || ''}
              </span>
              <span>
                <MdOutlineLocationOn className="profileicon" />
                {auth.location || ''}
              </span>
            </div>
            <p>Salary: {auth.salary ? auth.salary : 'Restricted'}</p>
            <p>Department: {departmentName || 'Restricted'}</p>
            <p>Join Date: {auth.createdAt}</p>
          </div>
          <button className="btn update-btn" onClick={() => setProfileUpdate(true)}>
            Update Profile
          </button>
        </div>
        {profileUpdate ? (
          <UpdateUser
            employeeobj={auth}
            setProfileUpdate={setProfileUpdate}
            handleUpdateProfile={handleUpdateProfile} // Pass the update function
          />
        ) : null}
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Profile;
