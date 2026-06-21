// import React, { useState } from "react";
// import axios from "axios";
// import "../styles/Courseform.css";

// const Courseform = ({ onClose, onSuccess }) => {
//   const [data, setData] = useState({ name: "", duration: "", instructor: "" });
//   const [submitting, setSubmitting] = useState(false);

//   const dataHandler = (e) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//   };

//   const savecourse = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     try {
//       await axios.post(
//         "https://ims-backend-p5hr.onrender.com/admin/savecourse",
//         data,
//       );
//       setData({ name: "", duration: "", instructor: "" });
//       onSuccess ? onSuccess() : onClose && onClose();
//     } catch (err) {
//       console.log(err);
//       alert("Failed to add course");
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
//           <h2>Add New Course</h2>
//           <p>Fill in the details below to add a course</p>
//         </div>

//         <form onSubmit={savecourse} className="sf-form">
//           <div className="sf-field">
//             <label htmlFor="name">Course Name</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               placeholder="e.g. Web Development"
//               value={data.name}
//               onChange={dataHandler}
//               required
//             />
//           </div>

//           <div className="sf-field">
//             <label htmlFor="duration">Duration</label>
//             <input
//               type="text"
//               id="duration"
//               name="duration"
//               placeholder="e.g. 3 Months"
//               value={data.duration}
//               onChange={dataHandler}
//               required
//             />
//           </div>

//           <div className="sf-field">
//             <label htmlFor="instructor">Instructor Name</label>
//             <input
//               type="text"
//               id="instructor"
//               name="instructor"
//               placeholder="e.g. John Doe"
//               value={data.instructor}
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
//               {submitting ? "Adding..." : "Add Course"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Courseform;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Courseform.css";
import { toast } from "react-toastify";

const Courseform = ({ course, onClose, onSuccess }) => {
  const isEditMode = Boolean(course);

  const [data, setData] = useState({ name: "", duration: "", instructor: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (course) {
      setData({
        name: course.name || "",
        duration: course.duration || "",
        instructor: course.instructor || "",
      });
    }
  }, [course]);

  const dataHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (isEditMode) {
        await axios.put(
          `https://ims-backend-p5hr.onrender.com/admin/courseupdate/${course._id}`,
          data,
        );
      } else {
        await axios.post(
          "https://ims-backend-p5hr.onrender.com/admin/savecourse",
          data,
        );
        setData({ name: "", duration: "", instructor: "" });
      }
      onSuccess ? onSuccess() : onClose && onClose();
    } catch (err) {
      console.log(
        isEditMode
          ? "Failed to update: " + err
          : "Failed to add course: " + err,
      );
      toast.error(isEditMode ? "Failed to update course" : "Failed to add course");
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
          <h2>{isEditMode ? "Update Course" : "Add New Course"}</h2>
          <p>
            {isEditMode
              ? "Edit the details below and save your changes"
              : "Fill in the details below to add a course"}
          </p>
        </div>

        <form onSubmit={submitHandler} className="sf-form">
          <div className="sf-field">
            <label htmlFor="name">Course Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="e.g. Web Development"
              value={data.name}
              onChange={dataHandler}
              required
            />
          </div>

          <div className="sf-field">
            <label htmlFor="duration">Duration</label>
            <input
              type="text"
              id="duration"
              name="duration"
              placeholder="e.g. 3 Months"
              value={data.duration}
              onChange={dataHandler}
              required
            />
          </div>

          <div className="sf-field">
            <label htmlFor="instructor">Instructor Name</label>
            <input
              type="text"
              id="instructor"
              name="instructor"
              placeholder="e.g. John Doe"
              value={data.instructor}
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
                  ? "Update Course"
                  : "Add Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Courseform;
