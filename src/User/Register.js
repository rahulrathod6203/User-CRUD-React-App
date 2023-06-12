import React, { useState } from "react";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  let navigate = useNavigate();

  const [nameError, setNameError] = useState();
  const [emailError, setEmailError] = useState();
  const [passError, setPassError] = useState();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      username.trim().length === 0 ||
      email.trim().length === 0 ||
      password.trim().length === 0
    ) {
      setNameError("*Username cannot be empty");
      setEmailError("*Email cannot be empty");
      setPassError("*Password cannot be empty");
    } else {
      await axios.post("http://localhost:8080/api/user/register", user);
      swal({
        title: "You have registered Successfully",
        text: "Do you want to login ?",
        icon: "success",
        buttons: true,
      }).then((willLogin) => {
        if (willLogin) {
          navigate("/login");
        } else {
          navigate("/");
        }
      });
    }
  };
  return (
    <div>
      <div className="row">
        <div className="col"></div>
        <div className="col mt-5 color-div ">
          <h4 className="text-center mt-3">Sign Up Here</h4>
          <hr />
          <form onSubmit={handleSubmit} className=" color-form1 ">
            <div className="form-group ">
              <label className="form-label">Username:</label>
              <input
                type="text"
                className="form-control shadow-none"
                placeholder="Enter your username of your choice.."
                pattern="[a-zA-Z][a-zA-Z ]+"
                title="Please enter only characters. No digits allowed!!"
                name="username"
                value={username}
                onChange={(e) => onInputChange(e)}
              />
              <b>
                <p className="text-danger ">{nameError}</p>
              </b>
            </div>
            <div className="form-group ">
              <label className="form-label">Email:</label>
              <input
                type="email"
                className="form-control shadow-none"
                placeholder="Enter your email.."
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="Must be in the email format Ex: abc@xyz.domain "
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
              />
              <b>
                <p className="text-danger ">{emailError}</p>
              </b>
            </div>
            <div className="form-group mt-3">
              <label className="form-label">Password:</label>{" "}
              <input
                className="form-control shadow-none"
                type="password"
                placeholder="Enter password of your choice.."
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                name="password"
                value={password}
                onChange={(e) => onInputChange(e)}
              />
              <b>
                <p className="text-danger ">{passError}</p>
              </b>
            </div>

            <div className="form-group text-center mt-3">
              <button className="btn btn-success " type="submit">
                Register
              </button>
              <Link to="/" className="btn btn-danger mx-2">
                Cancel
              </Link>
              <br />
              <br />
              <label htmlFor="">Have an account? Click here to </label>{" "}
              <Link to="/login" className="link">
                <b className="link">Login</b>
              </Link>
            </div>
          </form>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
}
