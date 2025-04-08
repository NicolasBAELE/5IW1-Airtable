import { useEffect, useState } from "react"
import { getJson, postJson } from "../services/fetch.services"
import { Button } from "../components/Button"

export const Students = () => {
    const [students, setStudents] = useState([])

    const getStudents = () => {
        getJson('student')
            .then(setStudents)
    }

    useEffect(() => {
        getStudents()
    }, [])

    const createStudent = () => {
        const last_name = prompt("Entrez le nom", "");
        const first_name = prompt("Entrez le prenom", "");
        const email = prompt("Entrez l'email", "");
        console.log(last_name, first_name, email);
        if (last_name && first_name && email) {
            postJson('student', { last_name, first_name, email })
                .then(() => {
                    alert('Etudiant créé')
                    getStudents()
                })
                .catch(err => alert(err))
        } else {
            alert('Tous les champs doivent être renseignés')
        }

    }

    return (
        <>
            <Button label={"Ajouter un Etudiant"} onClick={() => createStudent()} />
            <div>Etudiants</div>
            {students.map(studentObjects => Object.keys(studentObjects).map(key => <div key={studentObjects[key]}>{key}: {studentObjects[key]}</div>))}
        </>
    )
}