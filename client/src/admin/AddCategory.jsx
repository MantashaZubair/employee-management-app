import React, { useEffect, useState } from 'react'
import { handleError } from '../utils';
import { ToastContainer } from 'react-toastify';

const AddCategory = ({setAddCategory, categoryObj, setCategoryObj, getAllCategory}) => {
    const [category, setCategory] = useState({
        department:'',  
    });
    const authToken = localStorage.getItem('token');
    const [updateMode,setUpdatemode]=useState(false)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory(prevState => ({
          ...prevState,
          [name]: value
        }));
      };

      
      useEffect(() => {
        if (categoryObj) {
          setCategory(categoryObj);
          setUpdatemode(true);
        } 
      }, [categoryObj]);
 
      
      const resetEmployeeStates = () => {
        setCategory({  
            department: '',
        })
    }

    const handleCrossClick = () => {
        setAddCategory(false);
        resetEmployeeStates();
        setUpdatemode(false)
        setCategoryObj(null)
      };
    

      
      const handleSubmit =async(e)=>{
        e.preventDefault()
        try {
          const postOption={
            method:"POST",
            headers: { 'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
              },
            body: JSON.stringify(category),     
          }
          const putOption={
            method:"PUT",
            headers: { 'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
              },
            body: JSON.stringify(category),     
          }
        const response= updateMode?await fetch(`https://employee-management-app-wnce.onrender.com/api/v8/category/update-category/${category._id}`,putOption)
        :await fetch("https://employee-management-app-wnce.onrender.com/api/v8/category/create-category",postOption) 
          // console.log(response)
          const data= await response.json()
          console.log(data)
          setAddCategory(false);
          resetEmployeeStates(); 
          getAllCategory() 
          setUpdatemode(false)
          setCategoryObj(null)
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 2xx
                console.log('Response error:', error.response.data); // Specific error message from the server
                console.log('Status code:', error.response.status); // HTTP status code
                handleError(`Error: ${error.response.data.message || error.response.data.details[0].message || "Something went wrong"}`); // Show message to user
              } else if (error.request) {
                // No response from the server
                console.log('No response from server:', error.request);
                handleError("No response from server. Please try again later.");
              } else {
                // Other errors, e.g., request configuration or network issues
                console.log('Error:', error.message);
                handleError(`Unexpected error: ${error.message}`);
              
            }
        }
      }

  return (
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
                <label className="form-label">Department:</label> 
              <input
                type="text"
                name="department"
                value={category.department||''}
                onChange={handleChange}
               
              />
            </div>
            
            
            <button type="submit" className="save-btn">
              {updateMode ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
        <ToastContainer/>
      </div>
  )
}

export default AddCategory
