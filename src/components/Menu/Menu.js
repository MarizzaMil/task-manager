import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Categories from '../Categories/Categories'; 
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
            <hr/>
            <Categories onCategorySelect={onCategorySelect} selectedCategory={selectedCategory} />
        </div>
    );
};

export default Menu;

