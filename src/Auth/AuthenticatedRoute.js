import React from "react";
import { Navigate } from "react-router-dom";
import AuthService from "./AuthService";

export default function AuthenticatedRoute(props) {
  if (AuthService.isUserLoggedIn()) {
    return { ...props.children };
  } else {
    return <Navigate to="/login" />;
  }
}
