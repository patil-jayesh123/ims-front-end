import React from "react";
import "../styles/Course.css"; // Optional custom styles

function Course() {
  return (
    <div className="courses-page container py-5">
      {/* Header */}
      <header className="courses-header mb-4 text-center">
        <h1>Courses</h1>
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
            <tr>
              <th scope="row">1</th>
              <td>Web Development</td>
              <td>6 Months</td>
              <td>Mr. Sharma</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Data Science</td>
              <td>8 Months</td>
              <td>Ms. Priya</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>UI/UX Design</td>
              <td>4 Months</td>
              <td>Mr. Rahul</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Course;
