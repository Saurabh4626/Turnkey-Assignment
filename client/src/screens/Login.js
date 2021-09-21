import { useState } from 'react';
import '../App.css';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const LoginUser = async(e)=>{
    e.preventDefault();
    await axios.post('http://localhost:5000/api/login',{
      email,
      password
    }).then(response=>{
      console.log(response.data.user)
      if (response.data.user){
        localStorage.setItem('token',response.data.user)
        alert("login success")
        window.location.href='/dashboard'
      }else{
        alert("error")
      }
    })

  }
  return (
    <div className="App">
      <h1>Login</h1>
      <form onSubmit={LoginUser}>
        <input 
        type="email" 
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        /><br />
        <input 
        type="password" 
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        /><br />
        <input type="submit" value="login" />
      </form>
    </div>
  );
}

export default Login;
