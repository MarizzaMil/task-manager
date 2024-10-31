import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000'


// Login API
export const login = async (email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/signin`, {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

// Register API
export const register = async (email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/signup`, {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        console.error('Register error:', error);
        throw error;
    }
};
