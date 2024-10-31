import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import TaskList from './features/TaskList';

const Header = () => {
    const { user, logout } = useAuth();
    console.log(user)

    return (
        <div>
            {user ? (
                <div>
                    <span>Welcome, {user.name}</span>
                    <button onClick={logout}>Logout</button>
                </div>
            ) : (
                <span>Please log in</span>
            )}
        </div>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<TaskList />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
