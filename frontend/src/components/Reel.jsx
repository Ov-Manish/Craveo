import React from 'react';
import { Link } from 'react-router-dom';

// Reel component renders the video-feed block. It expects the parent to provide
// the following props (names preserved):
// - videos: array of video objects
// - videoRefs: a ref object (e.g. useRef([])) used to store refs per video
// - handleLikeVideo: function(video)
// - handleSavedVideo: function(video)

const Reel = ({ videos = [], videoRefs, handleLikeVideo, handleSavedVideo }) => {
  return (
    <div className="screen">
      <div className="video-feed">
        {videos.map((video, index) => (
          <div className="video-container" key={video._id}>
            <video
              src={video.video}
              className="video"
              loop
              muted
              playsInline
              ref={(el) => (videoRefs.current[index] = el)} // ✅ attach ref
            ></video>

            <div className="video-overlay">
              <div className="video-text">
                <p className="video-description">{video.name}</p>
                <p className="video-description small">{video.description}</p>
                <Link
                  to={`/foodPartner/${video.foodPartner || video._id}`}
                  className="visit-store-btn"
                  aria-label="Visit Store"
                >
                  visit store
                </Link>
              </div>

              <div className="video-side-actions">
                <button onClick={() => handleLikeVideo(video)} className="action-btn" aria-label="Like">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M12 21s-7-4.5-9-8a5 5 0 019-6 5 5 0 019 6c-2 3.5-9 8-9 8z" stroke="#fff" strokeWidth="1.2" fill="rgba(255,255,255,0.06)"/>
                  </svg>
                  {/* LIKES COUNT*/}
                  <span className="action-count">{video.likeCount}</span>
                </button>

                <button onClick={() => handleSavedVideo(video)} className="action-btn" aria-label="Save">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path d="M6 2h10l4 4v16l-8-4-8 4V6z" stroke="#fff" strokeWidth="1.2" fill="rgba(255,255,255,0.02)"/>
                  </svg>
                  {/* SAVED COUNT */}
                  <span className="action-count">{video.saveCount}</span>
                </button>

                <button className="action-btn" aria-label="Comment">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#fff" strokeWidth="1.2" fill="rgba(255,255,255,0.02)"/>
                  </svg>
                  {/* Comments COUNT */}
                  <span className="action-count">45</span>
                </button>
              </div>
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

        <Link to="/saved" className="nav-item" aria-label="Saved">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M6 2h12v18l-6-3-6 3V2z" stroke="#fff" strokeWidth="1.2" fill="none"/>
          </svg>
          <span className="nav-label">saved</span>
        </Link>
      </nav>
    </div>
  );
};

export default Reel;
