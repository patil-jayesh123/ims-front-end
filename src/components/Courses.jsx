// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";
// import Sidebar from "./Sidebar";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles/Courses.css";
// import Courseform from "./Courseform";

// function Courses() {
//   const navigate = useNavigate();
//   const [search, setSearch] = useState("");
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showForm, setShowForm] = useState(false);

//   const fetchData = async () => {
//     setLoading(true);

//     try {
//       const token = localStorage.getItem("token");
//       const result = await axios.get(
//         "https://ims-backend-p5hr.onrender.com/admin/courses",
//         { headers: { Authorization: `Bearer ${token}` } },
//       );
//       setData(result.data);
//     } catch (err) {
//       console.log("Failed to fetch data", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const filteredData = data.filter((course) =>
//     (course?.name || "").toLowerCase().includes((search || "").toLowerCase()),
//   );

//   const deletecourse = async (id) => {
//     if (window.confirm("are you sure you want to delete this course")) {
//       const token = localStorage.getItem("token");
//       try {
//         await axios.delete(
//           `https://ims-backend-p5hr.onrender.com/admin/coursedelete/${id}`,
//           {
//             headers: { "x-token": token },
//           },
//         );
//         toast.success("Course deleted successfully");
//         fetchData();
//       } catch (err) {
//         console.log(err);
//         toast.error("failed to delete");
//       }
//     }
//   };

//   return (
//     <div className="students-container">
//       <Sidebar />

//       <main className="students-main">
//         <header className="students-header">
//           <h1>Courses Management</h1>
//           <p>View, search, and manage all available courses</p>
//         </header>

//         {/* Top Bar */}
//         <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-2">
//           <input
//             type="text"
//             className="form-control students-search"
//             placeholder="🔍 Search course..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           <button
//             className="btn add-student-btn"
//             onClick={() => setShowForm(true)}
//           >
//             + Add Course
//           </button>
//         </div>

//         {/* Courses Table */}
//         <div className="table-responsive">
//           {/* <table className="table students-table mb-0"> */}
//           <table className="table rounded-4 overflow-hidden students-table mb-0">
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Course Name</th>
//                 <th>Duration</th>
//                 <th>Instructor</th>
//                 <th>Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="5" className="text-center py-4 text-muted">
//                     Loading courses...
//                   </td>
//                 </tr>
//               ) : filteredData.length === 0 ? (
//                 <tr>
//                   <td colSpan="5" className="text-center py-4 text-muted">
//                     No courses found
//                   </td>
//                 </tr>
//               ) : (
//                 filteredData.map((val, index) => (
//                   <tr key={val._id || index}>
//                     <td>{index + 1}</td>
//                     <td className="fw-semibold">{val.name}</td>
//                     <td>{val.duration}</td>
//                     <td>{val.instructor}</td>
//                     <td className="d-flex gap-2">
//                       {/* <button className="btn btn-sm edit-btn">Edit</button> */}
//                       <button
//                         className="btn btn-sm edit-btn"
//                         onClick={() => setShowForm(val)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="btn btn-sm delete-btn"
//                         onClick={() => deletecourse(val._id)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </main>
//       {showForm && (
//         // <Courseform
//         //   onClose={() => setShowForm(false)}
//         //   onSuccess={() => {
//         //     setShowForm(false);
//         //     fetchData();
//         //   }}
//         // />
//         <Courseform
//           course={showForm === true ? null : showForm}
//           onClose={() => setShowForm(false)}
//           onSuccess={() => {
//             setShowForm(false);
//             fetchData();
//           }}
//         />
//       )}
//     </div>
//   );
// }

// export default Courses;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Courses.css";
import Courseform from "./Courseform";
import ConfirmModal from "./ConfirmModal";

function Courses() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // New state for delete confirmation
  const [confirmDelete, setConfirmDelete] = useState({
    show: false,
    id: null,
    name: "",
  });

  const fetchData = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const result = await axios.get(
        "https://ims-backend-p5hr.onrender.com/admin/courses",
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setData(result.data);
    } catch (err) {
      console.log("Failed to fetch data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data.filter((course) =>
    (course?.name || "").toLowerCase().includes((search || "").toLowerCase()),
  );

  // Opens the modal instead of window.confirm
  const askDeleteCourse = (id, name) => {
    setConfirmDelete({ show: true, id, name });
  };

  // Actually performs the delete, called from modal's onConfirm
  const deletecourse = async () => {
    const { id } = confirmDelete;
    if (!id) return;

    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `https://ims-backend-p5hr.onrender.com/admin/coursedelete/${id}`,
        {
          headers: { "x-token": token },
        },
      );
      toast.success("Course deleted successfully");
      fetchData();
    } catch (err) {
      console.log(err);
      toast.error("failed to delete");
    } finally {
      setConfirmDelete({ show: false, id: null, name: "" });
    }
  };

  return (
    <div className="students-container">
      <Sidebar />

      <main className="students-main">
        <header className="students-header">
          <h1>Courses Management</h1>
          <p>View, search, and manage all available courses</p>
        </header>

        {/* Top Bar */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-2">
          <input
            type="text"
            className="form-control students-search"
            placeholder="🔍 Search course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="btn add-student-btn"
            onClick={() => setShowForm(true)}
          >
            + Add Course
          </button>
        </div>

        {/* Courses Table */}
        <div className="table-responsive">
          <table className="table rounded-4 overflow-hidden students-table mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Course Name</th>
                <th>Duration</th>
                <th>Instructor</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">
                    Loading courses...
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">
                    No courses found
                  </td>
                </tr>
              ) : (
                filteredData.map((val, index) => (
                  <tr key={val._id || index}>
                    <td>{index + 1}</td>
                    <td className="fw-semibold">{val.name}</td>
                    <td>{val.duration}</td>
                    <td>{val.instructor}</td>
                    <td className="d-flex gap-2">
                      <button
                        className="btn btn-sm edit-btn"
                        onClick={() => setShowForm(val)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm delete-btn"
                        onClick={() => askDeleteCourse(val._id, val.name)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {showForm && (
        <Courseform
          course={showForm === true ? null : showForm}
          onClose={() => setShowForm(false)}
          onSuccess={() => {
            setShowForm(false);
            fetchData();
          }}
        />
      )}

      {/* Delete confirmation modal */}
      <ConfirmModal
        show={confirmDelete.show}
        title="Delete Course"
        message={
          confirmDelete.name
            ? `Are you sure you want to delete "${confirmDelete.name}"? This action cannot be undone.`
            : "Are you sure you want to delete this course? This action cannot be undone."
        }
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        onCancel={() => setConfirmDelete({ show: false, id: null, name: "" })}
        onConfirm={deletecourse}
      />
    </div>
  );
}

export default Courses;
