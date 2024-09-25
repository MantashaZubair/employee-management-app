import axios from 'axios';
import React from 'react'
import { ToastContainer } from 'react-toastify';

const CategoryTable = ({category,handleDelete,handelUpdate}) => {
    console.log(category)
    const headers = ["Sr.No", "Department", "Actions"];
    

   
  return (
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
          
          {category.length>0 ? category.map((item,i)=>{
            const serialNumber =i + 1; 
            return  <tr key={item._id}>
           
        <td>{serialNumber}</td>
        <td>{item.department}</td>
        <td>
          <span style={{cursor:"pointer"}} onClick={()=>handelUpdate(item)}>✏️</span>   
          <span style={{cursor:"pointer"}} onClick={()=>handleDelete(item._id)}>🗑️</span>    
        </td>
        </tr>
          }): <tr>
              <td colSpan="6" style={{ textAlign: 'center', fontSize:"22px"}}>
                User not found
              </td>
            </tr> }
          </tbody>
        </table>
        <ToastContainer/>
      </div>
    
  )
}

export default CategoryTable