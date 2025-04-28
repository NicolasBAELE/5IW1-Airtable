import React from 'react';
import { Button } from './Button';

const Modal = ({ isOpen, onClose, title, children, actions }) => {
    if (!isOpen) return null;

    // Gestion du clic sur le fond
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50" onClick={handleOverlayClick}>
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                <div className="flex justify-between items-center border-b pb-2">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <Button onClick={onClose} color='grey' className="!text-2xl !p-0 !w-8 !h-8 !min-w-0 !min-h-0">
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
