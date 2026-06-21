// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";
// import Sidebar from "./Sidebar";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles/Students.css";
// import Studentform from "./Studentform";

// function Students() {
//   const navigate = useNavigate();
//   const [data, setData] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showForm, setShowForm] = useState(false);

//   const fetchData = async () => {
//     setLoading(true);

//     try {
//       const token = localStorage.getItem("token");
//       const result = await axios.get(
//         "https://ims-backend-p5hr.onrender.com/admin/student",
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

//   const deleteStudent = async (id) => {
//     if (window.confirm("Are you sure you want to delete this student?")) {
//       const token = localStorage.getItem("token");
//       try {
//         await axios.delete(
//           `https://ims-backend-p5hr.onrender.com/admin/delete/${id}`,
//           {
//             headers: { "x-token": token },
//           },
//         );
//         toast.success("Student deleted successfully");
//         fetchData();
//       } catch (err) {
//         console.log(err);
//         toast.error("Failed to delete student");
//       }
//     }
//   };

//   const filteredData = data.filter((student) =>
//     (student?.name || "").toLowerCase().includes((search || "").toLowerCase()),
//   );

//   return (
//     <div className="students-container">
//       <Sidebar />

//       <main className="students-main">
//         <header className="students-header">
//           <h1>Student Management</h1>
//           <p>View, search, and manage all enrolled students</p>
//         </header>

//         {/* Top Bar */}
//         {/* <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-2"> */}
//         <div className="d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center mb-4 gap-3">
//           <input
//             type="text"
//             className="form-control students-search"
//             placeholder="🔍 Search student..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           {/* <Link to="/admin/studentform" className="btn add-student-btn">
//             + Add Student
//           </Link> */}
//           <button
//             className="btn add-student-btn"
//             onClick={() => setShowForm(true)}
//           >
//             + Add Student
//           </button>
//         </div>

//         {/* Student Table */}
//         {/* <div className="table-responsive students-table-wrapper"> */}
//         <div className="table-responsive">
//           <table className="table rounded-4 overflow-hidden students-table mb-0">
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Name</th>
//                 <th>Course</th>
//                 <th>Roll No.</th>
//                 <th>Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="5" className="text-center py-4 text-muted">
//                     Loading students...
//                   </td>
//                 </tr>
//               ) : filteredData.length === 0 ? (
//                 <tr>
//                   <td colSpan="5" className="text-center py-4 text-muted">
//                     No students found
//                   </td>
//                 </tr>
//               ) : (
//                 filteredData.map((val, index) => (
//                   <tr key={val._id}>
//                     <td>{index + 1}</td>
//                     <td className="fw-semibold">{val.name}</td>
//                     <td>{val.course}</td>
//                     <td>{val.rollNo}</td>
//                     <td className="d-flex gap-2">
//                       <button
//                         className="btn btn-sm edit-btn"
//                         onClick={() => setShowForm(val)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="btn btn-sm delete-btn"
//                         onClick={() => deleteStudent(val._id)}
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
//         <Studentform
//           student={showForm === true ? null : showForm}
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

// export default Students;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import ConfirmModal from "./ConfirmModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Students.css";
import Studentform from "./Studentform";

function Students() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
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
        "https://ims-backend-p5hr.onrender.com/admin/student",
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

  // Opens the modal instead of window.confirm
  const askDeleteStudent = (id, name) => {
    setConfirmDelete({ show: true, id, name });
  };

  // Actually performs the delete, called from modal's onConfirm
  const deleteStudent = async () => {
    const { id } = confirmDelete;
    if (!id) return;

    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `https://ims-backend-p5hr.onrender.com/admin/delete/${id}`,
        {
          headers: { "x-token": token },
        },
      );
      toast.success("Student deleted successfully");
      fetchData();
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete student");
    } finally {
      setConfirmDelete({ show: false, id: null, name: "" });
    }
  };

  const filteredData = data.filter((student) =>
    (student?.name || "").toLowerCase().includes((search || "").toLowerCase()),
  );

  return (
    <div className="students-container">
      <Sidebar />

      <main className="students-main">
        <header className="students-header">
          <h1>Student Management</h1>
          <p>View, search, and manage all enrolled students</p>
        </header>

        {/* Top Bar */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center mb-4 gap-3">
          <input
            type="text"
            className="form-control students-search"
            placeholder="🔍 Search student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="btn add-student-btn"
            onClick={() => setShowForm(true)}
          >
            + Add Student
          </button>
        </div>

        {/* Student Table */}
        <div className="table-responsive">
          <table className="table rounded-4 overflow-hidden students-table mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Course</th>
                <th>Roll No.</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">
                    Loading students...
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">
                    No students found
                  </td>
                </tr>
              ) : (
                filteredData.map((val, index) => (
                  <tr key={val._id}>
                    <td>{index + 1}</td>
                    <td className="fw-semibold">{val.name}</td>
                    <td>{val.course}</td>
                    <td>{val.rollNo}</td>
                    <td className="d-flex gap-2">
                      <button
                        className="btn btn-sm edit-btn"
                        onClick={() => setShowForm(val)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm delete-btn"
                        onClick={() => askDeleteStudent(val._id, val.name)}
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
        <Studentform
          student={showForm === true ? null : showForm}
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
        title="Delete Student"
        message={
          confirmDelete.name
            ? `Are you sure you want to delete "${confirmDelete.name}"? This action cannot be undone.`
            : "Are you sure you want to delete this student? This action cannot be undone."
        }
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        onCancel={() => setConfirmDelete({ show: false, id: null, name: "" })}
        onConfirm={deleteStudent}
      />
    </div>
  );
}

export default Students;
