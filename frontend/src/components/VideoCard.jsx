import React ,{useState,useEffect,useRef}from "react";
import { Link } from "react-router-dom";

const VideoCard = ({ video, videoRef, onLike = () => {}, onSave = () => {} }) => {
    const videoRefs = useRef(new Map())
    
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
  }, [video]);



  return (
    <div className="video-container" key={video._id}>
      <video
        src={video.video}
        className="video"
        loop
        muted
        playsInline
        ref={videoRef}
      />
      <div className="video-overlay">
        <div className="video-text">
          <h3 style={{ padding: "5px" }}>Saved </h3>
          <p className="video-description">{video.name}</p>
          <p className="video-description small">{video.description}</p>
          <Link
            to={`/foodPartner/${video._id}`}
            className="visit-store-btn"
            aria-label="Visit Store"
          >
            visit store
          </Link>
        </div>

        <div className="video-side-actions">
          <button onClick={() => onLike(video)} className="action-btn" aria-label="Like">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M12 21s-7-4.5-9-8a5 5 0 019-6 5 5 0 019 6c-2 3.5-9 8-9 8z" stroke="#fff" strokeWidth="1.2" fill="rgba(255,255,255,0.06)"/>
            </svg>
            <span className="action-count">{video.likeCount}</span>
          </button>

          <button onClick={() => onSave(video)} className="action-btn" aria-label="Save">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M6 2h10l4 4v16l-8-4-8 4V6z" stroke="#fff" strokeWidth="1.2" fill="rgba(255,255,255,0.02)"/>
            </svg>
            <span className="action-count">{video.saveCount}</span>
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
  );
};

export default VideoCard;