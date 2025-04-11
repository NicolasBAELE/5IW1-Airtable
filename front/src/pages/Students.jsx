import { Button } from "../components/Button";
import { useGetStudents } from "../services/useGetStudents";

export const Students = () => {
    const { students } = useGetStudents()

    return (
        <div className="container mx-auto p-4">
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
