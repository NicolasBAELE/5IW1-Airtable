import { useEffect, useState } from "react"
import { useGlobal } from "../contexts/GlobalContext"
import { getJson } from "./fetch.services"

export const useGetStudents = () => {
    const { setGlobalLoading } = useGlobal()
    const [students, setStudents] = useState([])

    const getStudents = () => {
        setGlobalLoading(true)
        getJson('user')
            .then((res) => {
                setStudents(res.filter(user => !user.is_admin))
            })
            .finally(() => setGlobalLoading(false))
    }

    useEffect(() => {
        getStudents()
    }, [])

    return { students, getStudents }
}