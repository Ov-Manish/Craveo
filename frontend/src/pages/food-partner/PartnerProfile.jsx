import React ,{useState , useEffect}from "react";
import "../../styles/PartnerProfile.css";
import axios from "axios";
import {useNavigate , useParams} from "react-router-dom";
export default function PartnerProfile() {
  const navigate = useNavigate();
  const {id} = useParams();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
   axios.get(`http://localhost:3000/api/foodPartner/${id}`,{
    withCredentials : true,
   }).then(response=>{
    setProfile(response.data.foodPartner);
    setVideos(response.data.foodPartner.foodItems);
   })
  }, [id])

  console.log("PROFILE : ",profile);
    console.log("Video : ",videos);
  

  return (
    <div className="partner-container">
      {/* Profile Header */}
      <div className="profile-card">
        <div className="profile-avatar">
          <img style={{height : "100px" , width:"100px", objectFit:"cover", borderRadius : "50%"}} src="https://images.pexels.com/photos/9604304/pexels-photo-9604304.jpeg" alt="" />
        </div>
        <div className="profile-text">
          <h2 className="business-name">{profile?.name}</h2>
          <p className="business-address">{profile?.address}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-card">
        <div className="stat">
          <p className="stat-label">Total Meals</p>
          <h3 className="stat-value">43</h3>
        </div>
        <div className="stat">
          <p className="stat-label">Customer Served</p>
          <h3 className="stat-value">15K</h3>
        </div>
      </div>

      <hr className="divider" />

      {/* Video Section */}
      <div className="video-section">
        {videos.map((video) => (
          <div className="video-box" key={video._id}>
            <video
            style={{ objectFit: 'cover', width: '100%', height: '100%',  }}
            
            src={video.video}></video>
          </div>
        ))}
      </div>
    </div>
  );
}
