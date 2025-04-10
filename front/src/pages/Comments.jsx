import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { postJson } from "../services/fetch.services";
import { useGetComments } from "../services/useGetComments";
import CreateCommentModal from "../components/CreateCommentModal";

export const Comments = () => {
    const { comments, getComments } = useGetComments();
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="container mx-auto p-4">
            <CreateCommentModal isOpen={isOpen} onClose={() => setIsOpen(false)} onSuccess={getComments} />
            <Button
                label="Ajouter une Commentaire"
                onClick={() => setIsOpen(true)}
            />
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Commentaires</h2>
            <div className="grid gap-4">
                {comments.map((comment, index) => (
                    <div key={index} className="bg-white shadow rounded-lg p-4">
                        {Object.keys(comment).map(key => (
                            <div key={key} className="flex justify-between border-b pb-2">
                                <span className="font-semibold text-gray-600">{key}:</span>
                                <span className="text-gray-800">{comment[key]}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
