import React from 'react'
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom'
import UserRegister from '../pages/auth/UserRegister'
import UserLogin from '../pages/auth/UserLogin'
import PartnerRegister from '../pages/auth/PartnerRegister'
import PartnerLogin from '../pages/auth/PartnerLogin'
import Home from '../pages/general/Home'
import CreateFood from '../pages/food-partner/CreateFood'
import PartnerProfile from '../pages/food-partner/PartnerProfile'
const AppRoutes = () => {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<div><Home/></div>} /> 
          <Route path='/user/register' element={<div><UserRegister/></div>} />
          <Route path='/user/login' element={<div><UserLogin/></div>} />
          <Route path='/food-partner/register' element={<div><PartnerRegister/></div>} />
          <Route path='/food-partner/login' element={<div><PartnerLogin/></div>} />
          <Route path='/create-food' element={<div><CreateFood/></div>} />
          <Route path='/foodPartner/:id' element={<div><PartnerProfile/></div>} />
        </Routes>
    </Router>
  )
}

export default AppRoutes