// import React, { useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const Signup = () => {
//   const [data, setData] = useState({ name: "", email: "", password: "" });

//   const dataHandler = (e) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//   };

//   const registeradmin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         "https://ims-backend-p5hr.onrender.com/admin/register",
//         data
//       );

//       alert(res.data.message);
//       setData({ name: "", email: "", password: "" });
//       window.location.assign("/login");
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to register user");
//       console.log("failed to register user", err);
//     }
//   };

//   return (
//     <div className="container vh-100 d-flex justify-content-center align-items-center">
//       <div className="card p-4 shadow-sm w-100" style={{ maxWidth: "400px" }}>
//         <h2 className="card-title text-center mb-3">Create Account</h2>
//         <p className="text-center text-muted mb-4">Join EduMaster Institute</p>

//         <form onSubmit={registeradmin}>
//           <div className="mb-3">
//             <label htmlFor="name" className="form-label">
//               Full Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={data.name}
//               onChange={dataHandler}
//               className="form-control"
//               placeholder="Enter your full name"
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="email" className="form-label">
//               Email Address
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={data.email}
//               onChange={dataHandler}
//               className="form-control"
//               placeholder="Enter your email"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="password" className="form-label">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={data.password}
//               onChange={dataHandler}
//               className="form-control"
//               placeholder="Enter password"
//               required
//             />
//           </div>


//           <div className="mb-4">
//             <label htmlFor="password" className="form-label">
//               Admin secrete key
//             </label>
//             <input
//               type="password"
//               id="secrete-key"
//               name="secrete-key"
//               className="form-control"
//               placeholder="Enter admin secrete key"
//               required
//             />
//           </div>

//           <button type="submit" className="btn btn-primary w-100 mb-3">
//             Sign Up
//           </button>
//         </form>

//         <div className="text-center">
//           <p className="mb-0">
//             Already have an account? <Link to="/login">Login</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;


import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const [data, setData] = useState({ name: "", email: "", password: "", secreteKey: "" });
  const [loading, setLoading] = useState(false);

  const dataHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const registeradmin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "https://ims-backend-p5hr.onrender.com/admin/register",
        data
      );

      toast.success(res.data.message || "Account created successfully");
      setData({ name: "", email: "", password: "", secreteKey: "" });
      window.location.assign("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to register user");
      console.log("failed to register user", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{ background: "#ffffff", padding: "2rem 1rem" }}
    >
      <div
        className="card border w-100"
        style={{
          maxWidth: "440px",
          borderRadius: "20px",
          overflow: "hidden",
          borderColor: "#eef0f3",
          boxShadow: "0 10px 40px rgba(0,0,0,0.06)",
        }}
      >
        <div className="text-center pt-5 pb-3 px-4">
          <div
            className="d-inline-flex align-items-center justify-content-center mb-3"
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
              fontSize: "1.5rem",
            }}
          >
            🎓
          </div>
          <h2 className="fw-bold mb-1" style={{ color: "#1f2937" }}>
            Create Account
          </h2>
          <p className="mb-0 text-secondary" style={{ fontSize: "0.9rem" }}>
            Join EduMaster Institute
          </p>
        </div>

        <div className="card-body p-4 p-md-5 pt-2">
          <form onSubmit={registeradmin}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-semibold text-secondary">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={data.name}
                onChange={dataHandler}
                className="form-control py-2"
                style={{ borderRadius: "10px", border: "1.5px solid #e5e7eb" }}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold text-secondary">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={data.email}
                onChange={dataHandler}
                className="form-control py-2"
                style={{ borderRadius: "10px", border: "1.5px solid #e5e7eb" }}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-semibold text-secondary">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={data.password}
                onChange={dataHandler}
                className="form-control py-2"
                style={{ borderRadius: "10px", border: "1.5px solid #e5e7eb" }}
                placeholder="Enter password"
                required
              />
            </div>

            {/* <div className="mb-4">
              <label htmlFor="secreteKey" className="form-label fw-semibold text-secondary">
                Admin Secret Key
              </label>
              <input
                type="password"
                id="secreteKey"
                name="secreteKey"
                value={data.secreteKey}
                onChange={dataHandler}
                className="form-control py-2"
                style={{ borderRadius: "10px", border: "1.5px solid #e5e7eb" }}
                placeholder="Enter admin secret key"
                required
              />
            </div> */}

            <button
              type="submit"
              disabled={loading}
              className="btn w-100 mb-3 fw-semibold text-white py-2"
              style={{
                background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                border: "none",
                borderRadius: "10px",
                opacity: loading ? 0.8 : 1,
              }}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <div className="text-center">
            <p className="mb-0 text-secondary">
              Already have an account?{" "}
              <Link to="/login" className="fw-semibold text-decoration-none" style={{ color: "#4f46e5" }}>
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;