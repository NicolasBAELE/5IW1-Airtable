import React from 'react';
import { Button } from './Button';

const Modal = ({ isOpen, onClose, title, children, actions }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center border-b pb-2">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <Button onClick={onClose} color='grey'>
                        &times;
                    </Button>
                </div>
                <div className="mt-4">
                    {children}
                </div>
                <div className="flex justify-end mt-4 space-x-2">
                    {actions}
                </div>
            </div>
        </div>
    );
};

export default Modal;
