import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Entry point for the React app using ReactDOM and App component
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);