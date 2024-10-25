import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/userSlice'; // Burada registerUser action-ını redux-da yaratmalısan.

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Burada registerUser action-ını çağır.
    dispatch(registerUser({ username, email, password }));
    // Formu sıfırla
    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <h2>Qeydiyyat</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>İstifadəçi adı:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
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
        <button type="submit">Qeydiyyat</button>
      </form>
    </div>
  );
};

export default Register;
