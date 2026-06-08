import * as yup from "yup";

export const studentSchema = yup.object({
  name: yup.string().required("Name is requried"),
  age: yup.string().required("Age is required"),
  course: yup.string().required("Course is required"),
  marks: yup.string().required("marks is required"),
});
