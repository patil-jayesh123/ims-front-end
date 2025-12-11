import React, { useState } from "react";
import "../styles/Studentform.css"; // import the CSS file
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Staffform = () => {
  const navigate=useNavigate()

  const[data, setData]= useState({name:"" ,department:"" ,email:""})

  const dataHandler=(e)=>{
    setData({...data,[e.target.name]: e.target.value})
  }

  const registerstaff = async(e)=>{
    e.preventDefault()
    try{
      await axios.post('http://127.0.0.1:2000/admin/registerstaff',data)
      alert("staff added succeffully")
      console.log(data);
      setData({name:"", department:"", email:""})
      navigate('/admin/staff')      
    }catch(err){
      console.log('failed to register'+err);
    }
  }

    
  return (
    <div className="student-form-container">
      <h2>staff Registration</h2>
      {/* 5 */}

      <form onSubmit={(e)=>registerstaff(e)}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={(e)=>dataHandler(e)}
            required
          />
        </div>

        <div className="form-group">
          <label>Department:</label>
          <input
            type="text"
            id="department"
            name="department"
            value={data.department}
            onChange={(e)=>dataHandler(e)}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={(e)=>dataHandler(e)}
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

export default Staffform;
