import React from 'react';
import ReactDOM from 'react-dom/client'; // 'react-dom' yerine 'react-dom/client' kullanılıyor
import { Provider } from 'react-redux';
import store from './redux/store';  // Redux store'unuzu içe aktarıyorsunuz
import App from './App';

// Uygulamanın kök elementini alıyoruz
const rootElement = document.getElementById('root');

// createRoot API'sini kullanarak render ediyoruz
const root = ReactDOM.createRoot(rootElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
