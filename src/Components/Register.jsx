import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "Student"
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://localhost:5001/api/auth/register",
        user
      );

      alert(res.data);
    } catch (error) {
      alert("Registration Failed");
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
        />

        <select name="role" onChange={handleChange}>
          <option>Student</option>
          <option>Teacher</option>
          <option>Parent</option>
        </select>

        <button type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;