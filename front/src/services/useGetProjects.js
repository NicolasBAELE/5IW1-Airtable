import { useEffect, useState } from "react"
import { useGlobal } from "../contexts/GlobalContext"
import { getJson } from "./fetch.services"

export const useGetProjects = () => {
    const { setGlobalLoading } = useGlobal()
    const [projects, setProjects] = useState([])

    const getProjects = () => {
        setGlobalLoading(true)
        getJson('project')
            .then(setProjects)
            .finally(() => setGlobalLoading(false))
    }

    useEffect(() => {
        getProjects()
    }, [])

    return { projects, getProjects }
}