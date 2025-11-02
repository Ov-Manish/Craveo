import React from 'react'
import '../../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function UserLogin(){
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const response = await axios.post("http://localhost:3000/api/auth/user/login",{
      email,
      password,
    },{
      withCredentials : true, // without this the cookie will not be set from backend to frontend
    })

    console.log(response.data);
    
    navigate('/');
  }
  
  return (
    <div className="center-wrap">
      <div className="card" role="region" aria-label="User login form">
        <div className="brand">
          <div className="logo">U</div>
          <div>
            <div className="h1">Welcome back</div>
            <div className="sub">Sign in to continue as a customer</div>
          </div>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div>
            <div className="label">Email</div>
            <input className="input" type="email" name="email" placeholder="you@example.com" />
          </div>

          <div>
            <div className="label">Password</div>
            <input className="input" type="password" name="password" placeholder="Your password" />
          </div>

          <button className="btn" type="submit">Sign in</button>
        </form>

        <div className="footer-note">
          New here? <a className="link" href="/user/register">Create account</a>
        </div>
      </div>
    </div>
  )
}