import React from "react";
import "../../styles/auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const PartnerRegister = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
   const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const contactName = e.target.contactName.value;
    const phone = e.target.phone.value;
    const address = e.target.address.value;
    console.log(name , email , password , contactName , phone , address);
    
    const response = await axios.post("http://localhost:3000/api/auth/foodpartner/register",{
      name,
      email,
      password,
      contactName,
      phone,
      address
    },{
      withCredentials : true, // without this the cookie will not be set from backend to frontend
    })

    console.log(response.data);
    navigate('/create-food')
    
  }
  return (
    <div className="center-wrap">
      <div className="card">
        {/* ===== Header ===== */}
        <h2 className="h1" style={{ textAlign: "center", marginBottom: "0.3rem" }}>
          Partner sign up
        </h2>
        <p className="sub" style={{ textAlign: "center", marginBottom: "1rem" }}>
          Grow your business with our platform.
        </p>

        {/* ===== Switch Links ===== */}
        <p
          className="sub"
          style={{
            textAlign: "center",
            marginBottom: "1.5rem",
            fontSize: "0.9rem",
          }}
        >
          Switch:{" "}
          <a href="/user/register" className="link">
            User
          </a>
        </p>

        {/* ===== Form ===== */}
        <form className="form" onSubmit={handleSubmit}>
          {/* Business Name */}
          <div>
            <label className="label">BUSINESS NAME</label>
            <input
              name="name"
              type="text"
              className="input"
              placeholder="Tasty Bites"
              required
            />
          </div>

          {/* Contact + Phone */}
          <div className="row">
            <div style={{ flex: 1 }}>
              <label className="label">CONTACT NAME</label>
              <input
                name="contactName"
                type="text"
                className="input"
                placeholder="Jane Doe"
                required
              />
            </div>
            <div style={{ flex: 1 }}>
              <label className="label">PHONE</label>
              <input
              name="phone"
                type="tel"
                className="input"
                placeholder="+1 555 123 4567"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="label">EMAIL</label>
            <input
              name="email"
              type="email"
              className="input"
              placeholder="business@example.com"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="label">PASSWORD</label>
            <input
            name="password"
              type="password"
              className="input"
              placeholder="Create password"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label className="label">ADDRESS</label>
            <input
            name="address"
              type="text"
              className="input"
              placeholder="123 Market Street"
              required
            />
            <p className="sub" style={{ fontSize: "0.78rem", marginTop: "0.3rem" }}>
              Full address helps customers find you faster.
            </p>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn">
            Create Partner Account
          </button>
        </form>

        {/* ===== Footer ===== */}
        <p className="footer-note" style={{ marginTop: "1rem" }}>
          Already a partner?{" "}
          <a href="/food-partner/login" className="link">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default PartnerRegister;
