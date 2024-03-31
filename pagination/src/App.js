import logo from './logo.svg';
import './App.css';
import styles from './App.module.css';
import { useEffect, useState } from 'react';

function App() {
  const [employeeData, setEmployeeData] = useState([]);
  const [pageNumber, setpageNumber]= useState(1);
  const [rowsperpage,setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const getEmployeedata = async()=>{
    try{
        const res = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
        const data = await res.json();
        setTotalPages(Math.floor((data.length)/rowsperpage));
        setEmployeeData(data);
        console.log(data);
    }
    catch(err){
      alert("Failed to fetch data");
        // console.log(err);
    }
  }

  useEffect(()=>{
    getEmployeedata();
  },[pageNumber])

  const handleNext = ()=>{
    if(pageNumber<totalPages)
    setpageNumber(pageNumber+1)
  }

  const handlePrev = ()=>{
    if(pageNumber>1){
      setpageNumber(pageNumber-1);
    }
  }

  const pageLastIndex = pageNumber*rowsperpage;
  const pageFirstIndex = pageLastIndex-rowsperpage;
  // const indexOfLastEmployee = Math.min(currentPage * perPage, employees.length);
  // const indexOfFirstEmployee = Math.min(indexOfLastEmployee - perPage, employees.length);
  const currentPageEmployees = employeeData.slice(pageFirstIndex, pageLastIndex);

  return (
    <div className={styles.container}>
      <h1>Employee Data Table</h1>
      <div className={styles.datatable}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {currentPageEmployees.map((employee)=>{
                return(
                  <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.role}</td>
                  </tr>)
              })}
            </tbody>
          </table>
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={handlePrev}>Previous</button>
        <p>{pageNumber}</p>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default App;
