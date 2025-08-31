import '../index.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

const URL = "http://localhost:3000"

function SignUpPage() {

  const [newUsername, setUsername] = useState("")
  const [newPassword, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const navigate = useNavigate()

  async function addUser() {

    setMessage("")

    if (newUsername != "" && newPassword != "")
    {
      const newDate = new Date()
      const obj = {
        username: newUsername,
        password: newPassword,
        dateCreated: newDate
      }
      const passwordMatch = newPassword.match(/^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,24}$/)
      try
      {
        if (passwordMatch != null)
        {
          await axios.post(`${URL}/users`, obj).then(() => {
            navigate("/LoginPage")
          })
        }
        else
          setMessage("Password must be 8-24 characters and should have at least one special character, at least one letter, and least one digit. Try another password. ")
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      catch (err : any)
      {
        if (err.response && err.response.status == 409)
        {
          setMessage("Username is already taken. Please choose another username")
        }
        else
        {
          setMessage("Something went wrong with the program. ")
        }
      }
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

  return (
    <>
      <div className='text-black flex flex-col self-center h-140 w-110'>
        <p className='text-[40px] min-w-100 text-center'>Sign up!</p>
        <text className='h-12 text-center text-red-600 text-[12px] text-wrap max-w-100'>{message}</text>
        <div className=' h-full  flex flex-col mx-1'>
          <p className='text-xl'>Choose a username: </p>
          <input id="username_field" value={newUsername} onChange={(e) => setUsername(e.target.value)} className='border-solid border-2 h-10 py-1 px-3 rounded-lg text-xl'/>
          <div className='mb-5'></div>
          <p className='text-xl'>Choose a password: </p>
          <input  id="password_field" type="password" value={newPassword} onChange={(e) => setPassword(e.target.value)} className='border-solid border-2 h-10 py-1 px-3 rounded-lg text-xl bg-white'/>
          <div className='mb-10'></div>
          <button className='h-10 sample' onClick={addUser}>Sign Up</button>
          <div className='mb-10'></div>
          <div className='flex flex-row'>
            <line className='h-0.5 w-full bg-black mt-5'></line>
            <h3 className='mx-5 mt-2'>Or</h3>
            <line className='h-0.5 w-full bg-black mt-5'></line>
          </div>
          <div className='mb-10'></div>
          <button className='h-10 sample'>Google</button>
          <div className='mb-5'></div>
          <Link to="/LoginPage" className='sample h-10 text-black text-center'>Login</Link>
        </div>
      </div>
    </>
  )
}

export default SignUpPage
