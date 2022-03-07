import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useNavigate} from 'react-router-dom';

const Dashboard = () => {
    const navigate=useNavigate()
    const[ quote,setQuote]=useState('');
    const[ tempQuote,setTempQuote]=useState('');

    const populateQuote=async()=>{
        const req= await fetch('http://localhost:1337/api/quote',{
            headers:{   
                'x-access-token':localStorage.getItem('token')
            }
        })
        const data= await req.json()
        // console.log(data)
        if (data.status === 'ok') {
            setQuote(data.quote)
        } else {
            alert(data.error)
            // navigate('/login')
        }
    }

    useEffect( () => {
        const token=localStorage.getItem('token')
        if (token) {
            const user =jwt.decode(token)
            // console.log(user)
            if (!user) {
                localStorage.removeItem('token')
                navigate('/login')
            }else{
                populateQuote()
            }
        }
    }, [])

    const updateQuote=async (event)=>{
        event.preventDefault()
        const req= await fetch('http://localhost:1337/api/quote',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'x-access-token':localStorage.getItem('token')
            },
            body:JSON.stringify({
                quote:tempQuote
            })

        })
        const data= await req.json()
        // console.log(data)
        if (data.status === 'ok') {
            setQuote(tempQuote)
            setTempQuote('')
        } else {
            alert(data.error)
            navigate("/login")
        }
    }

  return (
      <>
        <div>
            <h1>Your Quote :{ quote || 'NO quote found'}</h1>
            <form onSubmit={updateQuote}>
                <input type="text"
                placeholder='Quote'
                value={tempQuote}
                onChange={(e)=>setTempQuote(e.target.value)}
                 />
                 <input 
                 type="submit" 
                 value="Update quote"
                  />
                  <input
                   type="button"
                    value="logout"
                   />
            </form>
        </div>
      </>
  )
}

export default Dashboard