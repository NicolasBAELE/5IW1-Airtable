import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Button } from "./Button";
import { useAuth } from "@/contexts/AuthContext";

export default function ProjectCard({ project, onClick, onLike, onPublish, published, hasAlreadyLiked, categories = [], technologies = [], students = [] }) {
    const { isAdmin } = useAuth()
    // Fonctions de mapping
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
            className={`cursor-pointer transition-shadow duration-300 hover:shadow-xl overflow-hidden ${published ? '' : 'bg-gray-200'}`}
            onClick={onClick}
        >
            {imageUrl && (
                <div className="h-36 w-full overflow-hidden rounded-t-xl mb-2">
                    <img src={imageUrl} alt={project.name} className="object-cover w-full h-full" />
                </div>
            )}
            <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold truncate">{project.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <CardDescription className="truncate text-sm text-gray-600">{shortDesc}</CardDescription>
                {categoryDisplay && (
                    <div className="text-xs text-blue-600 font-medium truncate">Catégorie : {categoryDisplay}</div>
                )}
                {techDisplay.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                        {techDisplay.map((tech, idx) => (
                            <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs truncate max-w-[90px]">{tech}</span>
                        ))}
                    </div>
                )}
                <div className="text-xs text-gray-500 mt-2 truncate">Auteur : {authorDisplay}</div>
            </CardContent>
            <CardFooter>
                <div className="flex items-center gap-3 w-full">
                    {isAdmin &&
                        <Button
                            label={published ? "Cacher" : "Publier"}
                            onClick={e => { e.stopPropagation(); onLike && onPublish(project.id); }}
                            className={published ? "bg-pink-300 text-white" : "bg-white text-pink-500 border border-pink-300"}
                            icon={<span role="img" aria-label="aimer">💗</span>}
                        />
                    }
                    {!isAdmin &&
                        <Button
                            label={hasAlreadyLiked ? "Retirer le like" : "Liker"}
                            onClick={e => { e.stopPropagation(); onLike && onLike(project.id); }}
                            className={hasAlreadyLiked ? "bg-pink-300 text-white" : "bg-white text-pink-500 border border-pink-300"}
                            icon={<span role="img" aria-label="aimer">💗</span>}
                        />
                    }
                    <span className="flex items-center text-pink-500 text-sm font-semibold select-none">
                        <span role="img" aria-label="likes">❤️</span>&nbsp;{Array.isArray(project.likes) ? project.likes.length : 0}
                    </span>
                </div>
            </CardFooter>
        </Card>
    );
} 