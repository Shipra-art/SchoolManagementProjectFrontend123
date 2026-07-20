import React, { useState } from "react";
import api from "../api/axios";
import login from "../assets/login.png"
import "../App.css";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: ""
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await api.post("/auth/register", formData);

            alert("Registration Successful");
            navigate("/login");

        } catch (error) {
            alert("Registration Failed");
            console.log(error);
        }
    };

    return (

        <div className="login-page">
            <div className="login-container">

                {/* Left Side */}
                <div className="login-left">

                    <h1 className="logo"></h1>
                    <p className="subtitle">School Management System</p>

                    <h3 className="login-title">Register to your account</h3>

                    {error && <p className="login-error">{error}</p>}

                    <form onSubmit={handleRegister} className="login-form">

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="login-input"
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="login-input"
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="login-input"
                        />

                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="login-input"
                        >
                            <option value="">Select Role</option>
                            <option value="Student">Student</option>
                            <option value="Teacher">Teacher</option>
                            <option value="Parent">Parent</option>
                        </select>

                        <button type="submit" className="register-btn">
                            Register
                        </button>

                        <div className="abc" >
                            <p>Already have a account?</p>
                            <a href="/login">Login</a>
                        </div>

                    </form>
                </div>

                <div className="login-right">

                    <img src={login} alt="Login" />

                </div>
            </div>
        </div>

    );
}

export default Register;