import React from "react";
import { Link } from "react-router-dom";

const BottomNavbar = ({ active = "home" }) => {
  return (
    <nav className="bottom-nav">
      <Link to="/" className={`nav-item ${active === "home" ? "active" : ""}`} aria-label="Home">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V11.5z" stroke="#fff" strokeWidth="1.2" fill="none"/>
        </svg>
        <span className="nav-label">home</span>
      </Link>

      <Link to="/saved" className={`nav-item ${active === "saved" ? "active" : ""}`} aria-label="Saved">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M6 2h12v18l-6-3-6 3V2z" stroke="#fff" strokeWidth="1.2" fill="none"/>
        </svg>
        <span className="nav-label">saved</span>
      </Link>
    </nav>
  );
};

export default BottomNavbar;