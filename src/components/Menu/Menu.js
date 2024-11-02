import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Categories from '../Categories/Categories'; // Import the Categories component
import './Menu.css';

const Menu = ({ onCategorySelect, selectedCategory }) => {
    const { user, logout } = useAuth();

    return (
        <div className="menu-container">
            <h2>Let’s Get Things Done!</h2>
            {user && (
                <>
                    <p className="menu-links">Email: {user.user.email}</p>
                    <button className="logout-button" onClick={logout}>Logout</button>
                </>
            )}
            <Categories onCategorySelect={onCategorySelect} selectedCategory={selectedCategory} />
        </div>
    );
};

export default Menu;

