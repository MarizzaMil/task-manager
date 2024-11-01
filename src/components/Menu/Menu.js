import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './Menu.css';

const Menu = () => {
    const { user, logout } = useAuth();

    return (
        <div className="menu-container">
            <h2>Let’s Get Things Done!</h2>
            {user && (
                <>
                    <p>Email: {user.user.email}</p>
                    <button className="logout-button" onClick={logout}>
                        Logout
                    </button>
                </>
            )}
            <div className="menu-links">
                <a href="/categories">Categories</a>
                <a href="/about">About</a>
            </div>
        </div>
    );
};

export default Menu;
