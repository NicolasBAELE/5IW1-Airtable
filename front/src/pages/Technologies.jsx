import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { postJson } from "../services/fetch.services";
import { useGetTechnologies } from "../services/useGetTechnologies";

export const Technologies = () => {
    const { technologies, getTechnologies } = useGetTechnologies();

    const createTechnology = () => {
        const name = prompt("Entrez le nom", "");

        if (name) {
            postJson('technology', { name })
                .then(() => {
                    alert('Technologie créée');
                    getTechnologies();
                })
                .catch(err => alert(err));
        } else {
            alert('Tous les champs doivent être renseignés');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <Button
                label="Ajouter une Technologie"
                onClick={() => createTechnology()}
            />
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Techologies</h2>
            <div className="grid gap-4">
                {technologies.map((technologie, index) => (
                    <div key={index} className="bg-white shadow rounded-lg p-4">
                        {Object.keys(technologie).map(key => (
                            <div key={key} className="flex justify-between border-b pb-2">
                                <span className="font-semibold text-gray-600">{key}:</span>
                                <span className="text-gray-800">{technologie[key]}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
