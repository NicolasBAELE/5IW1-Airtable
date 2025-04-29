import { useState } from "react";
import { Button } from "../components/Button";
import ProjectModal from "../components/ProjectModal";
import { useGetProjects } from "../services/useGetProjects";
import { postJson, putJson } from "../services/fetch.services";
import { useAuth } from "../contexts/AuthContext";
import ProjectCard from "../components/ProjectCard";
import { useGetCategories } from "../services/useGetCategories";
import { useGetTechnologies } from "../services/useGetTechnologies";
import { useGetStudents } from "../services/useGetStudents";
import { motion } from "framer-motion";

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

    const handleComment = (id, comment) => {
        postJson('comment', {
            comment,
            project: id,
            user: userId
        }).finally(() => getProjects())
    }

    const handleClose = () => {
        setIsOpen(false);
        setProject(null);
    };


    return (
        <div className="container mx-auto px-4 py-8">
            <ProjectModal isOpen={isOpen} onClose={handleClose} onSuccess={getProjects} project={project} />
            {isAdmin && <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Projets</h2>
                <Button
                    label="Ajouter un Projet"
                    onClick={() => setIsOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                />
            </div>}
            {!isAdmin &&
                <div className="w-full max-w-4xl mx-auto px-4 pt-24 pb-12">
                    <motion.h1
                        className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-pink-500 to-purple-500 bg-clip-text text-transparent drop-shadow-lg text-center"
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Découvrez les portfolios des élèves
                    </motion.h1>
                    <motion.p
                        className="text-lg text-gray-700 max-w-2xl mx-auto mb-10 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        Bienvenue sur la plateforme qui met en avant les projets, compétences et réalisations des étudiants de l'école. Explorez, recherchez et soutenez la créativité de nos talents !
                    </motion.p>
                </div>
            }
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
                            onComment={handleComment}
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
