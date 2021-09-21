import { useState } from 'react';
import { useHistory } from 'react-router-dom'
import '../App.css';
import axios from 'axios';

function Register() {
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');

  const registerUser = async(e)=>{
    e.preventDefault();
    await axios.post('http://localhost:5000/api/register',{
      name,
      email,
      password,
      contact
    }).then(response=>{
      if (response.data.status==="ok"){
        alert("registration successful")
        history.push('/login')
      }
      else{
        alert("email already exist or number not valid")
      }
    })

  }
  return (
    <div className="App">
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input
        type="text" 
        placeholder="Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        /><br />
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
        <input 
        type="text" 
        placeholder="contact"
        value={contact}
        onChange={(e)=>setContact(e.target.value)}
        /><br />
        <input type="submit" value="register" />
      </form>
    </div>
  );
}

export default Register;
