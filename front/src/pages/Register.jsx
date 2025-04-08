import { useState } from "react"
import Input from "../components/Input"
import { Button } from "../components/Button"
import { postJson } from "../services/fetch.services"
import { useNavigate } from "react-router-dom"

export const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const navigate = useNavigate();


    const register = () => {
        const userData = { email, password, name };
        postJson('admin', userData)
            .then(() => alert('Utilisateur créé'))
            .catch(err => alert(err))
    }

    return (
        <>
            <Input placeholder="Entrez votre nom" label="Name" value={name} setValue={setName} />
            <Input placeholder="Entrez votre email" label="Email" value={email} setValue={setEmail} />
            <Input placeholder="Entrez votre mot de passe" type="password" label="Mot de passe" value={password} setValue={setPassword} />
            <Button label={"S'inscrire"} onClick={register} disabled={!email || !password || !name} />
            <Button label={"Se connecter"} onClick={() => navigate('/login')} />
        </>
    )
}