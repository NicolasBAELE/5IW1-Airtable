import { postJson } from "../services/fetch.services";
import { Button } from "../components/Button";
import { useGetStudents } from "../services/useGetStudents";

export const Students = () => {
    const { students, getStudents } = useGetStudents()

    const createStudent = () => {
        const last_name = prompt("Entrez le nom", "");
        const first_name = prompt("Entrez le prénom", "");
        const email = prompt("Entrez l'email", "");

        if (last_name && first_name && email) {
            postJson('student', { last_name, first_name, email })
                .then(() => {
                    alert('Étudiant créé');
                    getStudents();
                })
                .catch(err => alert(err));
        } else {
            alert('Tous les champs doivent être renseignés');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <Button
                label="Ajouter un Étudiant"
                onClick={createStudent}
                className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            />
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Étudiants</h2>
            <div className="grid gap-4">
                {students.map((studentObjects, index) => (
                    <div key={index} className="bg-white shadow rounded-lg p-4">
                        {Object.keys(studentObjects).map(key => (
                            <div key={key} className="flex justify-between border-b pb-2">
                                <span className="font-semibold text-gray-600">{key}:</span>
                                <span className="text-gray-800">{studentObjects[key]}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
