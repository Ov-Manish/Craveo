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
            <p className="video-description">{video.name}</p>
            <p className="video-description">{video.description}</p>
            <Link
              to={`/foodPartner/${video.foodPartner}`}
              className="visit-store-btn"
              aria-label="Visit Store"
            >
              Visit Store
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
