import React, { useEffect, useState } from "react";
import EmployeeTable from "../EmployeeTable/EmployeeTable";
import "./EmployeeManagement.css";
import AddEmployee from "../AddEmployee/AddEmployee";
import axios from 'axios';

const EmployeeMangement = () => {
  const [user, setUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit,setLimit]=useState(5)
  const [employeeobj, setEmployeeObj] = useState(null);
  const [addEmployee, setAddEmployee] = useState(false);
  const [search, setSearch] = useState("");

  const totalPages = Math.ceil(user.length / 10);

  const handleUpdate = (emp) => {
    const phone = emp.phone.toString();
    const newemp = { ...emp, phone };
    setEmployeeObj(newemp);
    setAddEmployee(true);
  };

  const getAllData = async () => {
    try {
      const response = await axios.get("https://employee-management-app-wnce.onrender.com/api/v8/user");
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  const getAllSearch = async () => {
    try {
      const response = await axios.get(`https://employee-management-app-wnce.onrender.com/api/v8/user/search/?name=${search}&department=${search}`);
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

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow + 2) { //7<=5+2=> 7<=7 true => 8<=7 false
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show first few pages
      for (let i = 1; i <= Math.min(3, totalPages); i++) {
        pageNumbers.push(i);
      }

      // Show ellipsis if needed
      if (currentPage > maxPagesToShow) {// 1>5=>false 
        pageNumbers.push("...");
      }

      // Show pages around the current page
      const start = Math.max(4, currentPage - 1); //(4,1-2)=>4
      const end = Math.min(totalPages - 3, currentPage + 1); // (7-3,2)=>(7,2)=>2

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      // Show ellipsis if needed
      if (currentPage < totalPages - maxPagesToShow + 1) {
        pageNumbers.push("...");
      }

      // Show last few pages
      for (let i = Math.max(totalPages - 2, 4); i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="body-container">
      <div className="container">
        <h1>Employee Management App</h1>
        <div className="employee-box">
          <div className="employee-controls">
            <div className="employee-header">
              <button
                className={addEmployee === true ? "add-employee-btn-active" : "add-employee-btn"}
                onClick={() => setAddEmployee(true)}
              >
                Add
              </button>
              <input
                placeholder="search"
                value={search}
                className="search-employee"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <EmployeeTable handleUpdate={handleUpdate} user={user} getAllData={getAllData} currentPage={currentPage} limit={limit} />

            {/* Pagination */}
            <div className="pagination-box">
              <div className="totalpage">Page {currentPage} of {totalPages}</div>
              <div className="right-side">
              <div className="selection-limit">
                 <select onChange={(e)=>setLimit(e.target.value)}>
                   <option value={5}>5</option>
                   <option value={10}>10</option>
                   <option value={15}>15</option>
                 </select>
              </div>
              <div className="right-page">
                <button
                  className="previous"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Previous
                </button>
                {renderPageNumbers().map((page, index) =>
                  page === "..." ? (
                    <span key={index} className="dots">...</span>
                  ) : (
                    <button
                      key={index}
                      className={currentPage === page ? "active" : "pagenumber"}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  )
                )}
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
        {addEmployee ? (
          <AddEmployee
            setAddEmployee={setAddEmployee}
            employeeobj={employeeobj}
            setEmployeeObj={setEmployeeObj}
            getAllData={getAllData}
          />
        ) : null}
      </div>
    </div>
  );
};

export default EmployeeMangement;


// import React, { useEffect, useState } from "react";
// import EmployeeTable from "../EmployeeTable/EmployeeTable";
// import "./EmployeeManagement.css";
// import AddEmployee from "../AddEmployee/AddEmployee";
// import axios from 'axios';

// const EmployeeMangement = () => {
//   const [user, setUser] = useState([]); // Initialize as an array
//   const totalPages = Math.ceil(user.length/10);
//   const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
//   const [currentPage, setCurrentPage] = useState(1); // Make currentPage stateful
//   const [employeeobj, setEmployeeObj] = useState(null);
//   const [addEmployee, setAddEmployee] = useState(false);
//   const [search, setSearch] = useState("");

//   const handleUpdate = (emp) => {
//     console.log(emp);
//     const phone = emp.phone.toString();
//     const newemp = { ...emp, phone };
//     console.log(newemp);
//     setEmployeeObj(newemp);
//     setAddEmployee(true);
//   };

//   const getAllData = async () => {
//     try {
//       const response = await axios.get("http://localhost:8082/api/v8/user");
//       setUser(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getAllData();
//   }, []);


  
//   const getAllSearch = async () => {
//     try {
//       const response = await axios.get(`http://localhost:8082/api/v8/user/search/?name=${search}&department=${search}`);
//       setUser(response.data); // Set the user data instead of search
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (search) {
//       getAllSearch();
//     } else {
//       getAllData(); // Fetch all data when search is cleared
//     }
//   }, [search]);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     // Fetch data for the selected page, if needed
//   };

//   return (
//     <div className="body-container">
//       <div className="container">
//         <h1>Employee Management App</h1>
//         <div className="employee-box">
//           <div className="employee-controls">
//             <div className="employee-header">
//               <button className={addEmployee === true ? "add-employee-btn-active" : "add-employee-btn"} onClick={() => setAddEmployee(true)}>Add</button>
//               <input
//                 placeholder="search"
//                 value={search}
//                 className="search-employee"
//                 onChange={(e) => setSearch(e.target.value)}
//               />
//             </div>
//             <EmployeeTable handleUpdate={handleUpdate} user={user} getAllData={getAllData} currentPage={currentPage} />

//             {/* Pagination */}
//             <div className="pagination-box">
//               <div className="totalpage">Page {currentPage} of {totalPages}</div>
//               <div className="right-page">
//                 <button
//                   className="previous"
//                   disabled={currentPage === 1}
//                   onClick={() => handlePageChange(currentPage - 1)}
//                 >
//                   Previous
//                 </button>
//                 {pageNumbers.map((page) => (
//                   <button
//                     key={page}
//                     className={currentPage === page ? "active" : "pagenumber"}
//                     onClick={() => handlePageChange(page)}
//                   >
//                     {page}
//                   </button>
//                 ))}
//                 <button
//                   className="nextbutton"
//                   disabled={currentPage === totalPages}
//                   onClick={() => handlePageChange(currentPage + 1)}
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//         {addEmployee ? <AddEmployee setAddEmployee={setAddEmployee} employeeobj={employeeobj} setEmployeeObj={setEmployeeObj} getAllData={getAllData} /> : null}
//       </div>
//     </div>
//   );
// };

// export default EmployeeMangement;

// // import React, {  useEffect, useState } from "react";
// // import EmployeeTable from "../EmployeeTable/EmployeeTable";
// // import "./EmployeeManagement.css";
// // import AddEmployee from "../AddEmployee/AddEmployee";
// // import axios from 'axios'
// // const EmployeeMangement = () => {
// //   const [user,setUser] = useState([])
// //   const totalPages=5
// //   const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
// //   const currentPage=1
// //   const [employeeobj,setEmployeeObj]= useState(null)
// //   const [addEmployee,setAddEmployee]= useState(false)
// //   const[search,setSearch]=useState("")
// //   const handleUpdate=(emp)=>{
// //     console.log(emp)
// //     const phone= emp.phone.toString()
    
// //     const newemp={...emp,phone}
// //     console.log(newemp)
// //    setEmployeeObj(newemp)
// //    setAddEmployee(true)
// //    }


// //    const getAllData=async()=>{
// //     try {
// //       const response= await axios.get("http://localhost:8082/api/v8/user")
// //       setUser(response.data)
// //     } catch (error) {
// //       console.log(error)
// //     }
// //   }
// //   useEffect(()=>{
// //    getAllData()
// //   },[])

// //   const getAllSearch= async()=>{
// //     try {
// //       const response= await axios.get(`http://localhost:8082/api/v8/user/search/?name=${search}&department=${search}`)
// //       setUser(response.data)
// //     } catch (error) {
// //      console.log(error) 
// //     }
// //   }
// //   useEffect(() => {
// //     if (search) {
// //       getAllSearch();
// //     } else {
// //       getAllData(); // Fetch all data when search is cleared
// //     }
// //   }, [search]);
  
// //   console.log(search)
// //   return (
// //     <>
// //     <div className="body-container">
// //       <div className="container">
// //         <h1> Employee Management App</h1>
// //         <div className="employee-box">
// //           <div className="employee-controls">
// //             <div className="employee-header">
// //               <button className={addEmployee===true?"add-employee-btn-active":"add-employee-btn"} onClick={()=>setAddEmployee(true)}>Add</button>
// //               <input placeholder="search" value={search} className="search-employee" onChange={(e)=>setSearch(e.target.value)}/>
// //             </div>
// //             <EmployeeTable handleUpdate={handleUpdate} user={user} getAllData={getAllData}/>

// //           {/* add pagination */}
// //           <div className="pagination-box">
// //               <div className="totalpage">Page {currentPage} to {totalPages}</div>
// //               <div className="right-page">
// //                 <button className="previous" disabled={currentPage===1}>previous</button>
// //                 {pageNumbers.map((page) => (
// //                   <button key={page} className={currentPage===page?"active":"pagenumber"}>{page}</button>
// //                 ))}
// //                 <button className="nextbutton" disabled={currentPage===totalPages}>Next</button>
// //               </div>
// //             </div>
// //           </div>
         
// //         </div>
// //       {addEmployee?<AddEmployee setAddEmployee={setAddEmployee} employeeobj={employeeobj} setEmployeeObj={setEmployeeObj} getAllData={getAllData}/>: <></>}  
// //       </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default EmployeeMangement;
