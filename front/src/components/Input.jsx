import React from 'react';

const Input = ({ value, setValue, type = "text", placeholder = "", label = "" }) => {

    const handleInputChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div>
            {label && <label>{label}</label>}
            <input
            
                type={type}
                value={value}
                onChange={handleInputChange}
                placeholder={placeholder}
            />
        </div>
    );
};

export default Input;
