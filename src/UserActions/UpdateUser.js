import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./userStyle.css";

export default function UpdateUser() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [user, setUser] = useState({
    username: "",
    name: "",
    email: "",
  });

  const { username, name, email } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/api/user/${id}`, user);
    swal({
      title: "User " + username + " updated successfully",
      icon: "success",
    });
    navigate("/usersList");
  };

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/api/user/${id}`);
    setUser(result.data);
  };

  return (
    <div>
      <div className="row">
        <div className="col"></div>
        <div className="col mt-5 user-div ">
          <h4 className="text-center mt-3 ">Update User</h4>
          <hr className="user " />
          <form onSubmit={handleSubmit} className="user-form ">
            <div className="form-group ">
              <label className="form-label ">Username:</label>
              <input
                type="text"
                className="form-control shadow-none"
                value={username}
                name="username"
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label className="form-label ">Full Name:</label>
              <input
                type="text"
                className="form-control shadow-none"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label className="form-label ">Email:</label>
              <input
                className="form-control shadow-none "
                type="email"
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>

            <div className="form-group text-center mt-4">
              <button className="btn btn-success mx-2" type="submit">
                Update
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
