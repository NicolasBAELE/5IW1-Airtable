import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Button } from "./Button";
import { useAuth } from "@/contexts/AuthContext";

export default function ProjectCard({ project, onClick, onLike, onPublish, published, hasAlreadyLiked, categories = [], technologies = [], students = [] }) {
    const { isAdmin } = useAuth()
    
    // Fonctions de mapping
    const getCategoryName = (cat) => {
        if (!cat) return 'Non assignée';
        if (typeof cat === 'object' && cat.category_name) return cat.category_name;
        const found = categories.find(c => c.id === cat);
        return found ? found.category_name : cat;
    };
    const getTechName = (techId) => {
        const found = technologies.find(t => t.id === techId);
        return found ? found.name : techId;
    };
    const getStudentName = (student) => {
        if (!student) return 'Non assigné';
        if (typeof student === 'object' && student.first_name) return `${student.first_name} ${student.last_name}`;
        const found = students.find(s => s.id === student);
        return found ? `${found.first_name} ${found.last_name}` : student;
    };

    // Récupération des infos supplémentaires
    const imageUrl = project.image && project.image[0] && project.image[0].url;
    const categoryDisplay = project.category
        ? Array.isArray(project.category)
            ? project.category.map(getCategoryName).join(', ')
            : getCategoryName(project.category)
        : '';
    const techDisplay = project.technologies
        ? Array.isArray(project.technologies)
            ? project.technologies.map(getTechName)
            : [getTechName(project.technologies)]
        : [];
    const authorDisplay = project.user
        ? Array.isArray(project.user)
            ? project.user.map(getStudentName).join(', ')
            : getStudentName(project.user)
        : 'Auteur inconnu';

    // Description courte
    const shortDesc = project.description && project.description.length > 90
        ? project.description.slice(0, 90) + "..."
        : project.description;

    return (
        <Card
            className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] overflow-hidden ${published ? '' : 'bg-gray-100'}`}
            onClick={onClick}
        >
            {imageUrl && (
                <div className="relative h-48 w-full overflow-hidden">
                    <img 
                        src={imageUrl} 
                        alt={project.name} 
                        className="object-cover w-full h-full transition-transform duration-300 hover:scale-110" 
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <h3 className="text-xl font-bold text-white truncate">{project.name}</h3>
                    </div>
                </div>
            )}
            {!imageUrl && (
                <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-bold truncate">{project.name}</CardTitle>
                </CardHeader>
            )}
            <CardContent className="space-y-4 pt-4">
                {shortDesc && (
                    <CardDescription className="text-sm text-gray-600 line-clamp-2">{shortDesc}</CardDescription>
                )}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="text-blue-600 font-medium">Catégorie :</span>
                        <span className="text-gray-700">{categoryDisplay}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-600 font-medium">Auteur :</span>
                        <span className="text-gray-700">{authorDisplay}</span>
                    </div>
                </div>
                {techDisplay.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {techDisplay.map((tech, idx) => (
                            <span 
                                key={idx} 
                                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium transition-colors hover:bg-blue-200"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                )}
            </CardContent>
            <CardFooter className="border-t bg-gray-50/50">
                <div className="flex items-center justify-between w-full py-2">
                    {isAdmin ? (
                        <Button
                            label={published ? "Cacher" : "Publier"}
                            onClick={e => { e.stopPropagation(); onPublish(project.id); }}
                            className={`${published ? "bg-pink-500" : "bg-gray-500"} text-white hover:opacity-90 transition-opacity`}
                        />
                    ) : (
                        <Button
                            label={hasAlreadyLiked ? "Je n'aime plus" : "J'aime"}
                            onClick={e => { e.stopPropagation(); onLike && onLike(project.id); }}
                            className={`${hasAlreadyLiked ? "bg-pink-500" : "bg-white border-2 border-pink-500"} ${hasAlreadyLiked ? "text-white" : "text-pink-500"} hover:opacity-90 transition-all`}
                        />
                    )}
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">❤️</span>
                        <span className="text-pink-500 font-semibold">{Array.isArray(project.likes) ? project.likes.length : 0}</span>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
} 