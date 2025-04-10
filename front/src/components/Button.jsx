import React from 'react';

export const Button = ({ color = 'blue', disabled, label, onClick }) => {
    const colorClasses = {
        blue: 'bg-blue-500 hover:bg-blue-700 text-white',
        red: 'bg-red-500 hover:bg-red-700 text-white',
        green: 'bg-green-500 hover:bg-green-700 text-white',
        gray: 'bg-gray-300 hover:bg-gray-400 text-gray-800',
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`px-4 py-2 rounded-md font-semibold transition duration-300 ${colorClasses[color]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {label}
        </button>
    );
};
