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
    const { comments } = useGetComments();
    const { categories } = useGetCategories();
    const { technologies } = useGetTechnologies();
    const { students } = useGetStudents();

    const [project, setProject] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [detailOpen, setDetailOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

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

    const handleUpdate = (project) => {
        setProject(project);
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
        setProject(null);
    };

    // Ouvre la modale de détail
    const openDetail = (project) => {
        setSelectedProject(project);
        setDetailOpen(true);
    };
    const closeDetail = () => {
        setDetailOpen(false);
        setSelectedProject(null);
    };

    // Filtrer les commentaires liés au projet sélectionné
    const projectComments = selectedProject
        ? comments.filter(c => c.project && c.project[0] === selectedProject.id)
        : [];

    // Mapping des noms pour la modale de détail
    const getCategoryName = (catId) => {
        const found = categories.find(c => c.id === catId);
        return found ? found.category_name : catId;
    };
    const getTechName = (techId) => {
        const found = technologies.find(t => t.id === techId);
        return found ? found.name : techId;
    };
    const getStudentName = (studentId) => {
        const found = students.find(s => s.id === studentId);
        return found ? `${found.first_name} ${found.last_name}` : studentId;
    };

    // Pour l'affichage dans la modale
    const categoryDisplay = selectedProject && selectedProject.category
        ? Array.isArray(selectedProject.category)
            ? selectedProject.category.map(getCategoryName).join(', ')
            : getCategoryName(selectedProject.category)
        : '';
    const techDisplay = selectedProject && selectedProject.technologies
        ? Array.isArray(selectedProject.technologies)
            ? selectedProject.technologies.map(getTechName)
            : [getTechName(selectedProject.technologies)]
        : [];
    const authorDisplay = selectedProject && selectedProject.user
        ? Array.isArray(selectedProject.user)
            ? selectedProject.user.map(getStudentName).join(', ')
            : getStudentName(selectedProject.user)
        : 'Auteur inconnu';

    return (
        <div className="container mx-auto px-4 py-8">
            <ProjectModal isOpen={isOpen} onClose={handleClose} onSuccess={getProjects} project={project} />
            <Modal isOpen={detailOpen} onClose={closeDetail} title={selectedProject?.name || "Détail du projet"}>
                {selectedProject && (
                    <>
                        <button
                            onClick={closeDetail}
                            className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-700 focus:outline-none z-50"
                            aria-label="Fermer"
                            style={{ background: 'none', border: 'none' }}
                        >
                            &times;
                        </button>
                        <div className="space-y-6">
                            {selectedProject.image && selectedProject.image[0] && (
                                <div className="w-full flex justify-center mb-2">
                                    <img src={selectedProject.image[0].url} alt={selectedProject.name} className="object-cover rounded-lg max-h-56" />
                                </div>
                            )}
                            <div>
                                <h3 className="font-bold text-lg mb-1">Nom du projet</h3>
                                <p>{selectedProject.name}</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">Description</h3>
                                <p>{selectedProject.description}</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">Catégorie</h3>
                                <p>{categoryDisplay}</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">Technologies</h3>
                                <div className="flex flex-wrap gap-2">
                                    {techDisplay.map((tech, idx) => (
                                        <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">{tech}</span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">Auteur</h3>
                                <p>{authorDisplay}</p>
                            </div>
                            {selectedProject.project_link && (
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Lien du projet</h3>
                                    <a href={selectedProject.project_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline break-all">{selectedProject.project_link}</a>
                                </div>
                            )}
                            {selectedProject.creation_date && (
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Date de création</h3>
                                    <p>{new Date(selectedProject.creation_date).toLocaleDateString()}</p>
                                </div>
                            )}
                            <div>
                                <h3 className="font-bold text-lg mb-2">Commentaires</h3>
                                {projectComments.length === 0 ? (
                                    <p>Aucun commentaire pour ce projet.</p>
                                ) : (
                                    <ul className="space-y-2">
                                        {projectComments.map((comment, idx) => (
                                            <li key={idx} className="border-b pb-2">
                                                <span className="font-medium text-gray-700">{comment.userDetails ? `${comment.userDetails.first_name} ${comment.userDetails.last_name}` : 'Anonyme'} :</span>
                                                <span className="ml-2">{comment.comment}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </Modal>
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
                    return (
                        <ProjectCard
                            key={index}
                            project={project}
                            onClick={() => openDetail(project)}
                            onLike={() => handleLike(project.id)}
                            hasAlreadyLiked={hasAlreadyLiked}
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
