import React, { useState } from 'react';
import { Button } from '../components/Button';
import Modal from './Modal';
import { postJson } from '../services/fetch.services';
import Input from './Input';
import { useGetProjects } from '../services/useGetProjects';
import { useAuth } from '../contexts/AuthContext';

const CreateCommentModal = ({ isOpen, onClose, onSuccess }) => {
    const [comment, setComment] = useState('')
    const [selectedProject, setSelectedProject] = useState('')
    const { projects } = useGetProjects()
    const { userId } = useAuth()

    const handleCreateComment = () => {
        if (selectedProject && comment && userId) {
            postJson('comment', {
                comment,
                project: selectedProject,
                user: userId
            }).finally(onSuccess)
            setComment('')
            setSelectedProject('')
            onClose()
        } else {
            alert('Veuillez remplir tous les champs.');
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Créer un Commentaire"
            actions={
                <>
                    <Button label="Annuler" onClick={onClose} color="gray" />
                    <Button label="Créer" onClick={handleCreateComment} />
                </>
            }
        >
            <div className="mb-4">
                <Input
                    label='Commentaire'
                    type="text"
                    value={comment}
                    setValue={setComment}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Sélectionner un Projet</label>
                <select
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md"
                >
                    <option value="" disabled>Sélectionner un projet</option>
                    {projects.map((project, index) => (
                        <option key={index} value={project.id}>
                            {project.name}
                        </option>
                    ))}
                </select>
            </div>
        </Modal>
    );
};

export default CreateCommentModal;
