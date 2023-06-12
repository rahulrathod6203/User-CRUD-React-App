import React from "react";

export default function Error() {
  const style = {
    fontSize: "100px",
    color: "red",
  };
  return (
    <div className="container mt-5 ">
      <h1 style={style}>404</h1>
      <p className="ms-4 ps-1 ">Page Not Found</p>
      <h3>Ooops! Something went wrong!!</h3>
      <h5>You weren't supposed to see this</h5>
      <p>
        The page you are looking for no longer exists.
        <p>Please check the URL and try again!!</p>
      </p>
    </div>
  );
}
