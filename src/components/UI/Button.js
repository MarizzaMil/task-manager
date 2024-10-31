import React from 'react';

const Button = ({ title, onClick, disabled, type = "submit" }) => {
    return (
        <button
            className={`button ${type}`}
            onClick={onClick}
            disabled={disabled} 
        >
            {title}
        </button>
    );
};

export default Button;
