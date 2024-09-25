import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import UserDashboard from './component/user/UserDashboard'
import RedirectIfAuthenticated from './routes/RedirectIfAuthenticated'
import Profile from './component/user/Profile'
import ProtectedRoutes from './routes/ProtectedRoutes'
import AdminRoute from './routes/AdminRoute'
import AdminDashboard from './admin/AdminDashboard'
import AdminProfile from './admin/AdminProfile'
import AddUser from './admin/AddUser'
import Employess from './admin/Employess'
import UserProfile from './admin/UserProfile'
import PagenotFound from './pages/PagenotFound'
import Category from './admin/Category'


function App() {
  return (
    <>
     <Routes>
      <Route path="/" element={<Navigate to= "/login"/>}/>
      <Route path="/login" element={  <RedirectIfAuthenticated><Login/></RedirectIfAuthenticated>}/>
      <Route path="/signup" element={<RedirectIfAuthenticated><Signup/></RedirectIfAuthenticated>}/>
      <Route path="/dashboard" element={<ProtectedRoutes/>}>
        <Route path='user' element={<UserDashboard/>}/>
        <Route path='user/profile' element={<Profile/>}/>
      </Route>
      <Route path="/dashboard" element={<AdminRoute/>}>
        <Route path='admin' element={<AdminDashboard/>}/>
        <Route path='admin/profile' element={<AdminProfile/>}/>
        <Route path='admin/employee/:id' element={<UserProfile/>}/>
        <Route path='admin/create' element={<AddUser/>}/>
        <Route path='admin/employess' element={<Employess/>}/>
        <Route path='admin/createcategory' element={<Category/>}/>
      </Route>
      <Route path='*' element={<PagenotFound/>}/>
    
     </Routes> 
    </>
  )
}

export default App
