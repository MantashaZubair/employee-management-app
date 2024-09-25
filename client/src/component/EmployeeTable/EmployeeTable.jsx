// import  { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { handleSuccess } from "../../utils";
import "./EmployeeTable.css";
import TableRow from "./TableRow";
import axios from 'axios'
import { useEffect, useState } from "react";

const EmployeeTable = ({handleUpdate, user,getAllData, currentPage,limit}) => {
  const [departments, setDepartments] = useState(null);
  const headers = ["Sr.No","Name", "Email", "Phone", "Department","Salary", "Actions"];
  const authToken = localStorage.getItem('token');
  const handleDelete =async(id)=>{
       try {
       await axios.delete(`https://employee-management-app-wnce.onrender.com/api/v8/user/${id}`)
      handleSuccess(`delete employee`)
      getAllData()
    } catch (error) {
      console.log(error)
    }
  }

 
  // Fetch all departments

  const getDepartments =async()=>{
    try {
      const response= await axios.get("https://employee-management-app-wnce.onrender.com/api/v8/category/get-category", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      console.log(response.data)
      setDepartments(response.data)
    } catch (error) {
      console.log(error)  
    }
    }

  useEffect(() => {
    getDepartments(); // Fetch departments when the component mounts
  }, []);
  if (!departments) {
    return <div>Loading...</div>; // Return loading state while data is being fetched
  }
  return (
    <>
      <div className="employee-table">
        <table>
          <thead>
            <tr>
              {headers.map((header, i) => (
                <th key={i}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
          {user.length>0?<TableRow handleUpdate={handleUpdate} handleDelete={handleDelete} data={user} currentPage={currentPage} limit={limit} departments={departments}/>: <tr>
              <td colSpan="6" style={{ textAlign: 'center', fontSize:"22px"}}>
                User not found
              </td>
            </tr> }
          </tbody>
        </table>
        <ToastContainer/>
      </div>
    
    </>
  );
};

export default EmployeeTable;
