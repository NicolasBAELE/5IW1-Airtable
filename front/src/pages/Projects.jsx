import { useState } from "react";
import { Button } from "../components/Button";
import ProjectModal from "../components/ProjectModal";
import { useGetProjects } from "../services/useGetProjects";
import { putJson } from "../services/fetch.services";

export const Projects = () => {
    const { projects, getProjects } = useGetProjects();

    const [project, setProject] = useState(null)
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProjects = projects
        .sort((a, b) => new Date(b.creation_date) - new Date(a.creation_date))
        .filter(project =>
            Object.values(project).some(value =>
                String(value).toLowerCase().includes(searchQuery.toLowerCase())
            )
        );

    const handleLike = (id) => {
        if (id) {
            putJson('project/like', { id })
                .then(() => getProjects())
        } else {
            alert('ID manquant pour le like !')
        }
    }

    const handlePublishingStatus = (id, publishing_status) => {
        if (id) {
            putJson('project/publishing_status', { id, publishing_status })
                .then(() => getProjects())
        } else {
            alert('ID manquant pour le changement d\'état!')
        }
    }

    const handleUpdate = (project) => {
        setProject(project)
        setIsOpen(true)
    }

    const handleClose = () => {
        setIsOpen(false)
        setProject(null)
    }
    console.log(filteredProjects);


    return (
        <div className="container mx-auto p-4">
            <ProjectModal isOpen={isOpen} onClose={handleClose} onSuccess={getProjects} project={project} />
            <Button
                label="Ajouter un Projet"
                onClick={() => setIsOpen(true)}
            />
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Projets</h2>
            <input
                type="text"
                placeholder="Rechercher des projets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-4 p-2 w-full border rounded-md"
            />
            <div className="grid gap-4">
                {filteredProjects.map((project, index) => (
                    <div key={index} className="bg-white shadow rounded-lg p-4">
                        {Object.keys(project).map(key => {
                            const value = project[key];

                            // Vérifie si la valeur est un tableau d'objets
                            const isArrayOfObjects = Array.isArray(value) && value.length > 0 && typeof value[0] === 'object';

                            return (
                                <div key={key} className="flex flex-col border-b pb-2">
                                    <span className="font-semibold text-gray-600">{key}:</span>
                                    {isArrayOfObjects ? (
                                        // Si c'est un tableau d'objets, affiche chaque objet
                                        <div className="pl-4">
                                            {value.map((item, subIndex) => (
                                                <div key={subIndex} className="flex flex-col border-b pb-2">
                                                    {Object.keys(item).map(subKey => (
                                                        <div key={subKey} className="flex justify-between">
                                                            <span className="font-semibold text-gray-500">{subKey}:</span>
                                                            <span className="text-gray-700">{item[subKey]}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        // Sinon, affiche la valeur directement
                                        <span className="text-gray-800">{value}</span>
                                    )}
                                </div>
                            );
                        })}

                        <Button label="Liker" onClick={() => handleLike(project.id)} />
                        <Button label="Modifier" onClick={() => handleUpdate(project)} />
                        {project.publishing_status !== "caché" && <Button label="Cacher" onClick={() => handlePublishingStatus(project.id, "caché")} />}
                        {project.publishing_status !== "publié" && <Button label="Publier" onClick={() => handlePublishingStatus(project.id, "publié")} />}
                    </div>
                ))}
            </div>
        </div>
    );
};
