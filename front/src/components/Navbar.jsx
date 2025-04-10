import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <nav className="bg-white shadow-md p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-xl font-bold text-gray-800">
                    <span className="text-red-500">My</span>Portfolio
                </div>
                <ul className="flex space-x-6">
                    <li>
                        <Button
                            label="Home"
                            onClick={() => navigate('/')}
                            color="gray"
                        />
                    </li>
                    {!isAuthenticated && (
                        <>
                            <li>
                                <Button
                                    label="S'inscrire"
                                    onClick={() => navigate('/register')}
                                    color="blue"
                                />
                            </li>
                            <li>
                                <Button
                                    label="Se connecter"
                                    onClick={() => navigate('/login')}
                                    color="blue"
                                />
                            </li>
                        </>
                    )}
                    {isAuthenticated && (
                        <>
                            <li>
                                <Button
                                    label="Commentaires"
                                    onClick={() => navigate('/comments')}
                                    color="gray"
                                />
                            </li>
                            <li>
                                <Button
                                    label="Technologies"
                                    onClick={() => navigate('/technologies')}
                                    color="gray"
                                />
                            </li>
                            <li>
                                <Button
                                    label="Catégories"
                                    onClick={() => navigate('/categories')}
                                    color="gray"
                                />
                            </li>
                            <li>
                                <Button
                                    label="Projets"
                                    onClick={() => navigate('/projects')}
                                    color="gray"
                                />
                            </li>
                            <li>
                                <Button
                                    label="Étudiants"
                                    onClick={() => navigate('/students')}
                                    color="gray"
                                />
                            </li>
                            <li>
                                <Button
                                    label="Se déconnecter"
                                    onClick={() => logout()}
                                    color="red"
                                />
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
