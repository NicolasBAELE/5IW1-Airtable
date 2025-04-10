import React from 'react';

const Input = ({ value, setValue, type = "text", placeholder = "", label = "" }) => {

    const handleInputChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div className="mb-4">
            {label && <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>}
            <input
                type={type}
                value={value}
                onChange={handleInputChange}
                placeholder={placeholder}
                className="mt-1 p-2 w-full border rounded-md" />
        </div>
    );
};

export default Input;
