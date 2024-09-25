import React from 'react'
import { NavLink } from 'react-router-dom'
import { handleSuccess } from '../utils'

const UserMenu = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userAdmin");
    localStorage.removeItem("username");
    localStorage.removeItem("user");
    handleSuccess('User Logged out');
  }

  return (
    <>
      <h2>User Menu</h2>
      <ul>
        <li><NavLink to="/dashboard/user" >Dashboard</NavLink></li>
        <li><NavLink to="/dashboard/user/profile">Profile</NavLink></li>
        <li><NavLink to="/login" onClick={handleLogout}>Logout</NavLink></li>
      </ul>
    </>
  )
}

export default UserMenu;
