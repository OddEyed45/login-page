import './index.css'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import SignUpPage from './pages/SignUpPage'
import SignupRoute from './routing/SignupRoute'
import DefaultRoute from './routing/DefaultRoute'
import LoginRoute from './routing/LoginRoute'
import HomeRoute from './routing/HomeRoute'
import { useEffect, useState } from 'react'
import axios from 'axios'

const URL = "http://localhost:3000"

function App() {
  
  const [isLoggedIn, setLoggedIn] = useState(false)
  // const [count, setCount] = useState(0)
  useEffect(() => {
    axios.get(`${URL}/verify`, { withCredentials: true })
        .then((response) => {
            setLoggedIn(response.data.valid)
        }
        )
        .catch(err => console.log(err))
    
  })

  return (
    <Router>
      <Routes>
        <Route path="/LoginPage" element={<LoginRoute loggedIn={isLoggedIn}/>}/>
        <Route path="/" element={<DefaultRoute loggedIn={isLoggedIn}/>}/>
        <Route path="/SignUpPage" element={<SignupRoute loggedIn={isLoggedIn}/>}/>
        <Route path="/HomePage" element={<HomeRoute loggedIn={isLoggedIn}/>}/>
      </Routes>
    </Router>
  )

}

export default App
