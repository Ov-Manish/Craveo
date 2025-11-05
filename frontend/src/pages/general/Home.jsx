// ...existing code...
import React, { useState, useEffect, useRef } from "react";
import "../../styles/reels.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]); // ✅ to store refs of all videos

  useEffect(() => {
    axios.get("http://localhost:3000/api/food/", {
        withCredentials: true,
      })
      .then((res) => {
        setVideos(res.data.foodItems);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err, "Error fetching videos");
      });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play(); // ✅ play when visible
          } else {
            video.pause(); // ✅ pause when out of view
          }
        });
      },
      {
        threshold: 0.75, // ✅ at least 75% visible to play
      }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, [videos]);

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
                  to={`/foodPartner/${video.foodPartner}`}
                  className="visit-store-btn"
                  aria-label="Visit Store"
                >
                  visit store
                </Link>
              </div>

              <div className="video-side-actions">
                <button className="action-btn" aria-label="Like">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M12 21s-7-4.5-9-8a5 5 0 019-6 5 5 0 019 6c-2 3.5-9 8-9 8z" stroke="#fff" strokeWidth="1.2" fill="rgba(255,255,255,0.06)"/>
                  </svg>
                  <span className="action-count">23</span>
                </button>

                <button className="action-btn" aria-label="Save">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path d="M6 2h10l4 4v16l-8-4-8 4V6z" stroke="#fff" strokeWidth="1.2" fill="rgba(255,255,255,0.02)"/>
                  </svg>
                  <span className="action-count">23</span>
                </button>

                <button className="action-btn" aria-label="Comment">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#fff" strokeWidth="1.2" fill="rgba(255,255,255,0.02)"/>
                  </svg>
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

export default Home;
// ...existing code...