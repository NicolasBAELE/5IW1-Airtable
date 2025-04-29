import React, { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import Modal from './Modal';
import { postJson, putJson } from '../services/fetch.services';
import { useGetStudents } from '../services/useGetStudents';
import Input from './Input';
import { useGetCategories } from '../services/useGetCategories';
import { useGetTechnologies } from '../services/useGetTechnologies';
import { useAuth } from '@/contexts/AuthContext';

const ProjectModal = ({ isOpen, onClose, onSuccess, project = null }) => {
    const { isAdmin } = useAuth();
    const [projectName, setProjectName] = useState('');
    const { students } = useGetStudents();
    const [selectedStudent, setSelectedStudent] = useState('');
    const { categories } = useGetCategories();
    const [selectedCategory, setSelectedCategory] = useState('');
    const { technologies } = useGetTechnologies();
    const [selectedTechnologies, setSelectedTechnologies] = useState([]);
    const [description, setDescription] = useState('');
    const [projectLink, setProjectsLink] = useState('');
    const [file, setFile] = useState(null);

    useEffect(() => {
        if (project) {
            setProjectName(project.name || '');
            setSelectedStudent(project.user || '');
            setSelectedCategory(project.category || '');
            setSelectedTechnologies(project.technologies || []);
            setDescription(project.description || '');
            setProjectsLink(project.project_link || '');
        }
    }, [project]);

    const handleCreateProject = async () => {
        if (projectName && selectedStudent && description && selectedCategory && selectedTechnologies.length > 0) {
            const method = project ? putJson : postJson;
            const payload = {
                id: project?.id,
                name: projectName,
                student: selectedStudent,
                category: selectedCategory,
                description,
                project_link: projectLink,
                technologies: selectedTechnologies,
            };

            if (file) {
                payload.image_url = await handleUpload();
            } else if (project?.image) {
                console.log(project.image[0].url);

                payload.image_url = project.image[0].url
            }
            method('project', payload).finally(onSuccess);
            setProjectName('');
            setSelectedStudent('');
            setDescription('');
            setProjectsLink('');
            setSelectedCategory('');
            setSelectedTechnologies([]);
            setFile(null);
            onClose();
        } else {
            alert('Veuillez remplir tous les champs.');
        }
    };

    const handleTagClick = (technologyId) => {
        if (!selectedTechnologies.includes(technologyId)) {
            setSelectedTechnologies([...selectedTechnologies, technologyId]);
        }
    };

    const handleRemoveTag = (technologyId) => {
        setSelectedTechnologies(selectedTechnologies.filter(id => id !== technologyId));
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', import.meta.env.VITE_UPLOAD_PRESET);

        const cloudName = import.meta.env.VITE_CLOUD_NAME;

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            console.log('Image uploaded');
            return data.secure_url;
        } catch (err) {
            console.error('Erreur upload:', err);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`${project ? "Modifier" : "Créer"} un Projet`}
            actions={
                isAdmin ? (
                    <>
                        <Button label="Annuler" onClick={onClose} color="gray" />
                        <Button label={project ? "Modifier" : "Créer"} onClick={handleCreateProject} />
                    </>
                ) : null
            }
            headerImage={((file && file.type?.startsWith('image')) || project?.image) ? (
                <div className="flex justify-center mb-6 mt-4">
                    <div className="bg-gradient-to-br from-blue-100 via-pink-100 to-purple-100 rounded-xl p-2 shadow-inner max-w-xs w-full flex justify-center">
                        <img
                            src={file ? URL.createObjectURL(file) : (project?.image?.[0]?.url || project?.image)}
                            alt="Aperçu du projet"
                            className="rounded-lg max-h-48 object-cover w-full"
                        />
                    </div>
                </div>
            ) : null}
        >
            <div className="space-y-6">
                <div className="mb-4">
                    <h3 className="font-bold text-lg mb-1">Nom du Projet</h3>
                    {isAdmin ? (
                        <Input
                            label='Nom du Projet'
                            type="text"
                            value={projectName}
                            setValue={setProjectName}
                        />
                    ) : (
                        <p>{projectName}</p>
                    )}
                </div>
                <div className="mb-4">
                    <h3 className="font-bold text-lg mb-1">Lien du projet</h3>
                    {isAdmin ? (
                        <Input
                            label='Lien du projet'
                            type="text"
                            value={projectLink}
                            setValue={setProjectsLink}
                        />
                    ) : (
                        <p>{projectLink}</p>
                    )}
                </div>
                <div className="mb-4">
                    <h3 className="font-bold text-lg mb-1">Description</h3>
                    {isAdmin ? (
                        <Input
                            label='Description'
                            type="text"
                            value={description}
                            setValue={setDescription}
                        />
                    ) : (
                        <p>{description}</p>
                    )}
                </div>
                <div className="mb-4">
                    <h3 className="font-bold text-lg mb-1">Image du projet</h3>
                    {isAdmin ? (
                        <>
                            <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2" />
                            {(file || project?.image) && (
                                <div>
                                    <p className="text-green-600 text-sm">Image uploadée 👇</p>
                                </div>
                            )}
                        </>
                    ) : (
                        project?.image && (
                            <div>
                                <img src={project.image} alt="Project" className="max-h-56" />
                            </div>
                        )
                    )}
                </div>
                <div className="mb-4">
                    <h3 className="font-bold text-lg mb-1">Sélectionner un Étudiant</h3>
                    {isAdmin ? (
                        <select
                            value={selectedStudent}
                            onChange={(e) => setSelectedStudent(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md bg-white shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        >
                            <option value="" disabled>Sélectionner un étudiant</option>
                            {students.map((student) => (
                                <option key={student.id} value={student.id}>
                                    {student.first_name} {student.last_name}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <div className="mt-1 p-2 w-full border rounded-md bg-gray-50">
                            {
                                typeof project?.user === 'object' && project?.user?.first_name
                                    ? `${project.user.first_name} ${project.user.last_name}`
                                    : (students.find(s => s.id === project?.user)?.first_name + ' ' + students.find(s => s.id === project?.user)?.last_name)
                                    || 'Non assigné'
                            }
                        </div>
                    )}
                </div>
                <div className="mb-4">
                    <h3 className="font-bold text-lg mb-1">Sélectionner une Catégorie</h3>
                    {isAdmin ? (
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md bg-white shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        >
                            <option value="" disabled>Sélectionner une catégorie</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.category_name}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <div className="mt-1 p-2 w-full border rounded-md bg-gray-50">
                            {
                                typeof project?.category === 'object' && project?.category?.category_name
                                    ? project.category.category_name
                                    : (categories.find(c => c.id === project?.category)?.category_name)
                                    || 'Non assigné'
                            }
                        </div>
                    )}
                </div>
                <div className="mb-4">
                    <h3 className="font-bold text-lg mb-1">Sélectionner des Technologies</h3>
                    {isAdmin ? (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {technologies.map((technology) => (
                                <span
                                    key={technology.id}
                                    onClick={() => handleTagClick(technology.id)}
                                    className={`cursor-pointer px-3 py-1 rounded-full border ${selectedTechnologies.includes(technology.id) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} transition`}
                                >
                                    {technology.name}
                                </span>
                            ))}
                        </div>
                    ) : null}
                    <div className="flex flex-wrap gap-2">
                        {selectedTechnologies.map((techId) => {
                            const techName = technologies.find(tech => tech.id === techId)?.name || techId;
                            return (
                                <span
                                    key={techId}
                                    className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                                >
                                    {techName}
                                    {isAdmin && (
                                        <button
                                            onClick={() => handleRemoveTag(techId)}
                                            className="ml-2 text-blue-700 hover:text-pink-500"
                                        >
                                            &times;
                                        </button>
                                    )}
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ProjectModal;
