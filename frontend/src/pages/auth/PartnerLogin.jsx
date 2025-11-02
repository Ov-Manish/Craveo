import React from 'react'
import '../../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function PartnerLogin(){
  const navigate = useNavigate();
  const handleFormSubmit  = async(e)=>{
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email , password);
    
    const response = await axios.post("http://localhost:3000/api/auth/foodpartner/login",{
      email,
      password
    },{
      withCredentials : true, // without this the cookie will not be set from backend to frontend
    })

    console.log(response.data);
    navigate('/create-food');
    
  }
  return (
    <div className="center-wrap">
      <div className="card" role="region" aria-label="Partner login form">
        <div className="brand">
          <div className="logo">P</div>
          <div>
            <div className="h1">Partner sign in</div>
            <div className="sub">Manage orders and menu</div>
          </div>
        </div>

        <form className="form" onSubmit={handleFormSubmit}>
          <div>
            <div className="label">Email</div>
            <input className="input" type="email" name="email" placeholder="owner@example.com" />
          </div>

          <div>
            <div className="label">Password</div>
            <input className="input" type="password" name="password" placeholder="Your password" />
          </div>

          <button className="btn" type="submit">Sign in</button>
        </form>

        <div className="footer-note">
          Need an account? <a className="link" href="/food-partner/register">Register</a>
        </div>
      </div>
    </div>
  )
}