import React, { useState } from "react";
import api from "../api/axios";
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
    
        <div className="register-page">
            <div className="register-card">
                <h2 className="register-title">Register</h2>

                <form onSubmit={handleRegister} className="register-form">

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="register-input"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="register-input"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="register-input"
                    />

                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="register-input"
                    >
                        <option value="">Select Role</option>
                        <option value="Student">Student</option>
                        <option value="Teacher">Teacher</option>
                        <option value="Parent">Parent</option>
                    </select>

                    <button type="submit" className="register-btn">
                        Register
                    </button>

                </form>
            </div>
        </div>

    );
}

export default Register;