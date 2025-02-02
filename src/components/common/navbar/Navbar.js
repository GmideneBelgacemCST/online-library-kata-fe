import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../../../domains/users/hooks/useAuth';

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();

    return (
        <nav className="navbar">
            <ul>
                {isAuthenticated ? (
                    <>
                        <li className="welcome-text">Welcome, {user.username}</li>
                        <li><Link to="/home">Home</Link></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </>
                )}
            </ul>

            {isAuthenticated && (
                <button className="logout-button" onClick={logout}>Logout</button>
            )}
        </nav>
    );
};

export default Navbar;
