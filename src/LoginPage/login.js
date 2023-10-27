
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import './login.css';
import { useNavigate } from 'react-router';
import AAQ from "/home/thrinath/testreactapplication/my-frontendtest/src/LoginPage/AAQ-1904.png"
function Login() {
                                                                                                let user = "Rhym@123";let pass = "Thrinath@123";const nav=useNavigate();
  const abc=()=>{
    nav("/ControlsPage")
  }
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    password: ''
  });
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    let valid = true;
    let errors = {
      username: '',
      password: ''
    };

    if (!formData.username.trim()) {
      valid = false;
      errors.username = 'Username is required';
    }

    if (!formData.password.trim()) {
      valid = false;
      errors.password = 'Password is required';
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm() && formData.username === user && formData.password === pass) {
        
      console.log('Form data submitted:', formData);
      abc(nav("/state"))
    
    }
    else
    {alert("Unauthorized Access");}
  };

  return (
    <div className='bg-container'>
    <header className='header'>
        <div className='head' >
        <img src={AAQ}  alt="Logo" className='logo'/>
        </div>
    </header>
    
    <div className='card-container'>
      <div className="clas">
      <h2 className='heading'>Login </h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <input placeholder='UserName' className='input' type="text" name="username" value={formData.username} onChange={handleChange} />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>
        <div>
          <input placeholder='Password' className='input' type="password" name="password" value={formData.password} onChange={handleChange} />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div className='btn-comtainer'>
        <Button  className='btn' variant="primary" size='large' type="submit" >Login</Button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default Login;
