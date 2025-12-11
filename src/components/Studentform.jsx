import React, { useState } from "react";
import "../styles/Studentform.css"; // import the CSS file
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Studentform = () => {
    const navigate=useNavigate()
  //1
  const [data, setData] = useState({ name: "", rollNo: "", course: "" });

  //4
  const dataHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  //6
  const registeruser = async(e)=>{
    e.preventDefault()
    try{
        await axios.post('https://ims-backend-p5hr.onrender.com/admin/registeruser',data)
        alert("students added successfully")
        console.log(data);
        setData({name:"", rollNo:"", course:""})  
        navigate('/admin/student')

    }catch(err){
        console.log('failed to register',+err);        
    }
  }

  return (
    <div className="student-form-container">
      <h2>Student Registration</h2>
      {/* 5 */}

      <form onSubmit={(e) => registeruser(e)}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            //2
            value={data.name}
            //3
            onChange={(e) => dataHandler(e)}
            required
          />
        </div>

        <div className="form-group">
          <label>Roll Number:</label>
          <input
            type="text"
            id="rollNo"
            name="rollNo"
            value={data.rollNo}
            onChange={(e) => dataHandler(e)}
            required
          />
        </div>

        <div className="form-group">
          <label>Course:</label>
          <input
            type="text"
            id="course"
            name="course"
            value={data.course}
            onChange={(e) => dataHandler(e)}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Register
        </button>
      </form>
    </div>
  );
};

export default Studentform;
