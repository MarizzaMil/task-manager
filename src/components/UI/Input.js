import React, { useState } from 'react';

const Input = ({ placeholder, type = "text", icon, value, onChange }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(type === "password" ? false : true);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prevState => !prevState);
    };

    return (
        <div className="input-container">
            {icon && <img src={require(`../../assets/icons/${icon}`)} alt="icon" className="input-icon" />}
            <input
                type={type === "password" && !isPasswordVisible ? "password" : "text"}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="input-field"
            />
            {type === "password" && (
                <img 
                    src={require(`../../assets/icons/view.png`)} 
                    alt="Toggle Password Visibility"
                    className="input-icon password-icon"
                    onClick={togglePasswordVisibility} 
                />
            )}
        </div>
    );
};

export default Input;
