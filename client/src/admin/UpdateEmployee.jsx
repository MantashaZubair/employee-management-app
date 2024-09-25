import React, { useEffect, useState } from "react";
import "./UpdateProfile.css";
import { ToastContainer } from "react-toastify";
import { handleError } from "../utils";
import axios from "axios";

const UpdateEmployee = ({
  employeeobj,
  setProfileUpdate,
  handleUpdateProfile,
}) => {
  const [employee, setEmployee] = useState({
    name: "",
    phone: "",
    dob: "",
    location: "",
    salary: "",
    department: "",
    profileImage: null,
  });
  const [category, setCategory] = useState([]);
  const authToken = localStorage.getItem("token");

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
  };

  useEffect(() => {
    if (employeeobj) {
      setEmployee(employeeobj);
    }
  }, [employeeobj]);

  const getAllCategory = async () => {
    try {
      const response = await axios.get(
        "https://employee-management-app-wnce.onrender.com/api/v8/category/get-category",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setCategory(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  console.log(employee.department)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create a FormData object to handle both text and file data
      const formData = new FormData();

      // Append only non-empty fields
      if (employee.name) formData.append("name", employee.name);
      if (employee.phone) formData.append("phone", employee.phone);
      if (employee.dob) formData.append("dob", employee.dob);

      if (employee.location) formData.append("location", employee.location);
      if (employee.salary) formData.append("salary", employee.salary);
      if (employee.department) formData.append("department", employee.department);

      // Append the profile image file (if any)
      if (employee.profileImage) {
        formData.append("profileImage", employee.profileImage);
      }
      const updateUser = await axios.put(
        `http://localhost:8082/api/v8/user/${employee._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data", // Set the correct content type for file upload
          },
        }
      );

      console.log(updateUser.data);

      // Update local storage and parent component
      handleUpdateProfile(updateUser.data); // Call parent function to update the Profile component
      setProfileUpdate(false);
    } catch (error) {
      if (error.response) {
        console.log("Response error:", error.response.data);
        console.log("Status code:", error.response.status);
        handleError(
          `Error: ${error.response.data.message || error.response.data.details[0].message || "Something went wrong"}`
        );
      } else if (error.request) {
        console.log("No response from server:", error.request);
        handleError("No response from server. Please try again later.");
      } else {
        console.log("Error:", error.message);
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
                value={employee.name || ""}
                onChange={handleChange}
              />
            </div>

            <div className="input-form">
              <label className="form-label">Phone:</label>
              <input
                type="text"
                name="phone"
                value={employee.phone || ""}
                onChange={handleChange}
              />
            </div>

            <div className="input-form">
              <label className="form-label">Dob:</label>
              <input
                type="date"
                name="dob"
                value={employee.dob || ""}
                onChange={handleChange}
              />
            </div>

            <div className="input-form">
              <label className="form-label">Location:</label>
              <input
                type="text"
                name="location"
                value={employee.location || ""}
                onChange={handleChange}
              />
            </div>

            <div className="input-form">
              <label className="form-label">Salary:</label>
              <input
                type="text"
                name="salary"
                value={employee.salary || ""}
                onChange={handleChange}
              />
            </div>

            <div className="input-form">
              <label className="form-label">Department:</label>
              <select
                name="department"
                className="department"
                value={employee.department || ""}
                onChange={handleChange}
              >
                <option value="">Select a department</option>
                {category.length > 0 &&
                  category.map((citem) => (
                    <option key={citem._id} value={citem._id}>
                      {citem.department}
                    </option>
                  ))}
              </select>
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
        <ToastContainer />
      </div>
    </>
  );
};

export default UpdateEmployee;
