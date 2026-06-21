
// import React, { useEffect, useState } from "react";
// import Sidebar from "./Sidebar";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles/Staff.css";
// import Staffform from "./Staffform";

// function Staff() {
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
//         "https://ims-backend-p5hr.onrender.com/admin/staff",
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

//   const deleteStaff = async (id) => {
//     if (window.confirm("Are you sure you want to delete this staff member?")) {
//       const token = localStorage.getItem("token");
//       try {
//         await axios.delete(
//           `https://ims-backend-p5hr.onrender.com/admin/staffdelete/${id}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           },
//         );
//         toast.success("Staff member deleted successfully");
//         fetchData();
//       } catch (err) {
//         console.log(err);
//         toast.error("Failed to delete staff member");
//       }
//     }
//   };

//   const filteredData = data.filter((staff) =>
//     (staff?.name || "").toLowerCase().includes((search || "").toLowerCase()),
//   );

//   return (
//     <div className="students-container">
//       <Sidebar />

//       <main className="students-main">
//         <header className="students-header">
//           <h1>Staff Management</h1>
//           <p>View, search, and manage all staff members</p>
//         </header>

//         {/* Top Bar */}
//         <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-2">
//           <input
//             type="text"
//             className="form-control students-search"
//             placeholder="🔍 Search staff..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           <button
//             className="btn add-student-btn"
//             onClick={() => setShowForm(true)}
//           >
//             + Add Staff
//           </button>
//         </div>

//         {/* Staff Table */}
//         <div className="table-responsive">
//           {/* <table className="table students-table mb-0"> */}
//            <table className="table rounded-4 overflow-hidden students-table mb-0">
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Name</th>
//                 <th>Department</th>
//                 <th>Email</th>
//                 <th>Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="5" className="text-center py-4 text-muted">
//                     Loading staff members...
//                   </td>
//                 </tr>
//               ) : filteredData.length === 0 ? (
//                 <tr>
//                   <td colSpan="5" className="text-center py-4 text-muted">
//                     No staff members found
//                   </td>
//                 </tr>
//               ) : (
//                 filteredData.map((val, index) => (
//                   <tr key={val._id || index}>
//                     <td>{index + 1}</td>
//                     <td className="fw-semibold">{val.name}</td>
//                     <td>{val.department}</td>
//                     <td>{val.email}</td>
//                     <td className="d-flex gap-2">
//                       <button
//                         className="btn btn-sm edit-btn"
//                         onClick={() => setShowForm(val)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="btn btn-sm delete-btn"
//                         onClick={() => deleteStaff(val._id)}
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
//         <Staffform
//           staff={showForm === true ? null : showForm}
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

// export default Staff;


import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Staff.css";
import Staffform from "./Staffform";
import ConfirmModal from "./ConfirmModal";

function Staff() {
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
        "https://ims-backend-p5hr.onrender.com/admin/staff",
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
  const askDeleteStaff = (id, name) => {
    setConfirmDelete({ show: true, id, name });
  };

  // Actually performs the delete, called from modal's onConfirm
  const deleteStaff = async () => {
    const { id } = confirmDelete;
    if (!id) return;

    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `https://ims-backend-p5hr.onrender.com/admin/staffdelete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      toast.success("Staff member deleted successfully");
      fetchData();
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete staff member");
    } finally {
      setConfirmDelete({ show: false, id: null, name: "" });
    }
  };

  const filteredData = data.filter((staff) =>
    (staff?.name || "").toLowerCase().includes((search || "").toLowerCase()),
  );

  return (
    <div className="students-container">
      <Sidebar />

      <main className="students-main">
        <header className="students-header">
          <h1>Staff Management</h1>
          <p>View, search, and manage all staff members</p>
        </header>

        {/* Top Bar */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-2">
          <input
            type="text"
            className="form-control students-search"
            placeholder="🔍 Search staff..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="btn add-student-btn"
            onClick={() => setShowForm(true)}
          >
            + Add Staff
          </button>
        </div>

        {/* Staff Table */}
        <div className="table-responsive">
          <table className="table rounded-4 overflow-hidden students-table mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Department</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">
                    Loading staff members...
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">
                    No staff members found
                  </td>
                </tr>
              ) : (
                filteredData.map((val, index) => (
                  <tr key={val._id || index}>
                    <td>{index + 1}</td>
                    <td className="fw-semibold">{val.name}</td>
                    <td>{val.department}</td>
                    <td>{val.email}</td>
                    <td className="d-flex gap-2">
                      <button
                        className="btn btn-sm edit-btn"
                        onClick={() => setShowForm(val)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm delete-btn"
                        onClick={() => askDeleteStaff(val._id, val.name)}
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
        <Staffform
          staff={showForm === true ? null : showForm}
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
        title="Delete Staff Member"
        message={
          confirmDelete.name
            ? `Are you sure you want to delete "${confirmDelete.name}"? This action cannot be undone.`
            : "Are you sure you want to delete this staff member? This action cannot be undone."
        }
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        onCancel={() => setConfirmDelete({ show: false, id: null, name: "" })}
        onConfirm={deleteStaff}
      />
    </div>
  );
}

export default Staff;
