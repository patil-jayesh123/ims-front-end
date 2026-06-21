// import React, { useState } from "react";
// import axios from "axios";
// import "../styles/Studentform.css";

// const Staffform = ({ onClose, onSuccess }) => {
//   const [data, setData] = useState({ name: "", department: "", email: "" });
//   const [submitting, setSubmitting] = useState(false);

//   const dataHandler = (e) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//   };

//   const registerstaff = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     try {
//       await axios.post(
//         "https://ims-backend-p5hr.onrender.com/admin/registerstaff",
//         data
//       );
//       setData({ name: "", department: "", email: "" });
//       onSuccess ? onSuccess() : onClose && onClose();
//     } catch (err) {
//       console.log("Failed to register: " + err);
//       alert("Failed to register staff");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="sf-overlay" onClick={onClose}>
//       <div className="sf-modal" onClick={(e) => e.stopPropagation()}>
//         <button className="sf-close" onClick={onClose} aria-label="Close">
//           &times;
//         </button>

//         <div className="sf-header">
//           <h2>Add New Staff</h2>
//           <p>Fill in the details below to register a staff member</p>
//         </div>

//         <form onSubmit={registerstaff} className="sf-form">
//           <div className="sf-field">
//             <label htmlFor="name">Full Name</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               placeholder="e.g. Priya Mehta"
//               value={data.name}
//               onChange={dataHandler}
//               required
//             />
//           </div>

//           <div className="sf-field">
//             <label htmlFor="department">Department</label>
//             <input
//               type="text"
//               id="department"
//               name="department"
//               placeholder="e.g. Administration"
//               value={data.department}
//               onChange={dataHandler}
//               required
//             />
//           </div>

//           <div className="sf-field">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               placeholder="e.g. priya@example.com"
//               value={data.email}
//               onChange={dataHandler}
//               required
//             />
//           </div>

//           <div className="sf-actions">
//             <button
//               type="button"
//               className="sf-btn sf-btn-secondary"
//               onClick={onClose}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="sf-btn sf-btn-primary"
//               disabled={submitting}
//             >
//               {submitting ? "Adding..." : "Add Staff"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Staffform;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Studentform.css";
import { toast } from "react-toastify";

const Staffform = ({ staff, onClose, onSuccess }) => {
  const isEditMode = Boolean(staff);

  const [data, setData] = useState({ name: "", department: "", email: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (staff) {
      setData({
        name: staff.name || "",
        department: staff.department || "",
        email: staff.email || "",
      });
    }
  }, [staff]);

  const dataHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (isEditMode) {
        await axios.put(
          `https://ims-backend-p5hr.onrender.com/admin/updatestaff/${staff._id}`,
          data,
        );
      } else {
        await axios.post(
          "https://ims-backend-p5hr.onrender.com/admin/registerstaff",
          data,
        );
        setData({ name: "", department: "", email: "" });
      }
      onSuccess ? onSuccess() : onClose && onClose();
    } catch (err) {
      console.log(
        isEditMode ? "Failed to update: " + err : "Failed to register: " + err,
      );
      toast.error(
        isEditMode ? "Failed to update staff" : "Failed to register staff",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="sf-overlay" onClick={onClose}>
      <div className="sf-modal" onClick={(e) => e.stopPropagation()}>
        <button className="sf-close" onClick={onClose} aria-label="Close">
          &times;
        </button>

        <div className="sf-header">
          <h2>{isEditMode ? "Update Staff" : "Add New Staff"}</h2>
          <p>
            {isEditMode
              ? "Edit the details below and save your changes"
              : "Fill in the details below to register a staff member"}
          </p>
        </div>

        <form onSubmit={submitHandler} className="sf-form">
          <div className="sf-field">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="e.g. Priya Mehta"
              value={data.name}
              onChange={dataHandler}
              required
            />
          </div>

          <div className="sf-field">
            <label htmlFor="department">Department</label>
            <input
              type="text"
              id="department"
              name="department"
              placeholder="e.g. Administration"
              value={data.department}
              onChange={dataHandler}
              required
            />
          </div>

          <div className="sf-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="e.g. priya@example.com"
              value={data.email}
              onChange={dataHandler}
              required
            />
          </div>

          <div className="sf-actions">
            <button
              type="button"
              className="sf-btn sf-btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="sf-btn sf-btn-primary"
              disabled={submitting}
            >
              {submitting
                ? isEditMode
                  ? "Updating..."
                  : "Adding..."
                : isEditMode
                  ? "Update Staff"
                  : "Add Staff"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Staffform;
