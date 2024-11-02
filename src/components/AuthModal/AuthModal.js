import React, { useState, useEffect } from 'react';
import './AuthModal.css'; 
import Input from '../UI/Input';
import Button from '../UI/Button';
import { login as apiLogin, register as apiRegister } from '../../services/apiAuth'; 
import { useAuth } from '../../context/AuthContext';

const AuthModal = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [isRegistering, setIsRegistering] = useState(false);
    const [errors, setErrors] = useState({}); 
    const [loading, setLoading] = useState(false); 
    const { login } = useAuth(); 

    useEffect(() => {
        setIsDisabled(email.trim() === '' || password.trim() === '' || (isRegistering && confirmPassword.trim() === ''));
    }, [email, password, confirmPassword, isRegistering]);

    const validateFields = () => {
        const newErrors = {};
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        const isValidEmail = emailPattern.test(email);
        const isValidPassword = password.length >= 6; 
        const passwordsMatch = password === confirmPassword;

        if (!isValidEmail) newErrors.email = 'Please enter a valid email address.';
        if (!isValidPassword) newErrors.password = 'Password must be at least 6 characters.';
        if (isRegistering && !passwordsMatch) newErrors.confirmPassword = 'Passwords do not match.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; 
    };

    const handleAuth = async (e, action) => {
        e.preventDefault();
        if (validateFields()) {
            setLoading(true);
            try {
                const response = action === 'login' 
                    ? await apiLogin(email, password) 
                    : await apiRegister(email, password);
                if (response.token) {
                    login(response); 
                    onClose();
                } else {
                    setErrors({ general: response.message || `${action === 'login' ? 'Login' : 'Sign Up'} failed` });
                }
            } catch (error) {
                setErrors({ general: error.response?.data?.message || `${action === 'login' ? 'Login' : 'Registration'} failed` });
            } finally {
                setLoading(false);
            }
        }
    };

    const toggleForm = () => {
        setIsRegistering((prev) => !prev);
        setConfirmPassword('');
        setErrors({});
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>{isRegistering ? 'Register' : 'Log in'}</h2>
                <div className="auth-forms">
                    <form onSubmit={(e) => handleAuth(e, isRegistering ? 'register' : 'login')}>
                        <Input
                            placeholder="Email"
                            icon="icon.png"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <p className="error-message">{errors.email}</p>}
                        <Input
                            placeholder="Password"
                            icon="lock.png"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <p className="error-message">{errors.password}</p>}
                        {isRegistering && (
                            <Input
                                placeholder="Confirm Password"
                                icon="lock.png"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        )}
                        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
                        <Button
                            title={loading ? "Loading..." : (isRegistering ? "Register" : "Log in")}
                            type="submit"  
                            disabled={isDisabled || loading}
                        />
                    </form>
                    <p>{isRegistering ? "Already have an account?" : "Don't have an account yet?"}</p>
                    <Button
                        title={isRegistering ? "Log in" : "Register"}
                        type="secondary"
                        onClick={toggleForm}
                    />
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
