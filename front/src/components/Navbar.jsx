import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from './Button';
import { useAuth } from '../contexts/AuthContext';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const { isAuthenticated, logout, isAdmin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    // Définir les liens principaux
    const mainLinks = [
        { label: 'Home', path: '/' },
        { label: 'Projets', path: '/projects', auth: true },
    ];
    const adminLinks = [
        { label: 'Commentaires', path: '/comments' },
        { label: 'Technologies', path: '/technologies' },
        { label: 'Catégories', path: '/categories' },
        { label: 'Étudiants', path: '/students' },
    ];

    return (
        <nav className="bg-gradient-to-r from-blue-50 via-pink-100 to-purple-100 shadow-md px-4 py-2 sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo modernisé */}
                <div
                    className="text-2xl font-extrabold tracking-tight flex items-center gap-2 cursor-pointer select-none"
                    onClick={() => navigate('/')}
                >
                    <span className="bg-gradient-to-r from-pink-500 to-blue-600 bg-clip-text text-transparent">My</span>
                    <span className="text-gray-800">Portfolio</span>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
                        {menuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Desktop menu */}
                <ul className="hidden md:flex space-x-2 items-center">
                    {mainLinks.map(link => (
                        (!link.auth || isAuthenticated) && (
                            <li key={link.path}>
                                <button
                                    onClick={() => navigate(link.path)}
                                    className={`px-4 py-2 rounded-full font-medium transition-all duration-200
                                        ${location.pathname === link.path ? 'bg-blue-600 text-white shadow-md' : 'bg-white/70 text-blue-700 hover:bg-blue-100'}
                                    `}
                                >
                                    {link.label}
                                </button>
                            </li>
                        )
                    ))}
                    {!isAuthenticated && (
                        <>
                            <li>
                                <button
                                    onClick={() => navigate('/register')}
                                    className="px-4 py-2 rounded-full font-medium bg-pink-500 text-white hover:bg-pink-600 transition-all duration-200 shadow-sm"
                                >S'inscrire</button>
                            </li>
                            <li>
                                <button
                                    onClick={() => navigate('/login')}
                                    className="px-4 py-2 rounded-full font-medium bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 shadow-sm"
                                >Se connecter</button>
                            </li>
                        </>
                    )}
                    {isAuthenticated && (
                        <>
                            <li>
                                <button
                                    onClick={logout}
                                    className="px-4 py-2 rounded-full font-medium bg-red-500 text-white hover:bg-red-600 transition-all duration-200 shadow-sm"
                                >Se déconnecter</button>
                            </li>
                        </>
                    )}
                    {isAuthenticated && isAdmin && adminLinks.map(link => (
                        <li key={link.path}>
                            <button
                                onClick={() => navigate(link.path)}
                                className={`px-4 py-2 rounded-full font-medium transition-all duration-200
                                    ${location.pathname === link.path ? 'bg-pink-500 text-white shadow-md' : 'bg-white/70 text-pink-700 hover:bg-pink-100'}
                                `}
                            >
                                {link.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Mobile menu dropdown */}
            {menuOpen && (
                <ul className="md:hidden mt-4 space-y-3 bg-white/90 rounded-xl shadow-lg p-4">
                    {mainLinks.map(link => (
                        (!link.auth || isAuthenticated) && (
                            <li key={link.path}>
                                <button
                                    onClick={() => { setMenuOpen(false); navigate(link.path); }}
                                    className={`block w-full text-left px-4 py-2 rounded-full font-medium transition-all duration-200
                                        ${location.pathname === link.path ? 'bg-blue-600 text-white shadow-md' : 'bg-white/70 text-blue-700 hover:bg-blue-100'}
                                    `}
                                >
                                    {link.label}
                                </button>
                            </li>
                        )
                    ))}
                    {!isAuthenticated && (
                        <>
                            <li>
                                <button
                                    onClick={() => { setMenuOpen(false); navigate('/register'); }}
                                    className="block w-full text-left px-4 py-2 rounded-full font-medium bg-pink-500 text-white hover:bg-pink-600 transition-all duration-200 shadow-sm"
                                >S'inscrire</button>
                            </li>
                            <li>
                                <button
                                    onClick={() => { setMenuOpen(false); navigate('/login'); }}
                                    className="block w-full text-left px-4 py-2 rounded-full font-medium bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 shadow-sm"
                                >Se connecter</button>
                            </li>
                        </>
                    )}
                    {isAuthenticated && (
                        <>
                            <li>
                                <button
                                    onClick={() => { setMenuOpen(false); logout(); }}
                                    className="block w-full text-left px-4 py-2 rounded-full font-medium bg-red-500 text-white hover:bg-red-600 transition-all duration-200 shadow-sm"
                                >Se déconnecter</button>
                            </li>
                        </>
                    )}
                    {isAuthenticated && isAdmin && adminLinks.map(link => (
                        <li key={link.path}>
                            <button
                                onClick={() => { setMenuOpen(false); navigate(link.path); }}
                                className={`block w-full text-left px-4 py-2 rounded-full font-medium transition-all duration-200
                                    ${location.pathname === link.path ? 'bg-pink-500 text-white shadow-md' : 'bg-white/70 text-pink-700 hover:bg-pink-100'}
                                `}
                            >
                                {link.label}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
