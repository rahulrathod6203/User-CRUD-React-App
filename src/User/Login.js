import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./loginStyle.css";
import AuthService from "../Auth/AuthService";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("*Invalid email")
    .required("*Please enter your email"),
  password: Yup.string()
    .min(8, "*Password should contain 8 or more characters")
    .max(20, "*Password is Too Long!")
    .required("*Please enter your password"),
});

export default function Login() {
  let navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [users, setUsers] = useState();

  // let username = "admin@gmail.com";
  // let pass = "password";

  const usersData = users;
  let userEmail = "";
  let userPass = "";

  const handleSubmit = async (values, { setSubmitting }) => {
    usersData.map((data) => {
      if (values.email === data.email) {
        userEmail = data.email;
        userPass = data.password;
      }
    });

    if (
      values.email.trim() === userEmail &&
      values.password.trim() === userPass
    ) {
      AuthService.registerSuccessfullLogin(email, password);
      swal("Login Success", "You have logged in Successfully", "success", {
        button: "Click to Continue",
      }).then(function () {
        //navigate(`/home/${userEmail}`);
        navigate("/usersList");
      });
      //setTimeout(navigateToListPage, 500);
    } else {
      swal("Login failed", "Invalid email or password!!", "error", {
        button: "Try again ?",
      }).then(function () {
        navigate("/login");
      });
    }

    setSubmitting(false);
  };

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/api/user/allUsers");
    setUsers(result.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);
  return (
    <div>
      <div className="row">
        <div className="col"></div>
        <div className="col mt-5 color-div">
          <h4 className="text-center mt-3">Sign In Here</h4>
          <hr />
          <Formik
            initialValues={{ email, password }}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => {
              return (
                <Form className=" color-form ">
                  <div className="form-group ">
                    <label className="form-label">Email:</label>
                    <Field
                      className="form-control shadow-none"
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      title="Must be in the email format Ex: abc@xyz.domain "
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your email.."
                    />
                    <b>
                      <ErrorMessage
                        className="text-danger "
                        name="email"
                        component="div"
                      />
                    </b>
                  </div>
                  <div className="form-group mt-3">
                    <label className="form-label">Password:</label>{" "}
                    <Field
                      className="form-control shadow-none"
                      type="password"
                      name="password"
                      placeholder="Enter your password.."
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                    />
                    <b>
                      <ErrorMessage
                        className="text-danger"
                        name="password"
                        component="div"
                      />
                    </b>
                  </div>

                  <div className="form-group text-center mt-3">
                    <button
                      className="btn btn-success  px-3"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Login
                    </button>
                    <Link to="/" className="btn btn-danger mx-2">
                      Cancel
                    </Link>
                    <br />
                    <br />

                    <Link to="/register" style={{ textDecoration: "none" }}>
                      <b>Create New Account.</b>
                    </Link>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
}
