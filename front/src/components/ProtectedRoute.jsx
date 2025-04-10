import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const ProtectedRoute = ({ element: Component, ...rest }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
        return <Navigate to="/login" />;
    }

    return <Component {...rest} />;
};
