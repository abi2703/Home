import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      InvoiceID:"",
      NAME: "",
      Course: "",
      status: "paid",
      DATE:""
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.NAME && formState.COURSES && formState.status) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value  });
  };
 

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);

    closeModal();
  };
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (DATE) => {
    setSelectedDate(DATE);
  };
  const courses = [
    { name: 'Full Stack Developement', amount: 5000 },
    { name: 'Front-End Developement', amount: 3000 },
    { name: 'Back-End Developement', amount: 3000 },
    { name: 'JavaScript Course', amount: 2000 },
  ];
  const [selectedCourse, setSelectedCourse] = useState('');
  const [amount, setAmount] = useState('');

  const handleCourseChange = (e) => {
    const courseName = e.target.value;
    setSelectedCourse(courseName);

    // Find the amount for the selected course
    const selectedCourseObj = courses.find((course) => course.name === courseName);
    if (selectedCourseObj) {
      setAmount(selectedCourseObj.amount);
    }
  };
  const [invoiceID, setInvoiceID] = useState('');
  useEffect(() => {
    const newInvoiceID = generateUniqueID();
    setInvoiceID(newInvoiceID);
  }, []);
  const generateUniqueID = () => {
    const timestamp = Date.now();
    return `INV-${timestamp}`;
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <form>
          <div className="form-group">
            <label htmlFor="NAME">NAME</label>
            <input name="NAME" onChange={handleChange} value={formState.NAME} />
          </div>
          <div>
          <label>Invoice ID:</label>
          <input type="text" value={invoiceID} readOnly />
        </div>
          <div className="form-group">
            <label htmlFor="COURSES">COURSES</label>
            <textarea
              name="COURSES"
              onChange={handleChange}
              value={formState.COURSES}
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              name="status"
              onChange={handleChange}
              value={formState.status}
            >
              <option value="paid">paid</option>
              <option value="partiallypaid">partially paid</option>
              <option value="unpaid">unpaid</option>
            </select>
          </div>
          
      <div>
        <label>Date:</label>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy/MM/dd" // You can customize the date format
        />
      </div>
      <div>
        <label>Course:</label>
        <select value={selectedCourse} onChange={handleCourseChange}>
          <option value="">Select a course</option>
          {courses.map((course) => (
            <option key={course.name} value={course.name}>
              {course.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Amount:</label>
        <input type="text" value={amount} readOnly />
      </div>
   
  <br></br>
  

          {errors && <div className="error">{`Please include: ${errors}`}</div>}
 <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};