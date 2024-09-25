import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";

const TableRow = ({data,handleDelete,currentPage,limit,departments}) => {
  const users= data.filter(emp => !emp.isAdmin)
  const startIndex= (currentPage-1)*limit  // pageone 1-1*5=>0*5=>0 , pagetwo 2-1*5=>1*5=>5
  const endIndex= startIndex+ parseInt(limit) //pageone 0+5=>5, pagetwo 5+5=>10
  const currentData= users.slice(startIndex,endIndex).filter(emp => !emp.isAdmin)//pageone (0,5)=>0,1,2,3,4 ||pagetwo (5,10)=>5,6,7,8,9
 /*
        console.log("start:", startIndex) 
        console.log("end:",endIndex)
        console.log("limit: ", limit)
        console.log("currentdata: ", currentData)
        console.log(data.length)
 */ 



        console.log(departments)
     const navigate=useNavigate()   
     const getDepartmentName = (departmentId) => {
      const department = departments.find(dep => dep._id === departmentId);
      return department ? department.department : "Unknown"; // Fallback to "Unknown" if department not found
    };
  return (
    <>
   
  {currentData.map((emp,i)=>{
     
    const serialNumber = startIndex + i + 1; 
     //pageone 0+0+1=>1,0+1+1=>2 || pagetwo 5+0+1=>6, 5+1+1=>7
    return  <tr key={emp._id}>
        <td>{serialNumber}</td>
        <td>{emp.username}</td>
        <td>{emp.email}</td>
        <td>{emp.phone}</td>
        <td>{getDepartmentName(emp.department)}</td>
        <td>{emp.salary}</td>
        <td>
          <span style={{cursor:"pointer"}} onClick={()=>navigate(`/dashboard/admin/employee/${emp._id}`)}>✏️</span>   
          <span style={{cursor:"pointer"}} onClick={()=>handleDelete(emp._id)}>🗑️</span>    
        </td>
        </tr>
    })}
   
   

    </>
  );
};

export default TableRow;
