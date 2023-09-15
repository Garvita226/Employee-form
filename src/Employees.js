import React, { useState, useEffect } from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom'
import editIcon from './assets/edit.svg';
import deleteIcon from './assets/delete.svg';

const Employees = () => {
    const [employeeData, setEmployeeData] = useState([]);

    useEffect(() => {
        // Fetch employee data from the API
        fetch('https://sweede.app/DeliveryBoy/Get-Employee/')
            .then((response) => response.json())
            .then((data) => {
                setEmployeeData(data);
                console.log(data)
            })
            .catch((error) => console.error('Error fetching employee data:', error));
    }, []);

    const handleDeleteEmployee = (id) => {
        // Make an HTTP DELETE request to delete the employee
        fetch(`https://sweede.app/DeliveryBoy/delete-Employee/${id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    // If the deletion was successful, remove the employee from the list
                    setEmployeeData((prevData) => prevData.filter((employee) => employee.id !== id));
                } else {
                    console.error('Error deleting employee:', response.statusText);
                }
            })
            .catch((error) => console.error('Error deleting employee:', error));
    };

    const navigate = useNavigate();

    // Function to handle edit button click
    const handleEditClick = (id) => {
        // Navigate to the edit route with the specific employee's ID
        navigate(`/update/${id}`);
    };

    const handleAddEmployee = () => {
        navigate('/form');
    }


    return (
        <>
            <div className="container">
                <div onClick={handleAddEmployee} className='heading add'><span style={{padding:'7px'}}>Add Employee</span></div>
                <div id='eheader'>Employee List</div>
                <div id='list-container'>
                    <div style={{ display: 'flex' }}>
                        <div className="heading" style={{ left: '40px', top: '94px' }}>Name</div>
                        <div className="heading" style={{ left: '222px', top: '94px' }}>DOB</div>
                        <div className="heading" style={{ left: '401px', top: '94px' }}>Start Date</div>
                        <div className="heading" style={{ left: '640px', top: '94px' }}>End Date</div>
                        <div className="heading" style={{ left: '879px', top: '94px' }}>Description</div>

                        <span style={{ position: 'absolute', top: '143px' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" id='horline2' width="1332" height="9" viewBox="0 0 1332 9" fill="none">
                                <path d="M1 1L1331 8.2003" stroke="#D5D5D5" />
                            </svg>
                        </span>
                    </div>

                    <div className="employee-container">
                        {employeeData.map((employee, index) => (
                            <div
                                key={employee.id}
                                style={{
                                    display: 'flex',
                                    position: 'absolute',
                                    top: `${203 + index * 130}px`,
                                    left: '87px',
                                }}
                            >
                                <div className="content" style={{ width: '113px', left:'-45px' }}>
                                    {employee.FirstName} {employee.LastName}
                                </div>
                                <div className="content" style={{ width: '113px', left: '139px' }}>
                                    {employee.DOB}
                                </div>
                                <div className="content" style={{ width: '113px', left: '316px' }}>
                                    {employee.StartDate}
                                </div>
                                <div className="content" style={{ width: '113px', left: '555px' }}>
                                    {employee.EndDate}
                                </div>
                                <div className="content" style={{ width: '175px', height: '130px', left: '795px', whiteSpace: 'pre-wrap', overflowY: 'auto', overflowX: 'hidden' }}>
                                    {employee.Description}
                                </div>

                                <div id='edit' className='change' style={{left:'1033px'}} onClick={() => handleEditClick(employee.id)}>
                                    <img src={editIcon} alt="" />
                                    <span style={{marginLeft:'4px'}}>Edit</span>
                                    </div>
                                <div id='delete' className='change' style={{left:'1033px', top:'24px'}} onClick={() => handleDeleteEmployee(employee.id)}>
                                    <img src={deleteIcon} alt="" />
                                    <span style={{marginLeft:'4px'}}>Delete</span>
                                    </div>
                            </div>

                        ))}
                    </div>

                </div>
            </div>
        </>
    )
}

export default Employees
