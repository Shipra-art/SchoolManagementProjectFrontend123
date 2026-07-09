import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../App.css";

function Timetable() {
    const navigate = useNavigate();

    const [timetable, setTimetable] = useState([]);
    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({
        id: "",
        period: "",
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: ""
    });

    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        getTimetable();
    }, []);

    // Get Timetable
    const getTimetable = async () => {
        try {
            const res = await api.get("/Timetable");
            setTimetable(res.data);
        } catch (err) {
            console.log(err);
            alert("Unable to load timetable.");
        } finally {
            setLoading(false);
        }
    };

    // Input Change
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // Add / Update
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isEdit) {
                await api.put(`/Timetable/${form.id}`, form);
                alert("Timetable Updated Successfully");
            } else {
                await api.post("/Timetable", form);
                alert("Timetable Added Successfully");
            }

            resetForm();
            getTimetable();

        } catch (err) {
            console.log(err);
            alert("Something went wrong.");
        }
    };

    // Edit
    const handleEdit = (item) => {
        setForm(item);
        setIsEdit(true);
    };

    // Delete
    const handleDelete = async (id) => {

        if (!window.confirm("Delete this timetable?"))
            return;

        try {
            await api.delete(`/Timetable/${id}`);
            alert("Deleted Successfully");
            getTimetable();
        } catch (err) {
            console.log(err);
            alert("Delete Failed");
        }
    };

    // Reset   
    const resetForm = () => {
        setForm({
            id: "",
            period: "",
            monday: "",
            tuesday: "",
            wednesday: "",
            thursday: "",
            friday: "",
            saturday: ""
        });

        setIsEdit(false);
    };

    return (
        <div className="dashboard">

            {/* Sidebar */}

            <div className="sidebar">

                <h2>School System</h2>
                <ul className="adm-nav">

                    <li onClick={() => navigate("/student-list")} className="adm-nav-item">Student List  </li>
                    <li onClick={() => navigate("/teacher")} className="adm-nav-item"> Teacher List</li>
                    <li onClick={() => navigate("/parent-list")} className="adm-nav-item"> Parent List</li>
                    <li onClick={() => navigate("/AdminAttendance")} className="adm-nav-item"> Attendance List</li>
                    <li onClick={() => navigate("/EditAddMarks")} className="adm-nav-item">Edit Marks </li>
                   <li onClick={() => navigate("/TimetableAddEdit")} className="adm-nav-item">Time Table</li>
                    <li onClick={() => navigate("/")} className="adm-nav-item adm-logout"> Logout</li>
                </ul>

            </div>

            {/* Main */}

            <div className="main-content">

                <h1>Time Table Management</h1>

                {/* Form */}

                <form onSubmit={handleSubmit} className="table-form">

                    <input
                        type="text"
                        name="period"
                        placeholder="Period"
                        value={form.period}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="monday"
                        placeholder="Monday"
                        value={form.monday}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="tuesday"
                        placeholder="Tuesday"
                        value={form.tuesday}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="wednesday"
                        placeholder="Wednesday"
                        value={form.wednesday}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="thursday"
                        placeholder="Thursday"
                        value={form.thursday}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="friday"
                        placeholder="Friday"
                        value={form.friday}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="saturday"
                        placeholder="Saturday"
                        value={form.saturday}
                        onChange={handleChange}
                    />

                    <button type="submit">
                        {isEdit ? "Update" : "Add"}
                    </button>

                    {isEdit && (
                        <button
                            type="button"
                            onClick={resetForm}
                        >
                            Cancel
                        </button>
                    )}

                </form>

                <br />

                {loading ? (
                    <h3>Loading...</h3>
                ) : (

                    <table border="1" cellPadding="10">

                        <thead>

                            <tr>
                                <th>Period</th>
                                <th>Monday</th>
                                <th>Tuesday</th>
                                <th>Wednesday</th>
                                <th>Thursday</th>
                                <th>Friday</th>
                                <th>Saturday</th>
                                <th>Action</th>
                            </tr>

                        </thead>

                        <tbody>

                            {timetable.length > 0 ? (

                                timetable.map((item) => (

                                    <tr key={item.id}>

                                        <td>{item.period}</td>
                                        <td>{item.monday}</td>
                                        <td>{item.tuesday}</td>
                                        <td>{item.wednesday}</td>
                                        <td>{item.thursday}</td>
                                        <td>{item.friday}</td>
                                        <td>{item.saturday}</td>

                                        <td>

                                            <button
                                                onClick={() => handleEdit(item)}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                style={{
                                                    marginLeft: "10px",
                                                    background: "red",
                                                    color: "white"
                                                }}
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="8"
                                        style={{ textAlign: "center" }}
                                    >
                                        No Timetable Available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}

            </div>

        </div>
    );
}

export default Timetable;