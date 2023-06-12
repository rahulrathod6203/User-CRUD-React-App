import React from "react";
import { Link, useParams } from "react-router-dom";

export default function Home() {
  const params = useParams();
  return (
    <div className="container mt-5">
      <h1 className="text-center ">Welcome Admin</h1>
      <Link to="/usersList" className="btn btn-primary">
        Show All Users
      </Link>
      <hr />
    </div>
  );
}
