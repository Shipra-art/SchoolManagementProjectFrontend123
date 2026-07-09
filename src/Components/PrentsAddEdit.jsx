// React hook import
import React, { useEffect } from 'react'

// Navigation aur URL params ke liye
import { useNavigate, useParams } from 'react-router-dom'

// Axios API file
import api from '../api/axios'

// React Hook Form
import { useForm, Controller } from 'react-hook-form'

// Yup validation resolver
import { yupResolver } from '@hookform/resolvers/yup'

// Validation schema
import { teacherSchema } from '../validations/TeacherSchema'

// PrimeReact Input
import { InputText } from 'primereact/inputtext'

// PrimeReact Button
import { Button } from 'primereact/button'

// CSS file
import '../App.css'

// Component Start
function ParentAddEdit({ toast }) {

    // Navigation function
    const navigate = useNavigate()

    // URL se id fetch
    const { id } = useParams()

    // React Hook Form setup
    const {

        // Form submit handle karega
        handleSubmit,

        // Controller for controlled inputs
        control,

        // Input values set karne ke liye
        setValue,

        // Validation errors
        formState: { errors }

    } = useForm({

        // Yup validation apply
        resolver: yupResolver(parentSchema),

        // Default form values
        defaultValues: {
            name: '',
            subject: '',
            email: ''
        }
    })

    // Form submit function
    const onSubmit = async (data) => {

        try {

            // Agar id hai matlab edit mode
            if (id) {

                // Update API call
                await api.put(`/parent/${id}`, data)

                // Success toast
                toast.current.show({

                    severity: 'success',
                    summary: 'Updated',
                    detail: 'Parent updated successfully',
                    life: 3000,

                })

            } else {

                // Add new parent API
                await api.post('/parent', data)

                // Success toast
                toast.current.show({

                    severity: 'success',
                    summary: 'Added',
                    detail: 'Parent added successfully',
                    life: 3000,

                })
            }

            // Parent list page pe navigate
            navigate('/parent')

        } catch (error) {

            // Console me error
            console.error('Submit error:', error)

            // Error toast
            toast.current.show({

                severity: 'error',
                summary: 'Error',
                detail: 'Something Went Wrong',
                life: 3000,

            })
        }
    }

    // Component load hone par
    useEffect(() => {

        // Agar id hai to edit data fetch karo
        if (id) {

            // Single parent data fetch
            api.get(`/parent/${id}`).then((res) => {

                const data = res.data

                // Form me values set
                setValue('name', data.name)
                setValue('subject', data.subject)
                setValue('email', data.email)

            })
        }

    }, [id, setValue])

    return (

        // Full page container
        <div className="tea-page">

            {/* Card */}
            <div className="tea-card">

                {/* Heading */}
                <h2 className="tea-title">

                    {/* Agar id hai to Edit warna Add */}
                    {id ? 'Edit Parent' : 'Add Parent'}

                </h2>

                {/* Form Start */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="tea-form"
                >

                    {/* Name Field */}
                    <div className="tea-field">

                        <label className="tea-label">
                            Name
                        </label>

                        <Controller

                            // Input field name
                            name="name"

                            // Form control
                            control={control}

                            // Input render
                            render={({ field }) => (

                                <InputText
                                    {...field}
                                    className="tea-input"
                                />

                            )}
                        />

                        {/* Error Message */}
                        <p className="tea-error">
                            {errors.name?.message}
                        </p>

                    </div>

                    {/* Subject Field */}
                    <div className="tea-field">

                        <label className="tea-label">
                            Subject
                        </label>

                        <Controller

                            name="subject"
                            control={control}

                            render={({ field }) => (

                                <InputText
                                    {...field}
                                    className="tea-input"
                                />

                            )}
                        />

                        {/* Error */}
                        <p className="tea-error">
                            {errors.subject?.message}
                        </p>

                    </div>

                    {/* Email Field */}
                    <div className="tea-field">

                        <label className="tea-label">
                            Email
                        </label>

                        <Controller

                            name="email"
                            control={control}

                            render={({ field }) => (

                                <InputText
                                    {...field}
                                    className="tea-input"
                                />

                            )}
                        />

                        {/* Error */}
                        <p className="tea-error">
                            {errors.email?.message}
                        </p>

                    </div>

                    {/* Submit Button */}
                    <Button
                        label="Submit"
                        type="submit"
                        className="tea-btn"
                    />

                </form>

            </div>
        </div>
    )
}

// Export component
export default ParentAddEdit