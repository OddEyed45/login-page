import '../index.css'
import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom' 
// import { useNavigate } from 'react-router-dom'


const URL = "http://localhost:3000"

function LoginPage() {

  const [newUsername, setUsername] = useState("")
  const [newPassword, setPassword] = useState("")
  const [message, setMessage] = useState("")

  // const navigate = useNavigate()


  async function findUser() {

    if (newUsername != "" && newPassword != "")
    {
      const response = await axios.post(`${URL}/login`, {
          username: newUsername,
          password: newPassword
      }, { withCredentials: true })
      return response
      
    }
    else if (newUsername == "" && newPassword == "")
    {
      setMessage("Please enter user details. ")
    }
    
    else if (newUsername == "")
    {
       setMessage("Please enter a username. ")
    }
    else if (newPassword == "")
    {
      setMessage("Please enter a password. ")
    }
    else
    {
      setMessage("Something went wrong with the program. ")
    }
    
  }

  async function validateUserDetails () {
    const response = await findUser()
    if (!response?.data.Login)
    {
      setMessage("Sorry. User not found. Try another username or password. ");

    }
    else
    {
      window.location.reload()
      // create session on server
      // console.log("it should navigate now")
      // const r = await axios.get(`${URL}/verify`, { withCredentials: true })
      // console.log(r)
      // navigate("/user")
    }
  }


  return (
    <>
      <div className='text-black flex flex-col self-center h-140 w-110'>
        <p className='text-[40px] text-center'>Welcome! Please login</p>
        <text className='h-12 text-center text-red-600 text-[12px]'>{message}</text>
        <div className=' h-full  flex flex-col mx-1'>
          <p className='text-xl'>Enter your username: </p>
          <input id="username_field" value={newUsername} onChange={(e) => setUsername(e.target.value)} className='border-solid border-2 h-10 py-1 px-3 rounded-lg text-xl'/>
          <div className='mb-5'></div>
          <p className='text-xl'>Enter your password: </p>
          <input id="password_field" type="password" value={newPassword} onChange={(e) => setPassword(e.target.value)} className='border-solid border-2 h-10 py-1 px-3 rounded-lg text-xl bg-white'/>
          <div className='mb-10'></div>
          <button onClick={validateUserDetails} className='h-10 sample'>Login</button>
          <div className='mb-10'></div>
          <div className='flex flex-row'>
            <line className='h-0.5 w-full bg-black mt-5'></line>
            <h3 className='mx-5 mt-2'>Or</h3>
            <line className='h-0.5 w-full bg-black mt-5'></line>
          </div>
          <div className='mb-10'></div>
          <button className='h-10 sample'>Google</button>
          <div className='mb-5'></div>
          <Link to="/SignUpPage" className='sample h-10 text-black text-center'>Sign Up</Link>
        </div>
      </div>
    </>
  )

}
export default LoginPage
