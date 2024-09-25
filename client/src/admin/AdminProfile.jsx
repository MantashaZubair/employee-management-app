import React, { useState } from 'react';
  import { MdOutlineDateRange, MdOutlineLocationOn } from 'react-icons/md';
  import './AdminProfile.css'; // Profile page styles
  import profilepic from '../images/sideimage.jpg';
  // import { handleSuccess } from '../../utils';
  import { ToastContainer } from 'react-toastify';
import AdminMenu from '../component/AdminMenu';
import { handleSuccess } from '../utils';
import UpdateUser from '../component/user/UpdateUser';

  

const AdminProfile = () => {
  const [profileUpdate, setProfileUpdate] = useState(false);


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
    return (
      <div className="userContainer">
       <button className='toggle-button' onClick={toggleSidebar}>
       { isSidebarActive? <>X</>: <>☰</>}
      </button>
      <div className={`sidebar ${isSidebarActive ? 'active' : ''}`}>
        <AdminMenu />
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
            {/* <p>Salary: {auth.salary ? auth.salary : 'Restricted'}</p>
            <p>Department: {auth.department ? auth.department : 'Restricted'}</p> */}
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
  
}

export default AdminProfile