import { useState } from "react";
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
      const data = res.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      if (data.role === "admin") {
        navigate("/admin-dashboard");
      } else if (data.role === "teacher") {
        navigate("/teacher-dashboard");
      } else if (data.role === "student") {
        navigate("/student-dashboard");
      } else if (data.role === "Parent") {
        navigate("/parent-dashboard");
      }else {
        navigate("/login");
      }

    } catch (err) {
      setError("Invalid Email or Password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <h2 className="login-title">School Login</h2>

        {error && (
          <p className="login-error">{error}</p>
        )}

        <form onSubmit={handleLogin} className="login-form">

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className="login-input"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            className="login-input"
            required
          />

          <button type="submit" className="login-btn">
            Login
          </button>

        </form>
      </div>
    </div>
  );
}

export default Login;