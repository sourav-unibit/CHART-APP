import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MyContextProvider } from './Context/Context';
import { SocketContextProvider } from './Context/SocketContext';

// import dotenv from "dotenv"
// dotenv.config()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MyContextProvider>
      <SocketContextProvider>
        < App />
      </SocketContextProvider>
    </MyContextProvider>
  </React.StrictMode>
);

