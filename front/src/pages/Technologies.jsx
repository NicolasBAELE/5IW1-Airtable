import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { postJson } from "../services/fetch.services";
import { useGetTechnologies } from "../services/useGetTechnologies";
import { useGetProjects } from "../services/useGetProjects";
import Modal from "../components/Modal";
import Input from "../components/Input";

export const Technologies = () => {
    const { technologies, getTechnologies } = useGetTechnologies();
    const { projects } = useGetProjects();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTechnology, setNewTechnology] = useState("");
    const [selectedTech, setSelectedTech] = useState(null);
    const [showProjectsModal, setShowProjectsModal] = useState(false);

    const createTechnology = () => {
        if (newTechnology.trim()) {
            postJson('technology', { name: newTechnology })
                .then(() => {
                    setIsModalOpen(false);
                    setNewTechnology("");
                    getTechnologies();
                })
                .catch(err => alert(err));
        }
    };

    // Projets filtrés par technologie sélectionnée
    const filteredProjects = selectedTech
        ? projects.filter(project =>
            Array.isArray(project.technologies)
                ? project.technologies.includes(selectedTech.id)
                : project.technologies === selectedTech.id
        )
        : [];

    return (
        <div className="container mx-auto p-6 max-w-4xl pt-24">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Technologies</h2>
                <Button
                    label="Ajouter une technologie"
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105"
                />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {technologies.map((technologie, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex items-center justify-center text-lg font-semibold text-blue-700"
                        onClick={() => { setSelectedTech(technologie); setShowProjectsModal(true); }}
                    >
                        {technologie.name}
                    </div>
                ))}
            </div>

            {/* Modale pour ajouter une technologie */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setNewTechnology("");
                }}
                title="Ajouter une technologie"
                actions={
                    <>
                        <Button
                            label="Annuler"
                            onClick={() => {
                                setIsModalOpen(false);
                                setNewTechnology("");
                            }}
                            color="gray"
                        />
                        <Button
                            label="Ajouter"
                            onClick={createTechnology}
                            disabled={!newTechnology.trim()}
                        />
                    </>
                }
            >
                <div className="space-y-4">
                    <Input
                        label="Nom de la technologie"
                        placeholder="Entrez le nom de la technologie"
                        value={newTechnology}
                        setValue={setNewTechnology}
                    />
                </div>
            </Modal>

            {/* Modale pour afficher les projets liés à la technologie sélectionnée */}
            <Modal
                isOpen={showProjectsModal}
                onClose={() => { setShowProjectsModal(false); setSelectedTech(null); }}
                title={selectedTech ? `Projets utilisant : ${selectedTech.name}` : "Projets"}
            >
                {filteredProjects.length === 0 ? (
                    <p>Aucun projet n'utilise cette technologie.</p>
                ) : (
                    <ul className="space-y-4">
                        {filteredProjects.map((project, idx) => (
                            <li key={idx} className="border-b pb-2">
                                <span className="font-bold text-gray-800">{project.name}</span>
                                <div className="text-sm text-gray-600">{project.description}</div>
                            </li>
                        ))}
                    </ul>
                )}
            </Modal>
        </div>
    );
};
