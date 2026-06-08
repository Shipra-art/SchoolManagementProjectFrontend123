// ============================================================
// 📁 StudentEditAdd.jsx
// Yeh component do kaam karta hai:
//   1. Naya student ADD karna  (/student-add)
//   2. Existing student EDIT karna  (/student-edit/:id)
// URL mein 'id' hai → Edit Mode
// URL mein 'id' nahi hai → Add Mode
// ============================================================

import React, { useEffect } from 'react'

// useNavigate → programmatically kisi page pe jaana
// useParams  → URL se dynamic value nikalna (jaise /student/5 → id = "5")
import { useNavigate, useParams } from 'react-router-dom'

// api → custom axios instance, base URL already set hai usme
import api from '../api/axios'

// useForm     → form ka poora state manage karta hai (values, errors, submit)
// Controller  → PrimeReact jaise 3rd-party inputs ko react-hook-form se connect karta hai
import { useForm, Controller } from 'react-hook-form'

// yupResolver → Yup validation schema ko react-hook-form ke saath use karne deta hai
import { yupResolver } from '@hookform/resolvers/yup'

// studentSchema → Yup ke rules (name required hai, age number hona chahiye, etc.)
import { studentSchema } from '../validations/StudentSchema'

// PrimeReact UI Components
import { InputText } from 'primereact/inputtext'     // Text input box
import { InputNumber } from 'primereact/inputnumber' // Number input box
import { Button } from 'primereact/button'           // Submit button

import '../App.css'

// ─────────────────────────────────────────────
// Props:
//   toast → parent (App.jsx) se aaya hua ref
//           success/error notification dikhane ke liye use hota hai
// ─────────────────────────────────────────────
function StudentEditAdd({ toast }) {

  // navigate('/path') → us path pe redirect kar deta hai
  const navigate = useNavigate()

  // URL se 'id' nikalta hai
  // Example: /student/7  →  id = "7"
  // Example: /student-add  →  id = undefined
  const { id } = useParams()
  console.log("StudentEditAdd ID =>", id)

  // ──────────────────────────────────────────
  // useForm Hook — form ka brain hai yeh
  // ──────────────────────────────────────────
  const {
    handleSubmit,         // form submit wrap karta hai, pehle validation karta hai
    control,              // Controller component ko form se jodne ke liye
    reset,                // form ki values programmatically set/reset karne ke liye
    formState: { errors } // validation fail hone par error messages yahan milte hain
  } = useForm({
    resolver: yupResolver(studentSchema), // Yup schema se validation lagao
    defaultValues: {
      // Form pehli baar khulay to yeh initial values hongi
      name: '',
      age: null,
      course: '',
      marks: null
    }
  })

  // ──────────────────────────────────────────
  // onSubmit — jab form submit ho aur validation pass ho
  // ──────────────────────────────────────────
  const onSubmit = async (data) => {
    // 'data' mein form ke saare filled values hain
    // (Yup validation already pass ho chuki hai yahan tak pahunchne ke liye)
    console.log("Form Data =>", data)

    // API ko bhejna wala object banao
    const payload = {
      name: data.name,
      age: data.age,
      course: data.course,
      marks: data.marks
    }
    console.log("Payload =>", payload)

    try {

      if (id) {
        // ✏️ EDIT MODE — id hai matlab student exist karta hai
        // PUT request → /student/7  (pura record update karta hai)
        const res = await api.put(`/student/${id}`, payload)
        console.log("Update Response =>", res.data)

        // Success notification dikhao
        toast.current.show({
          severity: 'success',  // green color
          summary: 'Updated',
          detail: 'Student updated successfully',
          life: 3000            // 3 second baad khud gayab ho jayega
        })

      } else {
        // ➕ ADD MODE — id nahi hai matlab naya student banana hai
        // POST request → /student  (naya record create karta hai)
        const res = await api.post('/student', payload)
        console.log("Add Response =>", res.data)

        // Success notification dikhao
        toast.current.show({
          severity: 'success',
          summary: 'Added',
          detail: 'Student added successfully',
          life: 3000
        })
      }

      // Dono cases mein kaam hone ke baad list page pe bhejo
      navigate('/student-list')

    } catch (error) {
      // Koi bhi API error aaye (network issue, server error, etc.)
      console.log("API Error =>", error)

      // Error notification dikhao
      toast.current.show({
        severity: 'error',  // red color
        summary: 'Error',
        detail: 'Something went wrong!',
        life: 3000
      })
    }
  }

  // ──────────────────────────────────────────
  // useEffect — Component mount hote hi chalti hai
  // Kaam: Edit mode mein existing student ka data fetch karke form mein bhar do
  // ──────────────────────────────────────────
  useEffect(() => {

    if (id) {
      // id hai → Edit mode → API se student ka data lo
      api.get(`/student/${id}`)
        .then((res) => {
          console.log("Get By Id Response =>", res.data)

          // reset() se form ke fields mein fetched data bhar do
          // Isliye user ko pehle se bhari hui values dikhti hain edit mein
          reset({
            name: res.data.name,
            age: res.data.age,
            course: res.data.course,
            marks: res.data.marks
          })
        })
        .catch((err) => {
          console.log("Get Error =>", err)
        })
    }

    // Dependency array:
    // Jab bhi 'id' ya 'reset' change ho, yeh effect dobara chalega
  }, [id, reset])

  // ──────────────────────────────────────────
  // JSX — Form UI
  // ──────────────────────────────────────────
  return (

    <div className="sea-page"> {/* Full page wrapper */}

      <div className="sea-card"> {/* Centered white card */}

        {/* Heading: id hai to "Edit Student", nahi to "Add Student" */}
        <h2 className="sea-title">
          {id ? 'Edit Student' : 'Add Student'}
        </h2>

        {/*
          handleSubmit(onSubmit):
          - Pehle Yup validation karta hai
          - Pass hone par onSubmit(data) call karta hai
          - Fail hone par errors object mein errors set karta hai
        */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="sea-form"
        >

          {/* ── NAME FIELD ── */}
          <div className="sea-field">

            <label className="sea-label">Name</label>

            {/*
              Controller:
              - name="name"  → useForm ke 'name' field se connect hoga
              - control      → form ke control object se jodta hai
              - render       → actual input component return karo
              - field        → value, onChange, onBlur sab automatically milta hai
            */}
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                // {...field} spread karne se value, onChange, onBlur lag jaata hai
                <InputText
                  {...field}
                  placeholder="Enter Name"
                  className="sea-input"
                />
              )}
            />

            {/* Validation error message — agar name empty submit kiya to dikhega */}
            {/* ?.  optional chaining → agar errors.name undefined hai to crash nahi hoga */}
            <small className="sea-error">
              {errors.name?.message}
            </small>

          </div>

          {/* ── AGE FIELD ── */}
          <div className="sea-field">

            <label className="sea-label">Age</label>

            <Controller
              name="age"
              control={control}
              render={({ field }) => (
                /*
                  InputNumber ka event alag hota hai:
                  - Normal input:  e.target.value
                  - InputNumber:   e.value  ← directly number milta hai
                  Isliye manually field.onChange(e.value) likhna pada
                  ({...field} spread yahan kaam nahi karta)
                */
                <InputNumber
                  value={field.value}
                  onValueChange={(e) => field.onChange(e.value)}
                  placeholder="Enter Age"
                  className="sea-input-number"
                />
              )}
            />

            <small className="sea-error">
              {errors.age?.message}
            </small>

          </div>

          {/* ── COURSE FIELD ── */}
          <div className="sea-field">

            <label className="sea-label">Course</label>

            <Controller
              name="course"
              control={control}
              render={({ field }) => (
                <InputText
                  {...field}
                  placeholder="Enter Course"
                  className="sea-input"
                />
              )}
            />

            <small className="sea-error">
              {errors.course?.message}
            </small>

          </div>

          {/* ── MARKS FIELD ── */}
          <div className="sea-field">

            <label className="sea-label">Marks</label>

            <Controller
              name="marks"
              control={control}
              render={({ field }) => (
                // Age ki tarah, InputNumber ke liye manually onChange handle karo
                <InputNumber
                  value={field.value}
                  onValueChange={(e) => field.onChange(e.value)}
                  placeholder="Enter Marks"
                  className="sea-input-number"
                />
              )}
            />

            <small className="sea-error">
              {errors.marks?.message}
            </small>

          </div>

          {/* ── SUBMIT BUTTON ── */}
          {/* id hai to "Update Student" dikhao, nahi to "Add Student" */}
          <Button
            label={id ? 'Update Student' : 'Add Student'}
            type="submit"
            className="sea-btn"
          />

        </form>

      </div>

    </div>
  )
}

export default StudentEditAdd
