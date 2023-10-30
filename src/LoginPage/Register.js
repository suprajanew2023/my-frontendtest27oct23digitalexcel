import { useState } from 'react';
import { register } from '../Components/Service';
import Login from './login';
function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showRegister, setShowRegister] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  if (showRegister) {  
    return <Login />;
  }

  const handleSubmit = async (e) => {
    console.log('hi')
    e.preventDefault();

    register(formData)
      alert('Registered successfully');
  
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit" onClick={() => setShowRegister(true)}>Register</button>

        
      </form>
    </div>
  );
}

export default Register;
