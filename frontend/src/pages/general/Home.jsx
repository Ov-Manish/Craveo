// ...existing code...
import React, { useState, useEffect, useRef } from "react";
import "../../styles/reels.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Reel from "../../components/Reel";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]); // ✅ to store refs of all videos

  useEffect(() => {
    axios.get("http://localhost:3000/api/food/", {
        withCredentials: true,
      })
      .then((res) => {
        setVideos(res.data.foodItems);
        console.log("Response Data",res.data);
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

// Like Video method : 
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

export default Home;
// ...existing code...