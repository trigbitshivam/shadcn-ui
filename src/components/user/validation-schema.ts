import * as Yup from "yup";

export interface UserInput {
  name: string;
  email: string;
  mobile: string;
  age: string | number;
}

export const validateUser = (user: UserInput): string | null => {
  const schema = Yup.object({
    name: Yup.string()
      .matches(/^[A-Za-z ]+$/, "Only letters allowed")
      .required("Name is required"),

    email: Yup.string()
      .email("Invalid email")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email must contain .com/.in etc",
      )
      .required("Email is required"),

    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Must be 10 digits")
      .required("Mobile is required"),

    age: Yup.number()
      .typeError("Invalid age")
      .positive("Age must be positive")
      .required("Age is required"),
  });

  try {
    schema.validateSync(user);
    return null;
  } catch (err: any) {
    return err.message;
  }
};
