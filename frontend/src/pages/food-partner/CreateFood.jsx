import React, { useState, useRef } from "react"; // ✅ added useRef
import "../../styles/createFood.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function VideoUploadBox() {
  const [video, setVideo] = useState(null);
  const [preview, setPreview] = useState("");
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const fileInputRef = useRef(null); // ✅ create ref for file input

  const handleFileChange = async(e) => {
    
   const formData = new FormData();
   formData.append('name', name);
   formData.append('description', description);
   formData.append('video', e.target.files[0]);
   const response =  await axios.post("http://localhost:3000/api/food/",formData,{
      withCredentials:true,
    })

    console.log(response.data);
    navigate("/");
};

  return (
    <div className="upload-container">
      <h2>Create Food Item</h2>

      <div className="upload-box">
        <input
          type="file"
          id="videoInput"
          accept="video/*"
          onChange={handleFileChange}
          hidden
          ref={fileInputRef} // ✅ attach ref
        />

        <div className="meta-fields">
          <input
            type="text"
            placeholder="Food name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="meta-input"
          />
          <textarea
            placeholder="Short description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="meta-textarea"
            rows={3}
          />
        </div>

        {!video ? (
          <label htmlFor="videoInput" className="upload-area">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="upload-icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9m0 0l-3 3m3-3l3 3M6.75 18.75a.75.75 0 01-.75-.75v-12a.75.75 0 01.75-.75h10.5a.75.75 0 01.75.75v12a.75.75 0 01-.75.75H6.75z"
              />
            </svg>
            <p>
              <strong>Click to upload</strong> or drag & drop
            </p>
            <span className="subtext">MP4, MOV up to 50MB</span>
          </label>
        ) : (
          <div className="preview-section">
            <video src={preview} controls className="preview-video" />
            <p className="file-name">{video.name}</p>

            {uploading ? (
              <div className="progress-bar">
                <div className="progress" style={{ width: `${progress}%` }} />
              </div>
            ) : (
              <div className="preview-actions">
                <button onClick={handleUpload} className="upload-btn">
                  Upload Video
                </button>
                <button
                  onClick={() => {
                    setVideo(null);
                    setPreview("");
                    setProgress(0);
                    fileInputRef.current.value = ""; // ✅ reset input on remove
                  }}
                  className="cancel-btn"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
