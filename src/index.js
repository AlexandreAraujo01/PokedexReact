import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PokedexProvider } from './context/Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <PokedexProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </PokedexProvider>
);

