import React from "react";
import AuthService from "../Auth/AuthService";

export default function Logout() {
  return (
    <div className="text-center mt-5">
      <h1>Logged out Successfully</h1>
      <div className=" container alert alert-success">
        <h5>Thank you for using our site. Visit again :) </h5>
      </div>
    </div>
  );
}
