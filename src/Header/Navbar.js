import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthService from "../Auth/AuthService";
import swal from "sweetalert";

export default function Navbar() {
  const isUserLoggedIn = AuthService.isUserLoggedIn();
  let navigate = useNavigate();
  const params = useParams();

  const loggedUsername = AuthService.loggedInUser();

  const logout = () => {
    swal({
      title: "Are you sure you want to logout?",
      icon: "warning",
      buttons: true,
    }).then((willLogout) => {
      if (willLogout) {
        AuthService.logout();
        navigate("/login");
        swal({
          title: "Logged out successfully",
          icon: "success",
        });
      }
    });
  };
  return (
    <div>
      <nav className="navbar bg-dark navbar-dark navbar-expand-lg  px-5">
        <div className="container-fluid">
          <a className="navbar-brand">
            <Link className=" brand nav-link btn btn-outline-light px-3 py-1 ">
              User Management App
            </Link>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {isUserLoggedIn && (
                <li className="nav-item">
                  <Link
                    to={`/home/${loggedUsername}`}
                    className="nav-link active "
                  >
                    Home
                  </Link>
                </li>
              )}
            </ul>

            <ul className="navbar-nav justify-content-end">
              {!isUserLoggedIn && (
                <li className="nav-item">
                  <Link to="/login" className="nav-link active">
                    Login
                  </Link>
                </li>
              )}

              {!isUserLoggedIn && (
                <li className="nav-item ">
                  <Link to="/register" className="nav-link active">
                    Register
                  </Link>
                </li>
              )}

              {isUserLoggedIn && (
                <li className="nav-item">
                  <Link className="nav-link active" onClick={logout}>
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
