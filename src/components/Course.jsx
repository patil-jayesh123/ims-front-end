import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Course.css";

function Course() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublicCourses = async () => {
      try {
        const result = await axios.get(
          "https://ims-backend-p5hr.onrender.com/admin/courses"
        );
        // Only show courses marked as public
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

  return (
    <div className="courses-page container py-5">
      {/* Header */}
      <header className="courses-header mb-4 text-center">
        <h1>Courses</h1>
        <p className="text-muted">Explore our available courses</p>
      </header>

      {/* Responsive Table */}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Course Name</th>
              <th scope="col">Duration</th>
              <th scope="col">Instructor</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-muted">
                  Loading courses...
                </td>
              </tr>
            ) : courses.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-muted">
                  No courses available at the moment.
                </td>
              </tr>
            ) : (
              courses.map((course, index) => (
                <tr key={course._id || index}>
                  <th scope="row">{index + 1}</th>
                  <td>{course.name}</td>
                  <td>{course.duration}</td>
                  <td>{course.instructor}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Course;