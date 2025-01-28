import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './src/App';
import Navbar from './src/components/common/navbar/Navbar';
import { AuthProvider } from './src/domains/users/hooks/useAuth';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <AuthProvider>
        <BrowserRouter>
        <Navbar/>
        <App />
        </BrowserRouter>
        </AuthProvider>  
    </React.StrictMode>
);
