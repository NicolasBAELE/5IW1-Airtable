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
        <>
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
            <Button
                label={"Se connecter"}
                onClick={() => login({ email, password })}
                disabled={!email || !password}
            />
            <Button
                label={"S'inscrire"}
                onClick={() => navigate("/register")}
            />
        </>
    );
};
