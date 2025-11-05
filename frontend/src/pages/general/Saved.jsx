import React, { useState, useEffect,useRef } from "react";
import { Link } from "react-router-dom";
import Reel from "../../components/Reel";
import "../../styles/reels.css";
import axios from "axios";

const Saved = () => {
  const [videos, setVideos] = useState([]);
   const videoRefs = useRef([]);
   
    
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food/saved", {
        withCredentials: true,
      })
      .then((response) => {
        const savedFood = response.data.savedFoods.map((video) => ({
          _id: video.food._id,
          video: video.food.video,
          name: video.food.name,
          description: video.food.description,
          likeCount: video.food.likeCount,
          saveCount: video.food.saveCount,
          commentCount: video.food.commentCount,
        }));
        setVideos(savedFood);
      })
      .catch((error) => {
        console.error("Error fetching saved videos:", error);
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

  // Like Video method : (match Home.jsx naming)
  const handleLikeVideo = async(video)=>{
    const response = await axios.post("http://localhost:3000/api/food/like",{foodId : video._id},{
      withCredentials : true
    })
   
    if (response.data.like) {
      console.log("video liked");
      setVideos((prev)=>prev.map((vid)=> vid._id === video._id ? {
        ...vid,
        likeCount : vid.likeCount + 1
      } : vid))
    }else{
      console.log("Video Unliked");
      setVideos((prev)=>prev.map((vid)=> vid._id === video._id ? {
        ...vid,
        likeCount : vid.likeCount - 1
      } : vid))
    }
  }

  const handleSavedVideo = async(video)=>{
    const response = await axios.post("http://localhost:3000/api/food/save",{foodId : video._id},{
      withCredentials : true
    })

    if (response.data.save) {
      console.log("Video Saved SuccessFully");
      setVideos((prev)=> prev.map((vid)=> vid._id === video._id ? {...vid,
      saveCount : vid.saveCount + 1 } : vid))
    }else{
      console.log("Video UnSaved successfully");
      setVideos((prev)=> prev.map((vid)=> vid._id === video._id ? {...vid,
      saveCount : vid.saveCount - 1 } : vid))
    }
  }

  return (
    <Reel
      videos={videos}
      videoRefs={videoRefs}
      handleLikeVideo={handleLikeVideo}
      handleSavedVideo={handleSavedVideo}
    />
  );
};

export default Saved;