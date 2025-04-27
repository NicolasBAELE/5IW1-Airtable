import { useState } from "react";
import Input from "../components/Input";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Connexion</h2>
                <div className="space-y-4">
                    <Input
                        placeholder="Entrez votre email"
                        label="Email"
                        value={email}
                        setValue={setEmail}
                    />
                    <Input
                        placeholder="Entrez votre mot de passe"
                        type="password"
                        label="Mot de passe"
                        value={password}
                        setValue={setPassword}
                    />
                </div>
                <div className="mt-6 flex flex-col gap-3">
                    <Button
                        label={"Se connecter"}
                        onClick={() => login({ email, password })}
                        disabled={!email || !password}
                    />
                    <Button
                        label={"S'inscrire"}
                        onClick={() => navigate("/register")}
                        color="gray"
                    />
                </div>
            </div>
        </div>
    );
};
