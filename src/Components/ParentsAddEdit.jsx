// React hook import
import React, { useEffect } from "react";

// Navigation aur URL params ke liye
import { useNavigate, useParams } from "react-router-dom";

// Axios API file
import api from "../api/axios";

// React Hook Form
import { useForm, Controller } from "react-hook-form";

// Yup validation resolver
import { yupResolver } from "@hookform/resolvers/yup";

// Validation schema
import { parentSchema } from "../validations/ParentSchema";

// PrimeReact Input
import { InputText } from "primereact/inputtext";

// PrimeReact Button
import { Button } from "primereact/button";

// CSS file
import "../App.css";

// Component Start
function ParentAddEdit({ toast }) {
    // Navigation function
    const navigate = useNavigate();

    // URL se id fetch
    const { id } = useParams();

    // React Hook Form setup
    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(parentSchema),

        // Default values
        defaultValues: {
            ParentName: "",
            email: "",
            studentId: "",
            password: "",
        },
    });

    // Form submit
    const onSubmit = async (data) => {
        try {
            if (id) {
                // Update
                await api.put(`/parent/${id}`, data);

                toast.current.show({
                    severity: "success",
                    summary: "Updated",
                    detail: "Parent updated successfully",
                    life: 3000,
                });
            } else {
                // Add
                await api.post("/parent", data);

                toast.current.show({
                    severity: "success",
                    summary: "Added",
                    detail: "Parent added successfully",
                    life: 3000,
                });
            }

            navigate("/parent-list");
        } catch (error) {
            console.error("Submit Error:", error);

            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Something Went Wrong",
                life: 3000,
            });
        }
    };

    // Edit mode
    useEffect(() => {
        if (id) {
            const fetchParent = async () => {
                try {
                    const res = await api.get(`/parent/${id}`);
                    const data = res.data;

                    setValue("name", data.name || "");
                    setValue("email", data.email || "");
                    setValue("studentId", data.studentId || "");
                    setValue("password", data.password || "");
                } catch (error) {
                    console.error("Fetch Error:", error);

                    toast.current.show({
                        severity: "error",
                        summary: "Error",
                        detail: "Unable to load parent data",
                        life: 3000,
                    });
                }
            };

            fetchParent();
        }
    }, [id, setValue, toast]);

    return (
        <div className="tea-page">
            <div className="tea-card">
                <h2 className="tea-title">
                    {id ? "Edit Parent" : "Add Parent"}
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="tea-form">

                    {/* Name */}
                    <div className="tea-field">
                        <label className="tea-label">Name</label>

                        <Controller
                            name="ParentName"
                            control={control}
                            render={({ field }) => (
                                <InputText
                                    {...field}
                                    value={field.value || ""}
                                    className="tea-input"
                                />
                            )}
                        />

                        <p className="tea-error">{errors.name?.message}</p>
                    </div>

                    {/* Email */}
                    <div className="tea-field">
                        <label className="tea-label">Email</label>

                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <InputText
                                    {...field}
                                    value={field.value || ""}
                                    className="tea-input"
                                />
                            )}
                        />

                        <p className="tea-error">{errors.email?.message}</p>
                    </div>

                    {/* Student ID */}
                    <div className="tea-field">
                        <label className="tea-label">Student ID</label>

                        <Controller
                            name="studentId"
                            control={control}
                            render={({ field }) => (
                                <InputText
                                    {...field}
                                    value={field.value || ""}
                                    className="tea-input"
                                />
                            )}
                        />

                        <p className="tea-error">{errors.studentId?.message}</p>
                    </div>

                    <div className="tea-field">
                        <label>Password</label>

                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <InputText
                                    type="password"
                                    {...field}
                                />
                            )}
                        />

                        <p>{errors.password?.message}</p>

                    </div>

                    <Button
                        label={id ? "Update Parent" : "Add Parent"}
                        type="submit"
                        className="tea-btn"
                    />
                </form>
            </div>
        </div>
    );
}

export default ParentAddEdit;