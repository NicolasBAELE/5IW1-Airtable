import { Button } from "../components/Button";
import { useGetStudents } from "../services/useGetStudents";

export const Students = () => {
    const { students } = useGetStudents()

    return (
        <div className="container mx-auto p-6 max-w-4xl pt-24">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Étudiants</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {students.map((student, index) => (
                    <div 
                        key={index} 
                        className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <div className="text-xl font-semibold text-blue-700 mb-2 text-center">
                            {student.first_name} {student.last_name}
                        </div>
                        <div className="text-gray-600 text-sm mb-1 text-center">
                            {student.email}
                        </div>
                        {/* Ajoute ici d'autres infos utiles si besoin */}
                    </div>
                ))}
            </div>
        </div>
    );
};
