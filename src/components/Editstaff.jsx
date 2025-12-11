import React, { useState } from "react";
import "../styles/Studentform.css"; // import the CSS file
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const Editstaff = () => {

    const {id} = useParams()
    const navigate=useNavigate()

    const [data, setData]= useState({
        name:"",
        department:"",
        email:"",
    })

    //fetch data
    const fetchstaff=async()=>{
        try{
            const res=await axios.get(`https://ims-backend-p5hr.onrender.com/admin/staff/${id}`)
            setData(res.data.staff)
        }catch(err){
            console.log(err);
            console.log("data fetch failed ");                        
        }
    }

    useEffect(()=>{
        fetchstaff();
    },[])
//---------------------------------------------------------
const dataHandler=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
}

//---------------------------------------------------------
const updatestaff=async(e)=>{
  e.preventDefault()
  try{
    await axios.put(`https://ims-backend-p5hr.onrender.com/admin/updatestaff/${id}`,data)
    alert("staff updated successfully")
    navigate("/admin/staff")
  }catch(err){
    console.log(err);
    console.log("failed to update")   
  }
}
//---------------------------------------------------------

  return (
    <div className="student-form-container">
      <h2>Update staff</h2>

      <form onSubmit={(e)=>updatestaff(e)}>
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
          update staff
        </button>
      </form>
    </div>
  );
};

export default Editstaff;
