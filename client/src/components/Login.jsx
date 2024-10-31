import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import '../Sass/Login.scss';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const navigate = useNavigate();

  const jokes = [
    'Şifrəni kiməsə deməsən daha yaxşı olar! 😄',
    'Yox, bu şifrə də deyil. Yenidən cəhd et! 🙃',
    'Əminəm ki, yaxınsan, amma bu da deyil! 🔐',
    'Bu şifrə bura uyğun gəlmir. Sənə kömək etmək istəyirəm! 😊',
    'Təkrar yoxla, üçüncü də doğrudur deyirlər! 😆',
    'Bu giriş üçün gülməli şifrələrdən istifadə etməsən yaxşı olar! 😅',
    'Bəlkə şifrəni yazmaq əvəzinə onu yaddan çıxartdın? 🧐',
    'Kodlardan danışırıq, amma bu şifrə heç də uyğun deyil! 😜',
    'Şifrəni təxmin etmək çətindir, düzdür, amma bu dəfə də səhvdir! 🤔',
    'Bəlkə də bir fincan çaydan sonra daha doğru cavab tapa bilərsən! ☕',
    'Görünür, səhv yolda getmisən. Yolunu tap, şifrəni də! 🚀',
    'Bu şifrə ilə bir yerə gedə bilməyəcəyik! Başqa bir variant? 🚫',
    'Bəlkə klaviaturada bəzi düymələr köhnəlib? Təkrar yoxla! 😆',
    'Həqiqi şifrə bu deyil! Təkrar sınamaq üçün mən buradayam. 🎉',
    'Sanki şifrə sirlərin arasındadır, amma bu deyil! 🎩',
    'Bəlkə də şifrən “1234” deyil. Daha yaratıcı ol! 🤯',
    'Niyə “qeyri-adi” şifrə istifadə etmirsən? Bəlkə kömək edər! 🦄',
    'Şifrə ağacda böyüməz, düzgün yazmağa çalış! 🌳',
    'Bir az daha düşün! Bəlkə taparsan! 🤓',
    'Bəlkə də klaviaturanda səhv düymələrə basırsan? 🔍',
    'Yenidən yoxla! Mən sənin yanındayam! 👀',
    'Səhv şifrədir, amma təəccüblənmə! 🔒',
    'Şifrələr həmişə asan olmur. Yenidən yoxla! 🎭',
    'Şifrən burda deyil, başqa yerdə axtar! 🧩',
    'Bir az daha səbir et! Tapmaq üzrəsən! 🕵️‍♂️',
    'Şifrəni tapmağa çalış, mən buradayam! 💪',
    'Düzgün yol tapmaqdadır, davam et! 🔦',
    'Bu şifrə bura uyğun deyil. Mənə inan! 🧠',
    'Bir az daha əmin olmağa çalış! Sən edə bilərsən! 🌟',
    'Bu səhvdir, amma dərd etmə, cəhd et! 🐱',
    'Səhvdir, amma mənə gülümsə, hər şey yaxşı olacaq! 😊',
    'Sən şifrəni tapmaq üçün doğulmusan! 🙌',
    'Bu şifrə bu dünyadan deyil! Yenidən yoxla! 🚀',
    'Əsas olan şifrəni tapmaq deyil, səy göstərməkdir! 💫',
    'Ən azından şifrə maraqlıdır, amma səhvdir! 😅',
    'Şifrəni tapmağa yaxınsan, davam et! 🕵️‍♀️',
    'Bəlkə də internetdən bir az ara verəsən? 😴',
    'Sən tapacaqsan! Mən inanıram! 🌈',
    'Düşün, amma bu deyil. Yaxşı yol seç! 🌍',
    'Bir az daha çalışsan, şifrəni taparsan! 🧘‍♂️',
    'Şifrə möcüzəvi deyil, yenidən yoxla! 🧙‍♂️',
    'Bu da olmadı! Şifrən təxmin edilməzdir! 🔐',
    'Şifrə sənin əlinin altındadır! Yenidən yoxla! 🔑',
    'Bəzən düzgün cavab üçün doğru şans lazım olur! 🍀',
    'Bu cəhd deyil, başqa yol tap! 🌌',
    'Əsas məsələ şifrəni tapmaq deyil, doğru olmaqdır! 🌅',
    'Şifrəni tapmağa yaxınsan, davam et! 💼',
    'Məncə, doğru yolda deyilsən, təkrar yoxla! 🌊',
    'Bu sanki möcüzə kimidir, amma deyil! 🌠',
    'Şifrələr və şans heç də uyğun gəlmir! 🍂',
    'Bəlkə sənə bir az yardım lazımdır! 💡',
    'Əgər şifrəni tapmasan, narahat olma, gələcəkdə taparsan! 📅'
];

const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        navigate('/product-management');
      } else {
        throw new Error('Token bilgisi alınamadı.');
      }
    } catch (err) {
      const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
      setError(randomJoke);
      setShowModal(true);

      // Hide modal after 3 seconds
      setTimeout(() => {
        setShowModal(false);
      }, 3000);
    }
  };

  return (
    <div className="login-container">
      {showModal && (
        <div className="modal">
          <p>{error}</p>
        </div>
      )}
      <form onSubmit={handleLogin}>
        <div>
          <label>İstifadəçi Adı:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="password-container">
          <label>Şifrə:</label>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="password-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
            </span>
          </div>
        </div>
        <button type="submit">Daxil Ol!</button>
      </form>
    </div>
  );
};

export default Login;
