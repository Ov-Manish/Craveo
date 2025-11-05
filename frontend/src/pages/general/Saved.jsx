import React from "react";
import { Link } from "react-router-dom";
import "../../styles/reels.css";

const Saved = () => {
  // Replace with real saved data / API call as needed
  const savedItems = [
    { id: "1", title: "Saved Item 1" },
    { id: "2", title: "Saved Item 2" },
  ];

  return (
    <div className="screen saved-screen">
      <div className="saved-list">
        <h2>Saved</h2>
        {savedItems.map((s) => (
          <div className="saved-card" key={s.id}>
            <div className="saved-thumb" />
            <div className="saved-meta">
              <div className="saved-title">{s.title}</div>
              <div className="saved-sub">Tap to open</div>
            </div>
          </div>
        ))}
      </div>

      <nav className="bottom-nav">
        <Link to="/" className="nav-item" aria-label="Home">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V11.5z" stroke="#fff" strokeWidth="1.2" fill="none"/>
          </svg>
          <span className="nav-label">home</span>
        </Link>

        <Link to="/saved" className="nav-item active" aria-label="Saved">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M6 2h12v18l-6-3-6 3V2z" stroke="#fff" strokeWidth="1.2" fill="none"/>
          </svg>
          <span className="nav-label">saved</span>
        </Link>
      </nav>
    </div>
  );
};

export default Saved;