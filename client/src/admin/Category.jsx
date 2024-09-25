import React, { useEffect, useState } from 'react'
import AdminMenu from '../component/AdminMenu'
import "./Category.css"
import CategoryTable from './CategoryTable'
import axios from 'axios'
import { handleError, handleSuccess } from '../utils'
import AddCategory from './AddCategory'
const Category = () => {
    const [addCategory,setAddCategory]=useState(false)
    const [category,setCategory]=useState([])
    const [categoryObj,setCategoryObj]=useState(null)
    const authToken = localStorage.getItem('token');
    const [isSidebarActive, setIsSidebarActive] = useState(false);

    const toggleSidebar = () => {
      setIsSidebarActive(!isSidebarActive);
    };
    const getAllCategory =async()=>{
    try {
      const response= await axios.get("http://localhost:8082/api/v8/category/get-category", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      console.log(response)
       setCategory(response.data)
    } catch (error) {
      console.log(error)  
    }
    }
    useEffect(()=>{
        getAllCategory()
    },[])
    
  const handleUpdate = (emp) => {
    setCategoryObj(emp);
    setAddCategory(true);
  };

  console.log(categoryObj)
    
    const handleDelete =async(id)=>{
        console.log(id)
        try {    
        await axios.delete(`http://localhost:8082/api/v8/category/delete-category/${id}`)
       handleSuccess(`delete employee`)
      getAllCategory()
     } catch (error) {
       console.log(error)
     }
   }
  return (
    <>
         <div className='userContainer'>
         <button className='toggle-button' onClick={toggleSidebar}>
       { isSidebarActive? <>X</>: <>☰</>}
      </button>
      <div className={`sidebar ${isSidebarActive ? 'active' : ''}`}>
        <AdminMenu />
      </div>
      <div className='content'>
            
      <div className="body-container">
      <div className="container">
        <h1>Category</h1>
        <div className="employee-box">
          <div className="employee-controls">
           
              <button
                className={addCategory === true ? "add-employee-btn-active" : "add-employee-btn"}
                onClick={() => setAddCategory(true)}
              >
                Add
              </button>
            
            <CategoryTable category={category} handleDelete={handleDelete} handelUpdate={handleUpdate}/>
                       
            </div>
          </div>
        </div>
        {addCategory ? (
          <AddCategory
            setAddCategory={setAddCategory}
            categoryObj={categoryObj}
            setCategoryObj={setCategoryObj}
            getAllCategory={getAllCategory}
          />
        ) : null}
      </div>
    </div>

        </div>
      
    </>
  )
}

export default Category