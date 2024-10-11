import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './redux/store'; // Store'u import edin
import './index.css';
import 'antd/dist/reset.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> {/* Provider ilə sarın */}
      <App />
    </Provider>
  </React.StrictMode>,
);
