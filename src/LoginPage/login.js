
import axios from 'axios';
import { useState } from 'react';
import './login.css';
import Register from './Register';
import { useNavigate } from 'react-router';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  
  const nav=useNavigate();
  const abc=() => {
    
    nav("/ControlsPage")
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://digitalexcelbackend.onrender.com/login', { email, password });
      localStorage.setItem('token', response.data.token);
      alert('Logged in successfully');
      abc(nav("/ControlsPage"))
    } catch (err) {
      alert('Error logging in');
    }
  };
  if (showRegister) {  
    return <Register />;
  }
  return (
      <div className='bg-container'>
        <div className='card-container'>
        <div className='container_card'>
        <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <input className='input' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
              <input className='input' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
              <div className='btn-comtainer '>
              <button className='button-login ' type="submit">Login</button>
              <button className='button-login ' type="button" onClick={() => setShowRegister(true)}>SignUp</button> 
              </div>
            </form>
        </div>
        </div>
      </div>
  );
}

export default Login;
