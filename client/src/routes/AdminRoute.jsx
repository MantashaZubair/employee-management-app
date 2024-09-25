import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const AdminRoute = () => {
  const [ok, setOk] = useState(false)
  const navigate = useNavigate()
  const auth = localStorage.getItem('token')


  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(`https://employee-management-app-wnce.onrender.com/api/v8/user/admin-auth`, {
          headers: {
            Authorization: `Bearer ${auth}`
          }
        })
        if (res.data.ok) {
          setOk(true)  // Authentication successful
        } else {
          throw new Error("Authentication failed")  // Explicitly handle failure
        }
      } catch (error) {
        console.error("Error during auth check:", error)
        // Clear localStorage and redirect to login on 401 or auth failure
        localStorage.clear()
        navigate('/login')  // Redirect to login page
      }
    }

    if (auth) {
      authCheck()  // Perform auth check if token exists
    } else {
      // If no token, clear storage and redirect to login
      localStorage.clear()
      navigate('/login')
    }
  }, [auth, navigate])

  return ok ? <Outlet /> : "loading..."
}

export default AdminRoute
