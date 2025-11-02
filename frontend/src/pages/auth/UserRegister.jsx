import React from 'react'
import '../../styles/auth.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UserRegister(){
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log("Name : ",name,"Email : ", email,"Password : ", password );

   const response =  await axios.post("http://localhost:3000/api/auth/user/register",{
      name,
      email,
      password,
    },{
      withCredentials : true, // without this the cookie will not be set from backend to frontend
    })

    console.log("RESPONSE : ",response.data);
    navigate('/')
    
  }
  return (
    <div className="center-wrap">
      <div className="card" role="region" aria-label="User registration form">
        <div className="brand">
          <div className="logo">U</div>
          <div>
            <div className="h1">Create user account</div>
            <div className="sub">Simple, minimal sign up for customers</div>
          </div>
        </div>

        <nav className="account-switch" role="navigation" aria-label="Registration type">
          <a className="link active" aria-current="page" href="/user/register">Register as normal</a>
          <span className="sep" aria-hidden="true">•</span>
          <a className="link" href="/food-partner/register">Register as food partner</a>
        </nav>

        <form className="form" onSubmit={handleSubmit}>
          <div>
            <div className="label">Full name</div>
            <input className="input" name="name" placeholder="Jane Doe" />
          </div>

          <div>
            <div className="label">Email</div>
            <input className="input" type="email" name="email" placeholder="you@example.com" />
          </div>

          <div>
            <div className="label">Password</div>
            <input className="input" type="password" name="password" placeholder="Create a password" />
          </div>

          <button className="btn" type="submit">Create account</button>
        </form>

        <div className="footer-note">
          Already have an account? <a className="link" href="/user/login">Sign in</a>
        </div>
      </div>
    </div>
  )
}