import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Sass/AdminRegister.scss';


const AdminRegister = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleAdminRegister = async (e) => {
        e.preventDefault();
        try {
            // Backend'e admin rolüyle birlikte bir kullanıcı kaydı gönderiliyor
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                username,
                password,
                role: 'admin', // Admin rolünü burada belirtiyoruz
            });

            // JWT token'ı localStorage'e kaydediyoruz
            localStorage.setItem('token', response.data.token);

            // Başarılı kayıt sonrası yönlendirme
            navigate('/admin-dashboard');
        } catch (err) {
            setError('Admin kaydı başarısız. Lütfen bilgilerinizi kontrol edin.');
        }
    };

    return (
        <div className="admin-register-container">
            <h2>Admin Kayıt Ol</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleAdminRegister}>
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
                <button type="submit">Admin Kayıt Ol</button>
            </form>
        </div>
    );
};

export default AdminRegister;
