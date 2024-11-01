import React from 'react';
import TaskList from '../../features/TaskList';
import Menu from '../../components/Menu/Menu';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="homepage-container">
            <div className="menu-section">
                <Menu />
            </div>
            <div className="tasklist-section">
                <TaskList />
            </div>

        </div>
    );
};

export default HomePage;
