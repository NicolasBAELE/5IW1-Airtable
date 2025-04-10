import { useEffect, useState } from "react"
import { useGlobal } from "../contexts/GlobalContext"
import { getJson } from "./fetch.services"

export const useGetCategories = () => {
    const { setGlobalLoading } = useGlobal()
    const [categories, setCategories] = useState([])

    const getCategories = () => {
        setGlobalLoading(true)
        getJson('category')
            .then(setCategories)
            .finally(() => setGlobalLoading(false))
    }

    useEffect(() => {
        getCategories()
    }, [])

    return { categories, getCategories }
}