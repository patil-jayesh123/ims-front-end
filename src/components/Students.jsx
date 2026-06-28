import React, { useEffect, useState } from "react";
import { useSidebar } from "./SidebarContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import ConfirmModal from "./ConfirmModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Students.css";
import Studentform from "./Studentform";

function Students() {
  const { isOpen } = useSidebar();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "table"

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
        { headers: { Authorization: `Bearer ${token}` } }
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

  const askDeleteStudent = (id, name) => {
    setConfirmDelete({ show: true, id, name });
  };

  const deleteStudent = async () => {
    const { id } = confirmDelete;
    if (!id) return;
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `https://ims-backend-p5hr.onrender.com/admin/delete/${id}`,
        { headers: { "x-token": token } }
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
    (student?.name || "").toLowerCase().includes((search || "").toLowerCase())
  );

  // Avatar initials helper
  const getInitials = (name = "") =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  const avatarColors = [
    "#6366f1","#7c3aed","#0ea5e9","#10b981","#f59e0b","#ef4444","#ec4899","#14b8a6",
  ];
  const getColor = (name = "") =>
    avatarColors[name.charCodeAt(0) % avatarColors.length];

  return (
    <div className="students-container">
      <Sidebar />

      <main className={`students-main ${!isOpen ? "students-main--collapsed" : ""}`}>
        <header className="students-header">
          <h1>Student Management</h1>
          <p>View, search, and manage all enrolled students</p>
        </header>

        {/* Top Bar */}
        <div className="ims-topbar">
          <input
            type="text"
            className="students-search"
            placeholder="🔍 Search student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="ims-topbar-right">
            {/* View toggle */}
            <div className="view-toggle">
              <button
                className={`view-toggle-btn ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => setViewMode("grid")}
                title="Grid view"
              >
                ⊞
              </button>
              <button
                className={`view-toggle-btn ${viewMode === "table" ? "active" : ""}`}
                onClick={() => setViewMode("table")}
                title="Table view"
              >
                ☰
              </button>
            </div>
            <button className="btn add-student-btn" onClick={() => setShowForm(true)}>
              + Add Student
            </button>
          </div>
        </div>

        {/* Count badge */}
        {!loading && (
          <p className="ims-count">
            Showing <strong>{filteredData.length}</strong> student{filteredData.length !== 1 ? "s" : ""}
          </p>
        )}

        {/* ── GRID VIEW ── */}
        {viewMode === "grid" && (
          <div className="ims-grid">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="ims-card skeleton-card" />
              ))
            ) : filteredData.length === 0 ? (
              <div className="ims-empty">
                <span>🎓</span>
                <p>No students found</p>
              </div>
            ) : (
              filteredData.map((val, index) => (
                <div key={val._id} className="ims-card">
                  <div className="ims-card-avatar" style={{ background: getColor(val.name) }}>
                    {getInitials(val.name)}
                  </div>
                  <div className="ims-card-body">
                    <h3 className="ims-card-name">{val.name}</h3>
                    <div className="ims-card-meta">
                      <span className="ims-badge ims-badge-purple">📚 {val.course}</span>
                      <span className="ims-badge ims-badge-gray">🎫 {val.rollNo}</span>
                    </div>
                  </div>
                  <div className="ims-card-actions">
                    <button className="btn btn-sm edit-btn" onClick={() => setShowForm(val)}>
                      ✏️ Edit
                    </button>
                    <button className="btn btn-sm delete-btn" onClick={() => askDeleteStudent(val._id, val.name)}>
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ── TABLE VIEW ── */}
        {viewMode === "table" && (
          <div className="table-responsive ims-table-wrapper">
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
                    <td colSpan="5" className="text-center py-4 text-muted">Loading students...</td>
                  </tr>
                ) : filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-muted">No students found</td>
                  </tr>
                ) : (
                  filteredData.map((val, index) => (
                    <tr key={val._id}>
                      <td>{index + 1}</td>
                      <td className="fw-semibold">
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span
                            className="ims-table-avatar"
                            style={{ background: getColor(val.name) }}
                          >
                            {getInitials(val.name)}
                          </span>
                          {val.name}
                        </div>
                      </td>
                      <td>{val.course}</td>
                      <td>{val.rollNo}</td>
                      <td className="d-flex gap-2">
                        <button className="btn btn-sm edit-btn" onClick={() => setShowForm(val)}>Edit</button>
                        <button className="btn btn-sm delete-btn" onClick={() => askDeleteStudent(val._id, val.name)}>Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {showForm && (
        <Studentform
          student={showForm === true ? null : showForm}
          onClose={() => setShowForm(false)}
          onSuccess={() => { setShowForm(false); fetchData(); }}
        />
      )}

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