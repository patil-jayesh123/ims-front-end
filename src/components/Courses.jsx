import React, { useEffect, useState } from "react";
import { useSidebar } from "./SidebarContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Courses.css";
import Courseform from "./Courseform";
import ConfirmModal from "./ConfirmModal";

function Courses() {
  const { isOpen } = useSidebar();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

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

  const filteredData = data.filter((course) =>
    (course?.name || "").toLowerCase().includes((search || "").toLowerCase())
  );

  const askDeleteCourse = (id, name) => {
    setConfirmDelete({ show: true, id, name });
  };

  const deletecourse = async () => {
    const { id } = confirmDelete;
    if (!id) return;
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `https://ims-backend-p5hr.onrender.com/admin/coursedelete/${id}`,
        { headers: { "x-token": token } }
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

  const courseIcons = ["📘", "📗", "📙", "📕", "📓", "📔", "📒", "🗂️"];
  const getCourseIcon = (name = "") => courseIcons[name.charCodeAt(0) % courseIcons.length];

  const gradients = [
    "linear-gradient(135deg,#6366f1,#4f46e5)",
    "linear-gradient(135deg,#7c3aed,#6d28d9)",
    "linear-gradient(135deg,#0ea5e9,#0284c7)",
    "linear-gradient(135deg,#10b981,#059669)",
    "linear-gradient(135deg,#f59e0b,#d97706)",
    "linear-gradient(135deg,#ef4444,#dc2626)",
    "linear-gradient(135deg,#ec4899,#db2777)",
    "linear-gradient(135deg,#14b8a6,#0d9488)",
  ];
  const getGradient = (name = "") => gradients[name.charCodeAt(0) % gradients.length];

  return (
    <div className="students-container">
      <Sidebar />

      <main className={`students-main ${!isOpen ? "students-main--collapsed" : ""}`}>
        <header className="students-header">
          <h1>Courses Management</h1>
          <p>View, search, and manage all available courses</p>
        </header>

        {/* Top Bar */}
        <div className="ims-topbar">
          <input
            type="text"
            className="students-search"
            placeholder="🔍 Search course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="ims-topbar-right">
            <div className="view-toggle">
              <button
                className={`view-toggle-btn ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => setViewMode("grid")}
                title="Grid view"
              >⊞</button>
              <button
                className={`view-toggle-btn ${viewMode === "table" ? "active" : ""}`}
                onClick={() => setViewMode("table")}
                title="Table view"
              >☰</button>
            </div>
            <button className="btn add-student-btn" onClick={() => setShowForm(true)}>
              + Add Course
            </button>
          </div>
        </div>

        {!loading && (
          <p className="ims-count">
            Showing <strong>{filteredData.length}</strong> course{filteredData.length !== 1 ? "s" : ""}
          </p>
        )}

        {/* ── GRID VIEW ── */}
        {viewMode === "grid" && (
          <div className="ims-grid ims-grid-courses">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="ims-course-card skeleton-card" />
              ))
            ) : filteredData.length === 0 ? (
              <div className="ims-empty">
                <span>📚</span>
                <p>No courses found</p>
              </div>
            ) : (
              filteredData.map((val) => (
                <div key={val._id} className="ims-course-card">
                  {/* Coloured top strip */}
                  <div className="ims-course-banner" style={{ background: getGradient(val.name) }}>
                    <span className="ims-course-icon">{getCourseIcon(val.name)}</span>
                    <span className={`ims-visibility-badge ${val.isPublic ? "public" : "private"}`}>
                      {val.isPublic ? "🌐 Public" : "🔒 Private"}
                    </span>
                  </div>

                  <div className="ims-course-body">
                    <h3 className="ims-course-name">{val.name}</h3>
                    <div className="ims-course-meta">
                      <div className="ims-course-meta-item">
                        <span className="meta-icon">⏱️</span>
                        <span>{val.duration}</span>
                      </div>
                      <div className="ims-course-meta-item">
                        <span className="meta-icon">👨‍🏫</span>
                        <span>{val.instructor}</span>
                      </div>
                    </div>
                  </div>

                  <div className="ims-card-actions">
                    <button className="btn btn-sm edit-btn" onClick={() => setShowForm(val)}>
                      ✏️ Edit
                    </button>
                    <button className="btn btn-sm delete-btn" onClick={() => askDeleteCourse(val._id, val.name)}>
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
                  <th>Course Name</th>
                  <th>Duration</th>
                  <th>Instructor</th>
                  <th>Visibility</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-muted">Loading courses...</td>
                  </tr>
                ) : filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-muted">No courses found</td>
                  </tr>
                ) : (
                  filteredData.map((val, index) => (
                    <tr key={val._id || index}>
                      <td>{index + 1}</td>
                      <td className="fw-semibold">
                        <span style={{ marginRight: 6 }}>{getCourseIcon(val.name)}</span>
                        {val.name}
                      </td>
                      <td>{val.duration}</td>
                      <td>{val.instructor}</td>
                      <td>
                        {val.isPublic ? (
                          <span className="badge bg-success">🌐 Public</span>
                        ) : (
                          <span className="badge bg-secondary">🔒 Private</span>
                        )}
                      </td>
                      <td className="d-flex gap-2">
                        <button className="btn btn-sm edit-btn" onClick={() => setShowForm(val)}>Edit</button>
                        <button className="btn btn-sm delete-btn" onClick={() => askDeleteCourse(val._id, val.name)}>Delete</button>
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
        <Courseform
          course={showForm === true ? null : showForm}
          onClose={() => setShowForm(false)}
          onSuccess={() => { setShowForm(false); fetchData(); }}
        />
      )}

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