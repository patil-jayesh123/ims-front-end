import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Course.css";

function Course() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPublicCourses = async () => {
      try {
        const result = await axios.get(
          "https://ims-backend-p5hr.onrender.com/admin/courses"
        );
        const publicCourses = result.data.filter((c) => c.isPublic);
        setCourses(publicCourses);
      } catch (err) {
        console.log("Failed to fetch courses", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPublicCourses();
  }, []);

  const filteredData = courses.filter((course) =>
    (course?.name || "").toLowerCase().includes((search || "").toLowerCase())
  );

  return (
    <div className="course-page">
      <div className="course-page__inner">

        {/* Header */}
        <header className="course-page__header">
          <h1 className="course-page__title">Courses</h1>
          <p className="course-page__subtitle">Explore our available courses</p>
        </header>

        {/* Search */}
        <div className="course-page__search-wrap">
          <input
            type="text"
            className="course-page__search"
            placeholder="🔍 Search course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="course-page__table-wrap">
          <table className="course-page__table">
            <thead>
              <tr>
                <th>#</th>
                <th>Course Name</th>
                <th>Duration</th>
                <th>Instructor</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="course-page__state">
                    Loading courses...
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan="4" className="course-page__state">
                    {search
                      ? "No courses match your search."
                      : "No courses available at the moment."}
                  </td>
                </tr>
              ) : (
                filteredData.map((val, index) => (
                  <tr key={val._id || index}>
                    <td>{index + 1}</td>
                    <td className="course-page__name">{val.name}</td>
                    <td>{val.duration}</td>
                    <td>{val.instructor}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default Course;