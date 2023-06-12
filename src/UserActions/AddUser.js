import React, { useState } from "react";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./userStyle.css";
export default function AddUser() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    name: "",
    email: "",
  });

  const [error, setError] = useState();

  const { username, name, email } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.trim().length < 4) {
      setError("*Username should contain 4 or more characters!!");
    } else {
      await axios.post("http://localhost:8080/api/user", user);
      swal({
        title: "User " + username + " added successfully",
        icon: "success",
      });
      navigate("/usersList");
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col"></div>
        <div className="col mt-5 user-div">
          <h4 className="text-center mt-3 ">Add User</h4>
          <hr className="user " />
          <form onSubmit={handleSubmit} className=" user-form">
            <div className="form-group">
              <label className="form-label ">Username:</label>
              <input
                type="text"
                className="form-control shadow-none"
                placeholder="Enter username of your choice.."
                name="username"
                value={username}
                onChange={(e) => onInputChange(e)}
                required
              />
              <b>
                <p className="text-danger ">{error}</p>
              </b>
            </div>
            <div className="form-group mt-3">
              <label className="form-label ">Full Name:</label>
              <input
                type="text"
                className="form-control shadow-none"
                placeholder="Enter full name here.."
                pattern="[a-zA-Z][a-zA-Z ]+"
                title="Please enter only characters. No digits allowed!!"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label className="form-label">Email:</label>
              <input
                className="form-control shadow-none"
                placeholder="Enter email here.."
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="Must be in the email format Ex: abc@xyz.domain "
                type="email"
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>

            <div className="form-group text-center mt-4">
              <button className="btn btn-success" type="submit">
                Add User
              </button>
              <Link to="/usersList" className="btn btn-danger mx-2">
                Cancel
              </Link>
              {/* <br />
                <br />
                <div className="text-center">
                  Already a user? Click here to{" "}
                  <Link to="/login">
                    <b>Sign In</b>
                  </Link>
                </div> */}
            </div>
          </form>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
}
