import '../index.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
//  import { useParams } from 'react-router-dom'


const URL = "http://localhost:3000"

function UserHomePage () 
{
    const [username, setUsername] = useState("")
    useEffect(() => {
        axios.get(`${URL}/verify`, { withCredentials: true })
        .then((response) => {
            if (response.data.valid)
            {
                setUsername(response.data.username)
            }
        }
        )
        .catch(err => console.log(err))
        
    })
    

    return (
    <>
        <div className="flex flex-col">
            <h2 className="text-black text-[40px]">
                Hello {username}!
            </h2>
            <input type='file' className='text-black border-2'></input>
        </div>
    </>
    )
}

export default UserHomePage