import React, { useState } from 'react'
import "./Auth.css"
import sideimage from "../images/sideimage.jpg"
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils'
const Login = () => {
  const [form,setForm]=useState({
    username:"",
    password:"",
  })
  const navigate= useNavigate()
  const handleChange=(e)=>{
    const {name, value}=e.target
     setForm((pre)=>({...pre, [name]:value}))
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      // const postOption={
      //   method:"POST",
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(form),     
      // }
      const response= await axios.post(`https://employee-management-app-wnce.onrender.com/api/v8/auth/login`, form, {withCredentials: true})
      console.log(response)
      if(response.status===200){
        localStorage.setItem('username', response.data.username.username);
        localStorage.setItem('userAdmin', response.data.username.isAdmin);
        localStorage.setItem('user', JSON.stringify(response.data.username));
        localStorage.setItem('token', response.data.token);
         handleSuccess(`success: ${response.data.message}`)
         if (response.data.username.isAdmin) {
          setTimeout(() => {
            navigate("/dashboard/admin");
          }, 1000);
        } else {
          setTimeout(() => {
            navigate("/dashboard/user");
          }, 1000);
        }
      }   

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
    <div>
    <ToastContainer/>
    <div className='auth-container'>
          <div className='auth-box'>
          <div className='auth-card'>
          <div className='picture'>
            <img src ={sideimage} alt='sideImage'/>
          </div>
          <form className='form-container' onSubmit={(e)=>handleSubmit(e)}>
               
                 <h1 className='auth-page'>Login</h1>
                 <input placeholder="Enter your Username" value={form.username} name="username" onChange={handleChange}/>
            <input placeholder="Enter your Password" value={form.password} name="password" onChange={handleChange} />
                <button type='submit' className='btn-auth'>Login</button>
                <p style={{color:"gray", marginTop:"10px"}}>Don't have an account?<NavLink to={"/signup"} style={{textDecoration:"none" ,color:"#1758f0", marginLeft:"4px", fontSize:"18px"}}>signup</NavLink></p>
               
          </form>
          </div>
          </div>
          </div>
    </div>
  )
}

export default Login
