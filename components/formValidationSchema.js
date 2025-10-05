import * as Yup from "yup";

export const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
};

export const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[A-Za-z]+$/, "Only alphabets are allowed")
    .required("First name is required"),

  lastName: Yup.string().matches(/^[A-Za-z]+$/, "Only alphabets are allowed"),

  email: Yup.string().email("Invalid email").required("Email is required"),

  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter a valid 10-digit number (digits only)")
    .required("Phone number is required"),

  message: Yup.string().required("Message is required"),
});
