import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
    <h1 style={{ fontSize: "4rem", marginBottom: "0.5rem" }}>404</h1>
    <h2>Page Not Found</h2>
    <p style={{ margin: "1rem 0" }}>
      The page you are looking for doesn't exist or has been moved.
    </p>
    <Link to="/" style={{ color: "#e67e22", fontWeight: "bold" }}>
      Go back to Home
    </Link>
  </div>
);

export default NotFound;
