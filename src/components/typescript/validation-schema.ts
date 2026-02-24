import * as Yup from "yup";

export const employeeSchema = Yup.object({
  name: Yup.string()
    .matches(/^[A-Za-z ]+$/, "Only letters allowed")
    .required("Name is required"),

  email: Yup.string().email("Invalid email").required("Email is required"),

  role: Yup.string()
    .matches(/^[A-Za-z ]+$/, "Only letters allowed")
    .required("Role is required"),

  salary: Yup.number()
    .typeError("Salary must be a number")
    .positive("Salary must be positive")
    .required("Salary is required"),

  age: Yup.number()
    .typeError("Invalid age")
    .positive("Age must be positive")
    .integer("Age must be integer")
    .required("Age is required"),

  number: Yup.string()
    .matches(/^[0-9]{10}$/, "Must be 10 digits")
    .required("Mobile number is required"),

  location: Yup.string().required("Location is required"),
});
