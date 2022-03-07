import React,{useState} from 'react';

function Login() {
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');

  async function loginUser(event){
    event.preventDefault();
   const response=await fetch('http://localhost:1337/api/login',{
     method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify({
        email,
        password
      }),
    })
    const data = await response.json();
    console.log(data)
    if (data.user && data.status==="ok") {
      localStorage.setItem('token',data.user);
      alert('login Successfull')
      window.location.href='/dashboard'
    } else {
      alert('check your username and password')
    }
  }

  return (
   <>
    <div>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
      <input 
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      type="email" 
      placeholder="Email" 
      /> 
      <br />
      <input 
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      type="password" 
      placeholder="Password" 
      />
      <br />
      <input type="submit" value="Login" />
      </form>
    </div>
   </>
  );
}

export default Login;
