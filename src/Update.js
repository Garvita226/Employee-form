import React, { useState, useRef, useEffect } from 'react'
import './style.css'
import datepicker from './assets/datepicker.svg'
import dropdown from './assets/dropdown.svg'
import line from './assets/line.svg'
import eclipse1 from './assets/eclipse1.svg'
import line2 from './assets/line2.svg'
import rect from './assets/rect.svg'
import eclipse2 from './assets/eclipse2.svg'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { useParams, useNavigate } from 'react-router-dom'


const Form = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [dob, setDob] = useState(null);

    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        salary: '',
        desc: '',
        startDate: null,
        endDate: null,
        dob: null
    });

    const createEmployeeData = () => {
        const employeeData = {
            FirstName: formData.fname,
            LastName: formData.lname,
            CurrentSalary: formData.salary,
            Description: formData.desc,
            DOB: formData.dob,
            Study: selectedOption, 
            StartDate: formData.startDate,
            EndDate: formData.endDate,
        };
    
        return employeeData;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const datePickerRef = useRef(null);

    const selectRef = useRef(null);
    const [selectedOption, setSelectedOption] = useState('B.E.');

    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);

    const toggleDatePicker = (e) => {
        e.stopPropagation();
        setDatePickerVisible(!isDatePickerVisible);
    };
    const toggleStartDatePicker = (e) => {
        e.stopPropagation();
        setStartDatePickerVisible(!isStartDatePickerVisible);
    };
    const toggleEndDatePicker = (e) => {
        e.stopPropagation();
        setEndDatePickerVisible(!isEndDatePickerVisible);
    };

    const toggleDropdown = () => {
        console.log(selectRef.current)
        selectRef.current.click();
    };

    const handleStartDateChange = (date) => {
        const formattedDate = format(date, 'yyyy-MM-dd');
        setStartDate(date);
        setFormData({ ...formData, startDate: formattedDate });
    };

    const handleEndDateChange = (date) => {
        const formattedDate = format(date, 'yyyy-MM-dd');
        setEndDate(date);
        setFormData({ ...formData, endDate: formattedDate });
    };

    const handleDobChange = (date) => {
        const formattedDate = format(date, 'yyyy-MM-dd');
        setDob(date);
        setFormData({ ...formData, dob: formattedDate });
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
                // Clicked outside the date pickers, close them
                setDatePickerVisible(false);
                setStartDatePickerVisible(false);
                setEndDatePickerVisible(false);
            }
        };

        window.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const employeeData = createEmployeeData();
        console.log(employeeData)

        try {
            const response = await fetch(`https://sweede.app/DeliveryBoy/update-Employee/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employeeData),
            });

            if (response.ok) {
                console.log('Employee updated successfully');
                navigate('/')
            } else {
                console.error('Error updating employee');
            }
        } catch (error) {
            console.error('An error occurred', error);
        }
    };

    return (
        <>
            <div id="header">
                Employee Registration Form
            </div>
            <div className="form">
                <form action="" onSubmit={handleSubmit}>
                    <div style={{ display: 'flex' }}>
                        <label htmlFor="fname" className='name' style={{ left: '211px', top: '163px' }}>First Name*</label>
                        <input type="text" placeholder='Enter your name' id='fname' name='fname' onChange={handleInputChange} value={formData.fname} />
                        <label htmlFor="lname" className='name' style={{ left: '569px', top: '163px' }}>Last Name*</label>
                        <input type="text" placeholder='Enter your name' id='lname' name='lname' onChange={handleInputChange} value={formData.lname} />
                    </div>

                    <div className="date-picker-container">
                        <label htmlFor="dob" className='dob'>DOB</label>
                        <input type="text" id="dob" className='custom-cursor-input' placeholder='Enter your dob' onClick={toggleDatePicker} readOnly value={dob ? format(dob, 'dd-MM-yy') : ''} />
                        <span className="date-picker-icon custom-cursor-input" style={{ left: '819px', top: '378px' }}>
                            <img src={datepicker} alt="svg" onClick={toggleDatePicker} />
                        </span>
                        {isDatePickerVisible && (
                            <div className='date' ref={datePickerRef}>
                                <DatePicker
                                    selected={dob}
                                    onChange={handleDobChange}
                                    inline
                                />
                            </div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="study" className='study'>Study</label>
                        <select id='select' className='custom-cursor-input' onChange={(e) => setSelectedOption(e.target.value)}
                            value={selectedOption} ref={selectRef}>
                            <option value="B.E.">B.E.</option>
                            <option value="BBA">BBA</option>
                            <option value="B.Tech">B.Tech</option>
                        </select>
                        <span className="dropdown" style={{ left: '822px', top: '515px' }}
                            onClick={toggleDropdown}>
                            <img src={dropdown} alt="svg" />
                        </span>
                    </div>

                    <div style={{ display: 'flex' }}>
                        <label htmlFor="start" className='start'>Start Date</label>
                        <input type="text" id="start" onClick={toggleStartDatePicker} value={startDate ? format(startDate, 'dd-MM-yy') : ''} readOnly placeholder='Pick Date' className='custom-cursor-input' />
                        <span className="date-picker-icon custom-cursor-input" style={{ left: '220px', top: '642px' }}>
                            <img src={datepicker} alt="svg" onClick={toggleStartDatePicker} />
                        </span>
                        {isStartDatePickerVisible && (
                            <div className='sdate' ref={datePickerRef}>
                                <DatePicker
                                    selected={startDate}
                                    onChange={handleStartDateChange}
                                    inline
                                />
                            </div>
                        )}
                        <label htmlFor="end" className='end'>End Date</label>
                        <input type="text" id="end" className='custom-cursor-input' onClick={toggleEndDatePicker} value={endDate ? format(endDate, 'dd-MM-yy') : ''} readOnly placeholder='Pick Date' />
                        <span className="date-picker-icon custom-cursor-input" style={{ left: '582px', top: '642px' }}>
                            <img src={datepicker} alt="svg" onClick={toggleEndDatePicker} />
                        </span>
                        {isEndDatePickerVisible && (
                            <div className='edate' ref={datePickerRef}>
                                <DatePicker
                                    selected={endDate}
                                    onChange={handleEndDateChange}
                                    inline
                                />
                            </div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="salary" className='salary'>Current Salary</label>
                        <input type="text" id='salary' name='salary' onChange={handleInputChange} value={formData.salary} />
                    </div>

                    <div>
                        <label htmlFor="desc" className='desc'>Description</label>
                        <input type="text" id='desc' name='desc' onChange={handleInputChange} value={formData.desc} />
                        <span id='bold'>B</span>
                        <span id='italic'>I</span>
                        <span id='underline'>U</span><span id='line'><img src={line} alt="" /></span>
                        <span id='a1'>A</span><span id='e1'><img src={eclipse1} alt="" /></span>
                        <span id='line2' style={{ left: '582px', top: '958px' }}><img src={line2} alt="" /></span>
                        <span id='line2' style={{ left: '582px', top: '968px' }}><img src={line2} alt="" /></span>
                        <span id='line2' style={{ left: '582px', top: '978px' }}><img src={line2} alt="" /></span>

                        <span id='num' style={{ left: '662px', top: '960px' }}>1</span><span id='line2' style={{ left: '667px', top: '960px' }}><img src={line2} alt="" /></span>
                        <span id='num' style={{ left: '662px', top: '970px' }}>2</span><span id='line2' style={{ left: '667px', top: '970px' }}><img src={line2} alt="" /></span>
                        <span id='num' style={{ left: '662px', top: '980px' }}>3</span><span id='line2' style={{ left: '667px', top: '980px' }}><img src={line2} alt="" /></span>

                        <span id='a2'>A</span>
                        <span id='rect'><img src={rect} alt="" /></span>
                        <span id='e2'><img src={eclipse2} alt="" /></span>

                        <span id='horLine'><svg xmlns="http://www.w3.org/2000/svg" width="646" height="6" viewBox="0 0 646 6" fill="none">
                            <path d="M1 5L645 1" stroke="white" />
                        </svg></span>
                    </div>

                    <div id='cancelb'>
                        <button type='reset' id='cancel'>Cancel</button>
                    </div>

                    <div id='saveb' onClick={handleSubmit}>
                        <button type='submit' id='save'>Save</button>
                    </div>

                </form>
            </div>
        </>
    )
}

export default Form
