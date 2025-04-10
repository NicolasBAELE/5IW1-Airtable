import { useEffect, useState } from "react"
import { useGlobal } from "../contexts/GlobalContext"
import { getJson } from "./fetch.services"

export const useGetTechnologies = () => {
    const { setGlobalLoading } = useGlobal()
    const [technologies, setTechnologies] = useState([])

    const getTechnologies = () => {
        setGlobalLoading(true)
        getJson('technology')
            .then(setTechnologies)
            .finally(() => setGlobalLoading(false))
    }

    useEffect(() => {
        getTechnologies()
    }, [])

    return { technologies, getTechnologies }
}