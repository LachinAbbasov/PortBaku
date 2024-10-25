import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/userSlice'; // Burada loginUser action-ını redux-da yaratmalısan.

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Burada loginUser action-ını çağır.
    dispatch(loginUser({ email, password }));
    // Formu sıfırla
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <h2>Daxil Ol</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Şifrə:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Daxil Ol</button>
      </form>
    </div>
  );
};

export default Login;
