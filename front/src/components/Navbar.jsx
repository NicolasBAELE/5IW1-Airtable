import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { useAuth } from './AuthContext';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth()
    const navigate = useNavigate()

    return (
        <nav className="bg-gray-800 p-4">
            <ul className="flex space-x-4">
                <li>
                    <Button label={"Home"} onClick={() => navigate('/')} />
                </li>
                {!isAuthenticated && <>
                    <li>
                        <Button label={"S'inscrire"} onClick={() => navigate('/register')} />
                    </li>
                    <li>
                        <Button label={"Se connecter"} onClick={() => navigate('/login')} />
                    </li>
                </>}
                <li>
                    <Button label={"Etudiants"} onClick={() => navigate('/students')} />
                </li>
                {isAuthenticated && <li>
                    <Button label={"Se déconnecter"} onClick={() => logout()} />
                </li>}
            </ul>
        </nav>
    );
};

export default Navbar;
