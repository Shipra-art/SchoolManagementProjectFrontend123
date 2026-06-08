// validations/TeacherSchema.js
import * as yup from 'yup'

export const teacherSchema = yup.object({
    name: yup.string().required('Name is required'),
    subject: yup.string().required('Subject is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
})