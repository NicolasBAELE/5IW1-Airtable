import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { useGetCategories } from "../services/useGetCategories";
import { useGetProjects } from "../services/useGetProjects";
import { postJson } from "../services/fetch.services";
import Modal from "../components/Modal";
import Input from "../components/Input";

export const Categories = () => {
    const { categories, getCategories } = useGetCategories();
    const { projects } = useGetProjects();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [description, setDescription] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showProjectsModal, setShowProjectsModal] = useState(false);

    const createCategory = () => {
        if (categoryName.trim() && description.trim()) {
            postJson('category', { category_name: categoryName, description })
                .then(() => {
                    setIsModalOpen(false);
                    setCategoryName("");
                    setDescription("");
                    getCategories();
                })
                .catch(err => alert(err));
        }
    };

    // Projets filtrés par catégorie sélectionnée
    const filteredProjects = selectedCategory
        ? projects.filter(project =>
            Array.isArray(project.category)
                ? project.category.includes(selectedCategory.id)
                : project.category === selectedCategory.id
        )
        : [];

    return (
        <div className="container mx-auto p-6 max-w-4xl pt-24">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Catégories</h2>
                <Button
                    label="Ajouter une catégorie"
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105"
                />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {categories.map((categorie, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col items-center justify-center text-lg font-semibold text-blue-700"
                        onClick={() => { setSelectedCategory(categorie); setShowProjectsModal(true); }}
                    >
                        <div>{categorie.category_name}</div>
                        <div className="text-xs text-gray-500 mt-2 text-center">{categorie.description}</div>
                    </div>
                ))}
            </div>

            {/* Modale pour ajouter une catégorie */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setCategoryName("");
                    setDescription("");
                }}
                title="Ajouter une catégorie"
                actions={
                    <>
                        <Button
                            label="Annuler"
                            onClick={() => {
                                setIsModalOpen(false);
                                setCategoryName("");
                                setDescription("");
                            }}
                            color="gray"
                        />
                        <Button
                            label="Ajouter"
                            onClick={createCategory}
                            disabled={!categoryName.trim() || !description.trim()}
                        />
                    </>
                }
            >
                <div className="space-y-4">
                    <Input
                        label="Nom de la catégorie"
                        placeholder="Entrez le nom de la catégorie"
                        value={categoryName}
                        setValue={setCategoryName}
                    />
                    <Input
                        label="Description"
                        placeholder="Entrez la description de la catégorie"
                        value={description}
                        setValue={setDescription}
                    />
                </div>
            </Modal>

            {/* Modale pour afficher les projets liés à la catégorie sélectionnée */}
            <Modal
                isOpen={showProjectsModal}
                onClose={() => { setShowProjectsModal(false); setSelectedCategory(null); }}
                title={selectedCategory ? `Projets de la catégorie : ${selectedCategory.category_name}` : "Projets"}
            >
                {filteredProjects.length === 0 ? (
                    <p>Aucun projet dans cette catégorie.</p>
                ) : (
                    <ul className="space-y-4">
                        {filteredProjects.map((project, idx) => (
                            <li key={idx} className="border-b pb-2">
                                <span className="font-bold text-gray-800">{project.name}</span>
                                <div className="text-sm text-gray-600">{project.description}</div>
                            </li>
                        ))}
                    </ul>
                )}
            </Modal>
        </div>
    );
};
