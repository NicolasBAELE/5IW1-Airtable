import { useState } from "react";
import { Button } from "../components/Button";
import ProjectModal from "../components/ProjectModal";
import { useGetProjects } from "../services/useGetProjects";
import { putJson } from "../services/fetch.services";
import { useAuth } from "../contexts/AuthContext";

export const Projects = () => {
    const { projects, getProjects } = useGetProjects();
    const { userId, isAdmin } = useAuth()

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
        if (id && !isAdmin && userId) {
            putJson('project/like', { id, user: userId })
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
                    const hasAlreadyLiked = project?.likes?.includes(userId)

                    return (
                        <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            {project.image && project.image[0] && (
                                <div className="relative h-48 overflow-hidden">
                                    <img 
                                        src={project.image[0].url} 
                                        alt={project.title || "Project image"} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            
                            <div className="p-6">
                                <div className="space-y-4">
                                    {Object.entries(project).map(([key, value]) => {
                                        if (key === 'image' || key === 'id' || key === 'likes') return null;
                                        
                                        const isArrayOfObjects = Array.isArray(value) && value.length > 0 && typeof value[0] === 'object';
                                        
                                        if (isArrayOfObjects) return null;

                                        return (
                                            <div key={key} className="flex flex-col">
                                                <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                                                    {key.replace(/_/g, ' ')}
                                                </span>
                                                <span className="text-gray-800 mt-1">
                                                    {value}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="mt-6 flex flex-wrap gap-2">
                                    {!isAdmin && !hasAlreadyLiked && (
                                        <Button 
                                            label="Liker" 
                                            onClick={() => handleLike(project.id)}
                                            className="bg-pink-500 hover:bg-pink-600 text-white"
                                        />
                                    )}
                                    {isAdmin && (
                                        <>
                                            <Button 
                                                label="Modifier" 
                                                onClick={() => handleUpdate(project)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white"
                                            />
                                            {project.publishing_status !== "caché" && (
                                                <Button 
                                                    label="Cacher" 
                                                    onClick={() => handlePublishingStatus(project.id, "caché")}
                                                    className="bg-gray-500 hover:bg-gray-600 text-white"
                                                />
                                            )}
                                            {project.publishing_status !== "publié" && (
                                                <Button 
                                                    label="Publier" 
                                                    onClick={() => handlePublishingStatus(project.id, "publié")}
                                                    className="bg-green-500 hover:bg-green-600 text-white"
                                                />
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
