import React, { useEffect, useState } from 'react';
import "./Employess.css";
import axios from 'axios';
import EmployeeTable from '../component/EmployeeTable/EmployeeTable';
import AdminMenu from '../component/AdminMenu';

const Employess = () => {
  const [user, setUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const [updateEmployee,setupdateEmployee]=useState(false)
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };
  const authToken = localStorage.getItem('token');
  const totalPages = Math.ceil(user.length / limit);// 20/5=>4
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  const getAllData = async () => {
    try {
      const isAdmin = localStorage.getItem("userAdmin") === "true";
      if (!isAdmin) {
        alert("Access Denied. Admins only.");
        navigate("/dashboard/user");  // Redirect to user dashboard
        return;
      }
      const response = await axios.get("http://localhost:8082/api/v8/user", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      // console.log(response.data)
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(user)
  useEffect(() => {
    getAllData();
  }, []);

  const getAllSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8082/api/v8/user/search?username=${search}`,{
        headers: {
            Authorization: `Bearer ${authToken}`,
          },
        
      });
      console.log(response)
      
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (search) {
      getAllSearch();
    } else {
      getAllData();
    }
  }, [search]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };



//   const renderPageNumbers = () => {
//     const pageNumbers = [];
//     const maxPagesToShow = 5;

//     if (totalPages <= maxPagesToShow + 2) {
//       for (let i = 1; i <= totalPages; i++) {
//         pageNumbers.push(i);
//       }
//     } else {
//       for (let i = 1; i <= Math.min(3, totalPages); i++) {
//         pageNumbers.push(i);
//       }
//       if (currentPage > maxPagesToShow) {
//         pageNumbers.push("...");
//       }
//       const start = Math.max(4, currentPage - 1);
//       const end = Math.min(totalPages - 3, currentPage + 1);
//       for (let i = start; i <= end; i++) {
//         pageNumbers.push(i);
//       }
//       if (currentPage < totalPages - maxPagesToShow + 1) {
//         pageNumbers.push("...");
//       }
//       for (let i = Math.max(totalPages - 2, 4); i <= totalPages; i++) {
//         pageNumbers.push(i);
//       }
//     }
//     return pageNumbers;
//   };

  return (
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
            <h1>Employee Management App</h1>
            <div className="employee-box">
              <div className="employee-controls">
                <div className="employee-header">
                  <input
                    placeholder="Search employee"
                    value={search}
                    className="search-employee"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <EmployeeTable
                  user={user}
                  getAllData={getAllData}
                  currentPage={currentPage}
                  limit={limit}
                />
                {/* Pagination */}
                <div className="pagination-box">
                  <div className="totalpage">Page {currentPage} of {totalPages}</div>
                  <div className="right-side">
                    <select className="selection-limit" onChange={(e) => setLimit(e.target.value)}>
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={15}>15</option>
                    </select>
                    <div className="right-page">
                      <button
                        className="previous"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                      >
                        Previous
                      </button>
                      {pageNumbers.map((page, index) =>
                        
                          <button
                            key={index}
                            className={currentPage === page ? "pageactive" : "pagenumber"}
                            onClick={() => handlePageChange(page)}
                          >
                            {page}
                          </button>
                        )
                      }
                      <button
                        className="nextbutton"
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {updateEmployee ? (
          <UpdateEmployee
            setupdateEmployee={setupdateEmployee}
            employeeobj={employeeobj}
            setEmployeeObj={setEmployeeObj}
            getAllData={getAllData}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Employess;
