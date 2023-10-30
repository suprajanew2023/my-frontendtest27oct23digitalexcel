import { useState } from 'react';
import { register } from '../Components/Service';
import Login from './login';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showRegister, setShowRegister] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous error messages
    setEmailError('');
    setPasswordError('');

    // Email and Password validation
    if (!formData.email || !isValidEmail(formData.email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    if (!formData.password || formData.password.length < 6) {
      setPasswordError('Password should be at least 6 characters long.');
      return;
    }

    register(formData);
    alert('Registered successfully');
  };

  if (showRegister) {  
    return <Login />;
  }

  return (
    <div className='bg-container'>
      <div className='card-container'>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            className='input'
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          {emailError && <div className="error-message">{emailError}</div>}
          
          <input
            className='input'
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
          {passwordError && <div className="error-message">{passwordError}</div>}

          <div className='btn-comtainer'>
            <button className='button-login' type="submit">Register</button>
            <button className='button-login' onClick={() => setShowRegister(true)}>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
