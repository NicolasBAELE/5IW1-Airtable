import { useEffect, useState } from "react"
import { useGlobal } from "../contexts/GlobalContext"
import { getJson } from "./fetch.services"

export const useGetComments = () => {
    const { setGlobalLoading } = useGlobal()
    const [comments, setComments] = useState([])

    const getComments = () => {
        setGlobalLoading(true)
        getJson('comment')
            .then(setComments)
            .finally(() => setGlobalLoading(false))
    }

    useEffect(() => {
        getComments()
    }, [])

    return { comments, getComments }
}