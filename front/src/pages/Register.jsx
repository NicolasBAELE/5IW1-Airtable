import { useState } from "react"
import Input from "../components/Input"
import { Button } from "../components/Button"
import { postJson } from "../services/fetch.services"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"

export const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fisrtName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const navigate = useNavigate();
    const { login } = useAuth()


    const register = () => {
        const userData = { email, password, first_name: fisrtName, last_name: lastName };
        postJson('user', userData)
            .then(() => login({ email, password }))
            .catch(err => alert(err))
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Créer un compte</h2>
                <div className="space-y-4">
                    <Input placeholder="Entrez votre prénom" label="Prénom" value={fisrtName} setValue={setFirstName} />
                    <Input placeholder="Entrez votre nom" label="Nom" value={lastName} setValue={setLastName} />
                    <Input placeholder="Entrez votre email" label="Email" value={email} setValue={setEmail} />
                    <Input placeholder="Entrez votre mot de passe" type="password" label="Mot de passe" value={password} setValue={setPassword} />
                </div>
                <div className="mt-6 flex flex-col gap-3">
                    <Button label={"S'inscrire"} onClick={register} disabled={!email || !password || !fisrtName || !lastName} />
                    <Button label={"Se connecter"} onClick={() => navigate('/login')} color="gray" />
                </div>
            </div>
        </div>
    )
}