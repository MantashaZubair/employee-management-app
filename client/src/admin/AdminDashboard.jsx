import React, { useState } from 'react'
import AdminMenu from '../component/AdminMenu';

const AdminDashboard = () => {
  const [isSidebarActive, setIsSidebarActive] = useState(false);

const toggleSidebar = () => {
  setIsSidebarActive(!isSidebarActive);
};
  const username = localStorage.getItem("username");
  return (
    <div className='userContainer'>
      <button className='toggle-button' onClick={toggleSidebar}>
       { isSidebarActive? <>X</>: <>☰</>}
      </button>
      <div className={`sidebar ${isSidebarActive ? 'active' : ''}`}>
        <AdminMenu />
      </div>
      <div className='content'>
        <div className="dashboard-welcome">
        <h1>Employee Management App</h1>
          <h1>Welcome, {username}!</h1>
          <p>This is your dashboard. Here you can manage your profile, view analytics, and access other features.</p>
        </div>
        <div className="dashboard-cards">
          {/* Example Dashboard Cards */}
          <div className="dashboard-card">
            <h3>Profile Overview</h3>
            <p>View or update your profile information.</p>
          </div>
          <div className="dashboard-card">
            <h3>Settings</h3>
            <p>Adjust your preferences and manage account settings.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard