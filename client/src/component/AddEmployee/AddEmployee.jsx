import React, { useEffect, useState } from "react";
import "./AddEmployee.css";
// import axios from "axios"
const AddEmployee = ({ setAddEmployee,employeeobj,setEmployeeObj, getAllData}) => {
  const [updateMode,setUpdatemode]=useState(false)
  const [employee, setEmployee] = useState({
    name:'',
    email:"",
    phone:'',
    department:'',
    salary:'',
    
});



const handleChange = (e) => {
  const { name, value } = e.target;
  setEmployee(prevState => ({
    ...prevState,
    [name]: value
  }));
};

// const handleFileChange = (e) => {
//   setEmployee((prevState) => ({
//     ...prevState,
//     photo: e.target.files[0],
//   }));
// };

useEffect(() => {
  if (employeeobj) {
    setEmployee(employeeobj);
    setUpdatemode(true);
  } 
}, [employeeobj]);
 

  const resetEmployeeStates = () => {
    setEmployee({
        name: '',
        email: '',
        phone: '',
        department: '',
        salary: '',
  
    })
}
  // console.log(updateMode)
   const handleCrossClick = () => {
    setAddEmployee(false);
    resetEmployeeStates();
    setUpdatemode(false)
   setEmployeeObj(null)
  };

  const handleSubmit =async(e)=>{
    e.preventDefault()
    try {
      const postOption={
        method:"POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee),     
      }
      const putOption={
        method:"PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee),     
      }
    const response= updateMode?await fetch(`http://localhost:8082/api/v8/user/${employee._id}`,putOption)
    :await fetch("http://localhost:8082/api/v8/user",postOption) 
      // console.log(response)
      const data= await response.json()
      console.log(data)
      setAddEmployee(false);
      resetEmployeeStates(); 
      getAllData() 
      setUpdatemode(false)
      setEmployeeObj(null)
    } catch (error) {
      console.log(error)
    }
  }

  


  return (
    <>
      <div className=" add-popup">
        <form className="addpopup-container" onSubmit={(e)=>handleSubmit(e)}>
          <div className="addpopup-title">
            <h2>{updateMode?"Update Employee":"Add Employee"}</h2>
            <span className="cross-btn" onClick={handleCrossClick}>
              ❌
            </span>
          </div>
          <div className="input-controls">
            <div className="input-form">
              <label className="form-label">Name:</label>
              <input
                type="text"
                name="name"
                value={employee.name||''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-form">
              <label className="form-label">Email:</label>
              <input
                type="email"
                name="email"
                value={employee.email||''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-form">
              <label className="form-label">Phone:</label>
              <input
                type="text"
                name="phone"
                value={employee.phone||''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-form">
              <label className="form-label">Department:</label>
              {/* <select name="department" className="department">
                   <option value="manager">Manager</option>
                   <option value="manager">Hr</option>
                   <option value="manager">Employee</option>
              </select> */}
              <input
                type="text"
                name="department"
                value={employee.department||''}
                onChange={handleChange}
               
              />
            </div>
            <div className="input-form">
              <label className="form-label">Salary:</label>
              <input
                type="text"
                name="salary"
                value={employee.salary||''}
                onChange={handleChange}
            
              />
            </div>
           {/* <div className="input-form">
              <label className="form-label">Profile Image:</label>
              <input
                type="file"
                name="profileImage"
                 onChange={handleFileChange}
              />
            </div> */}
            <button type="submit" className="save-btn">
              {updateMode ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddEmployee;
