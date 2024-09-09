import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./RegistrationForm.css";

const RegistrationForm = () => {
  // Validation Schema
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("First Name is required")
      .matches(/^[a-zA-Z]+$/, "First Name must contain only letters")
      .min(2, "First Name must be at least 2 characters")
      .max(50, "First Name must be less than 50 characters"),

    lastName: Yup.string()
      .required("Last Name is required")
      .matches(/^[a-zA-Z]+$/, "Last Name must contain only letters")
      .min(2, "Last Name must be at least 2 characters")
      .max(50, "Last Name must be less than 50 characters"),

    middleName: Yup.string().matches(
      /^[a-zA-Z]*$/,
      "Middle Name must contain only letters"
    ),

    birthDate: Yup.date()
      .required("Birth Date is required")
      .max(
        new Date(Date.now() - 567648000000),
        "You must be at least 18 years old"
      ), // 18 years

    gender: Yup.string()
      .required("Gender is required")
      .oneOf(["male", "female"], "Invalid Gender Selection"),

    cnic: Yup.string()
      .required("CNIC is required")
      .matches(/^\d{5}-\d{7}-\d{1}$/, "CNIC format must be XXXXX-XXXXXXX-X"),

    address: Yup.string()
      .required("Street Address is required")
      .min(5, "Street Address must be at least 5 characters"),

    city: Yup.string()
      .required("City is required")
      .matches(/^[a-zA-Z\s]+$/, "City must contain only letters"),

    postalCode: Yup.string()
      .required("Postal Code is required")
      .matches(/^\d+$/, "Postal Code must contain only numbers"),

    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    mobileNumber: Yup.string()
      .required("Mobile Number is required")
      .matches(/^\d+$/, "Mobile Number must contain only numbers")
      .min(10, "Mobile Number must be at least 10 digits")
      .max(10, "Mobile Number must be exactly 10 digits"), // Ensuring only 10 digits

    phoneNumber: Yup.string().matches(
      /^\d*$/,
      "Phone Number must contain only numbers"
    ),

    company: Yup.string().matches(
      /^[a-zA-Z\s]*$/,
      "Company Name must contain only letters"
    ),

    course: Yup.string().required("You must select a course"),

    comments: Yup.string().max(
      500,
      "Comments must be less than 500 characters"
    ),

    // Password validation
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
  });

  // Auto format CNIC
  const handleCnicChange = (e, setFieldValue) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (value.length <= 5) {
      value = value.replace(/(\d{1,5})/, "$1");
    } else if (value.length <= 12) {
      value = value.replace(/(\d{1,5})(\d{1,7})/, "$1-$2");
    } else if (value.length <= 13) {
      value = value.replace(/(\d{1,5})(\d{1,7})(\d{1})/, "$1-$2-$3");
    }
    setFieldValue("cnic", value);
  };

  // Form Submit Handler
  const handleSubmit = (values, { resetForm }) => {
    const formattedMobileNumber = `+92${values.mobileNumber}`; // Adding +92 to the mobile number
    console.log("Form Values:", {
      ...values,
      mobileNumber: formattedMobileNumber,
    });
    toast.success("Your information has been submitted successfully!");
    resetForm(); // Clear the form after logging
  };

  return (
    <div className="form-container">
      <Formik
        initialValues={{
          firstName: "",
          middleName: "",
          lastName: "",
          birthDate: "",
          gender: "",
          address: "",
          city: "",
          postalCode: "",
          email: "",
          mobileNumber: "",
          phoneNumber: "",
          company: "",
          course: "",
          cnic: "",
          comments: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="registration-form">
            <h2 className="">Registration Form</h2>

            {/* Name Fields */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <Field name="firstName" placeholder="First Name" />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="error"
                />
              </div>
              <div className="form-group">
                <label htmlFor="middleName">Middle Name</label>
                <Field name="middleName" placeholder="Middle Name" />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <Field name="lastName" placeholder="Last Name" />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="error"
                />
              </div>
            </div>

            {/* Birth Date and Gender */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="birthDate">Birth Date</label>
                <Field type="date" name="birthDate" />
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <Field as="select" name="gender">
                  <option value="">Please Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Field>
                <ErrorMessage name="gender" component="div" className="error" />
              </div>
            </div>

            {/* CNIC */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="cnic">CNIC</label>
                <Field
                  name="cnic"
                  placeholder="Enter CNIC"
                  onChange={(e) => handleCnicChange(e, setFieldValue)}
                />
                <ErrorMessage name="cnic" component="div" className="error" />
              </div>
            </div>

            {/* Address */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="address">Street Address</label>
                <Field name="address" placeholder="Street Address" />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="error"
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <Field name="city" placeholder="City" />
                <ErrorMessage name="city" component="div" className="error" />
              </div>
              <div className="form-group">
                <label htmlFor="postalCode">Postal Code</label>
                <Field name="postalCode" placeholder="Postal Code" />
                <ErrorMessage
                  name="postalCode"
                  component="div"
                  className="error"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field name="email" placeholder="Email" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div className="form-group">
                <label htmlFor="mobileNumber">Mobile Number</label>
                <div className="phone-group">
                  <span className="country-code">+92</span>
                  <Field
                    name="mobileNumber"
                    placeholder="Mobile Number"
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      setFieldValue("mobileNumber", value.slice(0, 10));
                    }}
                  />
                </div>
                <ErrorMessage
                  name="mobileNumber"
                  component="div"
                  className="error"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <Field name="phoneNumber" placeholder="Phone Number" />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="error"
                />
              </div>
            </div>

            {/* Course and Comments */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="course">Course</label>
                <Field as="select" name="course">
                  <option value="">Please Select</option>
                  <option value="web-development">Web Development</option>
                  <option value="app-development">App Development</option>
                  <option value="graphic-designing">Graphic Designing</option>
                </Field>
                <ErrorMessage name="course" component="div" className="error" />
              </div>
              <div className="form-group">
                <label htmlFor="company">Company</label>
                <Field name="company" placeholder="Company" />
                <ErrorMessage
                  name="company"
                  component="div"
                  className="error"
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field name="password" placeholder="Password" type="password" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>
            </div>

            {/* Comments */}
            <div className="form-group">
              <label htmlFor="comments">Comments</label>
              <Field as="textarea" name="comments" placeholder="Comments" />
              <ErrorMessage name="comments" component="div" className="error" />
            </div>

            {/* Submit Button */}
            <div className="form-row">
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default RegistrationForm;
