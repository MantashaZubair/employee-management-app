import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UpdateProfile.css';
import { ToastContainer } from 'react-toastify';
import { handleError } from '../../utils';
const UpdateUser = ({ setProfileUpdate, employeeobj, handleUpdateProfile }) => {
  const [employee, setEmployee] = useState({
    name: '',
    phone: '',
    dob: '',
    location: '',
    profileImage: null,
  });
  const authToken = localStorage.getItem('token');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const handleFileChange = (e) => {
    setEmployee((prevState) => ({
      ...prevState,
      profileImage: e.target.files[0],
    }));
  }

  useEffect(() => {
    if (employeeobj) {
      setEmployee(employeeobj);
    }
  }, [employeeobj]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(typeof employee._id)
  //   try {
  //     console.log(employee.profileImage)
  //     const { _id, profileImage, ...updateData } = employee;

  //     // const employeeData = {
  //     //   ...employee,
  //     //   phone: employee.phone.toString(),
  //     // };
  //     // Ensure the phone is in the correct format, and dob is formatted if required
  //     updateData.phone = employee.phone.toString();
      
  //     const updateUser = await axios.put(
  //       `http://localhost:8082/api/v8/user/${_id}`, 
  //       updateData,
  //       { 
  //         headers: {
  //           Authorization: `Bearer ${authToken}`,
  //           'Content-Type': 'application/json'
  //         }
  //       }
      
  //     );
  //     console.log(updateData)

  //     // Update local storage and parent component
  //     localStorage.setItem('user', JSON.stringify(updateUser.data));
  //     handleUpdateProfile(updateUser.data); // Call parent function to update the Profile component
  //     setProfileUpdate(false);
  //   } catch (error) {
  //     if (error.response) {
  //       // Server responded with a status other than 2xx
  //       console.log('Response error:', error.response.data); // Specific error message from the server
  //       console.log('Status code:', error.response.status); // HTTP status code
  //       handleError(`Error: ${error.response.data.message || error.response.data.details[0].message || "Something went wrong"}`); // Show message to user
  //     } else if (error.request) {
  //       // No response from the server
  //       console.log('No response from server:', error.request);
  //       handleError("No response from server. Please try again later.");
  //     } else {
  //       // Other errors, e.g., request configuration or network issues
  //       console.log('Error:', error.message);
  //       handleError(`Unexpected error: ${error.message}`);
      
  //   }
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Create a FormData object to handle both text and file data
      const formData = new FormData();
  
      // Append only non-empty fields
      if (employee.name) formData.append('name', employee.name);
      if (employee.phone) formData.append('phone', employee.phone);
      if (employee.dob) formData.append('dob', employee.dob);
      if (employee.location) formData.append('location', employee.location);
  
      // Append the profile image file (if any)
      if (employee.profileImage) {
        formData.append('profileImage', employee.profileImage);
      }
  
      const updateUser = await axios.put(
        `http://localhost:8082/api/v8/user/${employee._id}`, 
        formData, 
        { 
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'multipart/form-data', // Set the correct content type for file upload
          }
        }
      );
  
      console.log(updateUser.data);
  
      // Update local storage and parent component
      localStorage.setItem('user', JSON.stringify(updateUser.data));
      handleUpdateProfile(updateUser.data); // Call parent function to update the Profile component
      setProfileUpdate(false);
    } catch (error) {
      if (error.response) {
        console.log('Response error:', error.response.data); 
        console.log('Status code:', error.response.status); 
        handleError(`Error: ${error.response.data.message || error.response.data.details[0].message || "Something went wrong"}`);
      } else if (error.request) {
        console.log('No response from server:', error.request);
        handleError("No response from server. Please try again later.");
      } else {
        console.log('Error:', error.message);
        handleError(`Unexpected error: ${error.message}`);
      }
    }
  };
  
  
  return (
    <>
      <div className="add-popup">
        <form className="addpopup-container" onSubmit={handleSubmit}>
          <div className="addpopup-title">
            <h2>Update Employee</h2>
            <span className="cross-btn" onClick={() => setProfileUpdate(false)}>
              ❌
            </span>
          </div>
          <div className="input-controls">
            <div className="input-form">
              <label className="form-label">Name:</label>
              <input
                type="text"
                name="name"
                value={employee.name || ''}
                onChange={handleChange}
              />
            </div>

            <div className="input-form">
              <label className="form-label">Phone:</label>
              <input
                type="text"
                name="phone"
                value={employee.phone || ''}
                onChange={handleChange}
              />
            </div>

            <div className="input-form">
              <label className="form-label">Dob:</label>
              <input
                type="date"
                name="dob"
                value={employee.dob || ''}
                onChange={handleChange}
              />
            </div>

            <div className="input-form">
              <label className="form-label">Location:</label>
              <input
                type="text"
                name="location"
                value={employee.location || ''}
                onChange={handleChange}
              />
            </div>
            <div className="input-form">
              <label className="form-label">Profile Image:</label>
              <input
                type="file"
                name="profileImage"
                onChange={handleFileChange}
              />
            </div>
            <button type="submit" className="save-btn">
              Update
            </button>
          </div>
          
        </form>
        <ToastContainer/>
      </div>
    </>
  );
};

export default UpdateUser;
