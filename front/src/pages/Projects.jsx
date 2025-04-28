import { useState } from "react";
import { Button } from "../components/Button";
import ProjectModal from "../components/ProjectModal";
import { useGetProjects } from "../services/useGetProjects";
import { putJson } from "../services/fetch.services";
import { useAuth } from "../contexts/AuthContext";
import ProjectCard from "../components/ProjectCard";
import { useGetComments } from "../services/useGetComments";
import Modal from "../components/Modal";
import { useGetCategories } from "../services/useGetCategories";
import { useGetTechnologies } from "../services/useGetTechnologies";
import { useGetStudents } from "../services/useGetStudents";

export const Projects = () => {
    const { projects, getProjects } = useGetProjects();
    const { userId, isAdmin } = useAuth();
    const { categories } = useGetCategories();
    const { technologies } = useGetTechnologies();
    const { students } = useGetStudents();

    const [project, setProject] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProjects = projects
        .sort((a, b) => new Date(b.creation_date) - new Date(a.creation_date))
        .filter(project =>
            Object.values(project).some(value =>
                String(value).toLowerCase().includes(searchQuery.toLowerCase())
            )
        )
        .filter(project => isAdmin || project.publishing_status === "publié");

    const handleLike = (id) => {
        if (id && !isAdmin && userId) {
            putJson('project/like', { id, user: userId })
                .then(() => getProjects())
        } else {
            alert('ID manquant pour le like !')
        }
    };

    const handlePublishingStatus = (id, publishing_status) => {
        if (id) {
            putJson('project/publishing_status', { id, publishing_status })
                .then(() => getProjects())
        } else {
            alert('ID manquant pour le changement d\'état!')
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        setProject(null);
    };


    return (
        <div className="container mx-auto px-4 py-8">
            <ProjectModal isOpen={isOpen} onClose={handleClose} onSuccess={getProjects} project={project} />
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Projets</h2>
                <Button
                    label="Ajouter un Projet"
                    onClick={() => setIsOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                />
            </div>
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Rechercher des projets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, index) => {
                    const hasAlreadyLiked = project?.likes?.includes(userId);
                    const published = project.publishing_status !== "caché";
                    return (
                        <ProjectCard
                            key={index}
                            project={project}
                            onClick={() => {
                                setProject(project)
                                setIsOpen(true)
                            }}
                            onLike={() => handleLike(project.id)}
                            onPublish={() => handlePublishingStatus(project.id, published ? "caché" : "publié")}
                            hasAlreadyLiked={hasAlreadyLiked}
                            published={published}
                            categories={categories}
                            technologies={technologies}
                            students={students}
                        />
                    );
                })}
            </div>
        </div>
    );
};
