import { useState } from "react";
import login from "../assets/login.png"
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", formData);

      console.log("Response Data:", res.data)

      const data = res.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      if (data.role === "admin") {
        navigate("/admin-dashboard");
      } else if (data.role === "Teacher") {
        navigate("/teacher-dashboard");
      } else if (data.role === "Student") {
        navigate("/student-dashboard");
      } else if (data.role === "Parent") {
        navigate("/parent-dashboard");
      } else {
        navigate("/login");
      }

    } catch (err) {
      setError("Invalid Email or Password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">

        {/* Left Side */}
        <div className="login-left">

          <h1 className="logo"></h1>
          <p className="subtitle">School Management System</p>

          <h3 className="login-title">Login to your account</h3>

          {error && <p className="login-error">{error}</p>}

          <form onSubmit={handleLogin} className="login-form">

            <input
              type="email"
              name="email"
              placeholder="Username or Email"
              value={formData.email}
              onChange={handleChange}
              className="login-input"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="login-input"
              required
            />

          

            <button type="submit" className="login-button">
              Login
            </button>

            <div className="abc">
              <p>Don't have an account?</p>
              <a href="/register">Register</a>
            </div>

          </form>

        </div>

        {/* Right Side */}
        <div className="login-right">

          <img src={login} alt="Login"/>

        </div>

      </div>

    </div>
  )
};
export default Login;