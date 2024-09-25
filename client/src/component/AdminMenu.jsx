import React from 'react'
import { NavLink } from 'react-router-dom'
import { handleSuccess } from '../utils'

const AdminMenu = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userAdmin");
    localStorage.removeItem("username");
    localStorage.removeItem("user");
    handleSuccess('User Logged out');
  }

  return (
    <>
      <h2>Admin Menu</h2>
      <ul>
        <li><NavLink to="/dashboard/admin">Dashboard</NavLink></li>
        <li><NavLink to="/dashboard/admin/profile">AdminProfile</NavLink></li>
        <li><NavLink to="/dashboard/admin/employess">All Employee</NavLink></li>
        <li><NavLink to="/dashboard/admin/create">Add Employee</NavLink></li>
        <li><NavLink to="/dashboard/admin/createcategory">Category</NavLink></li>
        <li><NavLink to="/login" onClick={handleLogout}>Logout</NavLink></li>
      </ul>
    </>
  )
}

export default AdminMenu;
