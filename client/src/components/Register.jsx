import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Sass/Register.scss';


const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                username,
                password
            });

            // JWT token'ı localStorage'e kaydediyoruz
            localStorage.setItem('token', response.data.token);

            // Başarılı kayıt sonrası yönlendirme
            navigate('/dashboard');
        } catch (err) {
            setError('Kayıt başarısız. Lütfen bilgilerinizi kontrol edin.');
        }
    };

    return (
        <div className="register-container">
            <h2>Kayıt Ol</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleRegister}>
                <div>
                    <label>Kullanıcı Adı:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Şifre:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Kayıt Ol</button>
            </form>
        </div>
    );
};

export default Register;
