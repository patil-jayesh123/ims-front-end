import React from "react";
import "../styles/Course.css";

function Course() {
  return (
    <div className="courses-page">
      <header className="courses-header">
        <h1>Courses</h1>
      </header>

      <div className="table-wrapper">
        <table className="courses-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Course Name</th>
              <th>Duration</th>
              <th>Instructor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Web Development</td>
              <td>6 Months</td>
              <td>Mr. Sharma</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Data Science</td>
              <td>8 Months</td>
              <td>Ms. Priya</td>
            </tr>
            <tr>
              <td>3</td>
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
