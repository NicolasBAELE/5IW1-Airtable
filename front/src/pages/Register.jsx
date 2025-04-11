import { useState } from "react"
import Input from "../components/Input"
import { Button } from "../components/Button"
import { postJson } from "../services/fetch.services"
import { useNavigate } from "react-router-dom"

export const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fisrtName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const navigate = useNavigate();


    const register = () => {
        const userData = { email, password, first_name: fisrtName, last_name: lastName };
        postJson('user', userData)
            .then(() => alert('Utilisateur créé'))
            .catch(err => alert(err))
    }

    return (
        <>
            <Input placeholder="Entrez votre prénom" label="FirstName" value={fisrtName} setValue={setFirstName} />
            <Input placeholder="Entrez votre nom" label="LastName" value={lastName} setValue={setLastName} />
            <Input placeholder="Entrez votre email" label="Email" value={email} setValue={setEmail} />
            <Input placeholder="Entrez votre mot de passe" type="password" label="Mot de passe" value={password} setValue={setPassword} />
            <Button label={"S'inscrire"} onClick={register} disabled={!email || !password || !fisrtName || !lastName} />
            <Button label={"Se connecter"} onClick={() => navigate('/login')} />
        </>
    )
}