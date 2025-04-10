import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { useGetCategories } from "../services/useGetCategories";
import { postJson } from "../services/fetch.services";

export const Categories = () => {
    const { categories, getCategories } = useGetCategories();

    const createCategory = () => {
        const category_name = prompt("Entrez le nom de la categorie", "");
        const description = prompt("Entrez la description", "");

        if (category_name && description) {
            postJson('category', { category_name, description })
                .then(() => {
                    alert('Catégorie créée');
                    getCategories();
                })
                .catch(err => alert(err));
        } else {
            alert('Tous les champs doivent être renseignés');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <Button
                label="Ajouter une Catégorie"
                onClick={() => createCategory()}
            />
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Categories</h2>
            <div className="grid gap-4">
                {categories.map((categorie, index) => (
                    <div key={index} className="bg-white shadow rounded-lg p-4">
                        {Object.keys(categorie).map(key => (
                            <div key={key} className="flex justify-between border-b pb-2">
                                <span className="font-semibold text-gray-600">{key}:</span>
                                <span className="text-gray-800">{categorie[key]}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
