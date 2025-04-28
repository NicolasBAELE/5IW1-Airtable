import { useEffect, useState } from "react"
import { useGlobal } from "../contexts/GlobalContext"
import { getJson } from "./fetch.services"

export const useGetComments = () => {
    const { setGlobalLoading } = useGlobal()
    const [comments, setComments] = useState([])

    const getComments = () => {
        setGlobalLoading(true)
        getJson('comment')
            .then(async (commentsData) => {
                const enrichedComments = await Promise.all(
                    commentsData.map(async (comment) => {
                        try {
                            const [userResponse, projectResponse] = await Promise.all([
                                getJson(`user/${comment.user[0]}`),
                                getJson(`project/${comment.project[0]}`)
                            ]);

                            // Vérifier si les réponses sont des tableaux et contiennent des données
                            const userDetails = Array.isArray(userResponse) && userResponse.length > 0 ? userResponse[0] : null;
                            const projectDetails = Array.isArray(projectResponse) && projectResponse.length > 0 ? projectResponse[0] : null;

                            return {
                                ...comment,
                                userDetails,
                                projectDetails
                            };
                        } catch (error) {
                            console.error('Error fetching details:', error);
                            return {
                                ...comment,
                                userDetails: null,
                                projectDetails: null
                            };
                        }
                    })
                );
                setComments(enrichedComments);
            })
            .finally(() => setGlobalLoading(false))
    }

    useEffect(() => {
        getComments()
    }, [])

    return { comments, getComments }
}