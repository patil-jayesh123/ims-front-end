// import React, { useState } from "react";
// import axios from "axios";
// import "../styles/Studentform.css";

// const Studentform = ({ onClose, onSuccess }) => {
//   const [data, setData] = useState({ name: "", rollNo: "", course: "" });
//   const [submitting, setSubmitting] = useState(false);

//   const dataHandler = (e) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//   };

//   const registeruser = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     try {
//       await axios.post(
//         "https://ims-backend-p5hr.onrender.com/admin/registeruser",
//         data
//       );
//       setData({ name: "", rollNo: "", course: "" });
//       onSuccess ? onSuccess() : onClose && onClose();
//     } catch (err) {
//       console.log("Failed to register: " + err);
//       alert("Failed to register student");
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
//           <h2>Add New Student</h2>
//           <p>Fill in the details below to register a student</p>
//         </div>

//         <form onSubmit={registeruser} className="sf-form">
//           <div className="sf-field">
//             <label htmlFor="name">Full Name</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               placeholder="e.g. Aarav Sharma"
//               value={data.name}
//               onChange={dataHandler}
//               required
//             />
//           </div>

//           <div className="sf-field">
//             <label htmlFor="rollNo">Roll Number</label>
//             <input
//               type="text"
//               id="rollNo"
//               name="rollNo"
//               placeholder="e.g. 24CS101"
//               value={data.rollNo}
//               onChange={dataHandler}
//               required
//             />
//           </div>

//           <div className="sf-field">
//             <label htmlFor="course">Course</label>
//             <input
//               type="text"
//               id="course"
//               name="course"
//               placeholder="e.g. Computer Science"
//               value={data.course}
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
//               {submitting ? "Adding..." : "Add Student"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Studentform;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Studentform.css";

const Studentform = ({ student, onClose, onSuccess }) => {
  const isEditMode = Boolean(student);

  const [data, setData] = useState({ name: "", rollNo: "", course: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (student) {
      setData({
        name: student.name || "",
        rollNo: student.rollNo || "",
        course: student.course || "",
      });
    }
  }, [student]);

  const dataHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (isEditMode) {
        await axios.put(
          `https://ims-backend-p5hr.onrender.com/admin/update/${student._id}`,
          data
        );
      } else {
        await axios.post(
          "https://ims-backend-p5hr.onrender.com/admin/registeruser",
          data
        );
        setData({ name: "", rollNo: "", course: "" });
      }
      onSuccess ? onSuccess() : onClose && onClose();
    } catch (err) {
      console.log(
        isEditMode ? "Failed to update: " + err : "Failed to register: " + err
      );
      alert(isEditMode ? "Failed to update student" : "Failed to register student");
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
          <h2>{isEditMode ? "Update Student" : "Add New Student"}</h2>
          <p>
            {isEditMode
              ? "Edit the details below and save your changes"
              : "Fill in the details below to register a student"}
          </p>
        </div>

        <form onSubmit={submitHandler} className="sf-form">
          <div className="sf-field">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="e.g. Aarav Sharma"
              value={data.name}
              onChange={dataHandler}
              required
            />
          </div>

          <div className="sf-field">
            <label htmlFor="rollNo">Roll Number</label>
            <input
              type="text"
              id="rollNo"
              name="rollNo"
              placeholder="e.g. 24CS101"
              value={data.rollNo}
              onChange={dataHandler}
              required
            />
          </div>

          <div className="sf-field">
            <label htmlFor="course">Course</label>
            <input
              type="text"
              id="course"
              name="course"
              placeholder="e.g. Computer Science"
              value={data.course}
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
                ? "Update Student"
                : "Add Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Studentform;