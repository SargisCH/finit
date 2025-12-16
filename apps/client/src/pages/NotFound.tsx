import React from "react";
import { Link } from "react-router-dom";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh", // Takes up the full height of the viewport
  backgroundColor: "#f8f9fa", // Light gray background
  color: "#343a40", // Dark text color
  fontFamily: "Arial, sans-serif",
  padding: "20px",
};

const headingStyle = {
  fontSize: "120px", // Large 404 number
  fontWeight: 700,
  color: "#dc3545", // A strong, attention-grabbing red
  marginBottom: "0px",
  lineHeight: "1.2",
};

const messageStyle = {
  fontSize: "32px",
  fontWeight: 600,
  marginTop: "0px",
  marginBottom: "20px",
};

const linkStyle = {
  color: "#007bff", // Standard blue link color
  textDecoration: "none",
  fontSize: "18px",
  borderBottom: "2px solid #007bff", // Underline effect
  paddingBottom: "2px",
  transition: "color 0.3s",
};

export default function NotFound() {
  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>404</h1>
      <h2 style={messageStyle}>Page Not Found</h2>
      <p style={{ fontSize: "18px", marginBottom: "30px" }}>
        We couldn't find the page you were looking for.
      </p>
      <Link to="/" style={linkStyle}>
        ← Return to Home Page
      </Link>
    </div>
  );
}
