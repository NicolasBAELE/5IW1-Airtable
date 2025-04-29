import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { postJson } from "../services/fetch.services";
import { useGetComments } from "../services/useGetComments";
import CreateCommentModal from "../components/CreateCommentModal";

export const Comments = () => {
    const { comments, getComments } = useGetComments();
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
        setIsOpen(false)
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Commentaires</h1>
                <Button label="Créer un Commentaire" onClick={() => setIsOpen(true)} />
            </div>

            <CreateCommentModal
                isOpen={isOpen}
                onClose={handleClose}
                onSuccess={getComments}
            />

            <div className="grid gap-6">
                {comments.map((comment, index) => (
                    <div 
                        key={index} 
                        className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <div className="space-y-3">
                            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                                <span className="font-medium text-gray-600">Auteur:</span>
                                <span className="text-gray-800">
                                    {comment.userDetails ? `${comment.userDetails.first_name} ${comment.userDetails.last_name}` : 'Anonyme'}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-600">Commentaire:</span>
                                <span className="text-gray-800">{comment.comment}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
