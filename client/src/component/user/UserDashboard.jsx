import React, { useState } from 'react'
import './Dashboard.css'
import UserMenu from '../UserMenu'

const UserDashboard = () => {
  const username = localStorage.getItem("username");
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };
  return (
    <div className='userContainer'>
       <button className='toggle-button' onClick={toggleSidebar}>
       { isSidebarActive? <>X</>: <>☰</>}
      </button>
      <div className={`sidebar ${isSidebarActive ? 'active' : ''}`}>
        <UserMenu />
      </div>
      <div className='content'>
        <div className="dashboard-welcome">
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

export default UserDashboard;
