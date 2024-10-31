import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        login({ username });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
