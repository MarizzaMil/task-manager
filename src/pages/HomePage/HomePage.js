import React, { useState } from 'react';
import TaskList from '../../features/TaskList';
import Menu from '../../components/Menu/Menu';
import './HomePage.css';

const HomePage = () => {
    const [selectedCategory, setSelectedCategory] = useState("All Tasks"); // Default category

    return (
        <div className="homepage-container">
            <div className="menu-section">
                <Menu onCategorySelect={setSelectedCategory} selectedCategory={selectedCategory} />
            </div>
            <div className="tasklist-section">
                <TaskList selectedCategory={selectedCategory} />
            </div>
        </div>
    );
};

export default HomePage;
