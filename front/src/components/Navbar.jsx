import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { useAuth } from '../contexts/AuthContext';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const { isAuthenticated, logout, isAdmin } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center whitespace-nowrap">
                {/* Logo */}
                <div className="text-xl font-bold text-gray-800 pr-2">
                    <span className="text-red-500">My</span>Portfolio
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Desktop menu */}
                <ul className="hidden md:flex space-x-6 items-center overflow-scroll gap-1">
                    <li>
                        <Button label="Home" onClick={() => navigate('/')} color="gray" />
                    </li>
                    {!isAuthenticated && (
                        <>
                            <li>
                                <Button label="S'inscrire" onClick={() => navigate('/register')} color="blue" />
                            </li>
                            <li>
                                <Button label="Se connecter" onClick={() => navigate('/login')} color="blue" />
                            </li>
                        </>
                    )}
                    {isAuthenticated &&
                        <>
                            <li>
                                <Button
                                    label="Projets"
                                    onClick={() => navigate('/projects')}
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
                    }
                    {isAuthenticated && isAdmin && (
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
                                    label="Étudiants"
                                    onClick={() => navigate('/students')}
                                    color="gray"
                                />
                            </li>
                        </>
                    )}
                </ul>
            </div>

            {/* Mobile menu dropdown */}
            {menuOpen && (
                <ul className="md:hidden mt-4 space-y-4">
                    <li><Button label="Home" onClick={() => navigate('/')} color="gray" /></li>
                    {!isAuthenticated && (
                        <>
                            <li><Button label="S'inscrire" onClick={() => navigate('/register')} color="blue" /></li>
                            <li><Button label="Se connecter" onClick={() => navigate('/login')} color="blue" /></li>
                        </>
                    )}
                    {isAuthenticated && (
                        <>
                            <li><Button label="Commentaires" onClick={() => navigate('/comments')} color="gray" /></li>
                            <li><Button label="Technologies" onClick={() => navigate('/technologies')} color="gray" /></li>
                            <li><Button label="Catégories" onClick={() => navigate('/categories')} color="gray" /></li>
                            <li><Button label="Projets" onClick={() => navigate('/projects')} color="gray" /></li>
                            <li><Button label="Étudiants" onClick={() => navigate('/students')} color="gray" /></li>
                            <li><Button label="Se déconnecter" onClick={logout} color="red" /></li>
                        </>
                    )}
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
