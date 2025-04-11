import React, { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import Modal from './Modal';
import { postJson, putJson } from '../services/fetch.services';
import { useGetStudents } from '../services/useGetStudents';
import Input from './Input';
import { useGetCategories } from '../services/useGetCategories';
import { useGetTechnologies } from '../services/useGetTechnologies';

const ProjectModal = ({ isOpen, onClose, onSuccess, project = null }) => {
    const [projectName, setProjectName] = useState('')
    const { students } = useGetStudents()
    const [selectedStudent, setSelectedStudent] = useState('')
    const { categories } = useGetCategories()
    const [selectedCategory, setSelectedCategory] = useState('')
    const { technologies } = useGetTechnologies()
    const [selectedTechnologies, setSelectedTechnologies] = useState([])
    const [description, setDescription] = useState('')
    const [projectLink, setProjectsLink] = useState('')


    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (project) {
            setProjectName(project.name || '');
            setSelectedStudent(project.student || '');
            setSelectedCategory(project.category || '');
            setSelectedTechnologies(project.technologies || []);
            setDescription(project.description || '');
            setProjectsLink(project.project_link || '');
        }
    }, [project]);

    const handleCreateProject = () => {
        if (projectName && selectedStudent && description && selectedCategory && selectedTechnologies.length > 0) {
            const method = project ? putJson : postJson
            method('project', {
                id: project?.id,
                name: projectName,
                student: selectedStudent,
                category: selectedCategory,
                description,
                project_link: projectLink,
                technologies: selectedTechnologies,
                image_url: imageUrl,
            }).finally(onSuccess)
            setProjectName('')
            setSelectedStudent('')
            setDescription('')
            setProjectsLink('')
            setSelectedCategory('')
            setSelectedTechnologies([])
            onClose()
        } else {
            alert('Veuillez remplir tous les champs.');
        }
    }

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

    console.log("env. " + JSON.stringify(import.meta.env, null, 2));

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);

        // 1. Upload to Cloudinary
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', import.meta.env.VITE_UPLOAD_PRESET); // ⚠️ ton preset ici

        const cloudName = import.meta.env.VITE_CLOUD_NAME; // ⚠️ ton cloud name ici

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            const url = data.secure_url;
            setImageUrl(url);
            console.log('Image uploaded:', url);
        } catch (err) {
            console.error('Erreur upload:', err);
        } finally {
            setUploading(false);
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Créer un Projet"
            actions={
                <>
                    <Button label="Annuler" onClick={onClose} color="gray" />
                    <Button label={project ? "Modifier" : "Créer"} onClick={handleCreateProject} />
                </>
            }
        >
            <div className="mb-4">
                <Input
                    label='Nom du Projet'
                    type="text"
                    value={projectName}
                    setValue={setProjectName}
                />
            </div>
            <div className="mb-4">
                <Input
                    label='Lien du projet'
                    type="text"
                    value={projectLink}
                    setValue={setProjectsLink}
                />
            </div>
            <div className="mb-4">
                <Input
                    label='Description'
                    type="text"
                    value={description}
                    setValue={setDescription}

                />
            </div>
            <div className="mb-4">
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    {uploading ? 'Uploading...' : 'Upload'}
                </button>
                {imageUrl && (
                    <div>
                        <p className="text-green-600">Image uploaded 👇</p>
                        <img src={imageUrl} alt="Uploaded" className="w-full mt-2 rounded shadow" />
                    </div>
                )}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Sélectionner un Étudiant</label>
                <select
                    value={selectedStudent}
                    onChange={(e) => setSelectedStudent(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md"
                >
                    <option value="" disabled>Sélectionner un étudiant</option>
                    {students.map((student, index) => (
                        <option key={index} value={student.id}>
                            {student.first_name} {student.last_name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Sélectionner une Catégorie</label>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md"
                >
                    <option value="" disabled>Sélectionner une catégorie</option>
                    {categories.map((categorie, index) => (
                        <option key={index} value={categorie.id}>
                            {categorie.category_name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Sélectionner des Technologies</label>
                <div className="flex flex-wrap gap-2 mb-4">
                    {technologies.map((technology) => (
                        <span
                            key={technology.id}
                            onClick={() => handleTagClick(technology.id)}
                            className="cursor-pointer bg-gray-200 text-gray-700 px-3 py-1 rounded-full"
                        >
                            {technology.name}
                        </span>
                    ))}
                </div>
                <div className="flex flex-wrap gap-2">
                    {selectedTechnologies.map((techId) => {
                        const techName = technologies.find(tech => tech.id === techId).name;
                        return (
                            <span
                                key={techId}
                                className="flex items-center bg-blue-500 text-white px-3 py-1 rounded-full"
                            >
                                {techName}
                                <button
                                    onClick={() => handleRemoveTag(techId)}
                                    className="ml-2 text-white hover:text-gray-300"
                                >
                                    &times;
                                </button>
                            </span>
                        );
                    })}
                </div>
            </div>
        </Modal>
    );
};

export default ProjectModal;
