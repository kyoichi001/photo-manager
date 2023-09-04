import Color from "../../entity/color"
import TagData from "../../entity/tag_data"
import { useEffect, useState } from "react"
import SaveFileData from "@/entity/saveFileData"

export const useTagManager = () => {
    const [data, setData] = useState<TagData[] | undefined>(undefined)
    const add = (tags: TagData[]) => {
        if (!data) return
        setData([...data, ...tags])
    }
    const erase = (id: string) => {
        if (!data) return
        let dat = data.filter((w) => w.id !== id)
        setData([...dat])
    }
    const edit = (id: string, color?: number, name?: string) => {

    }
    useEffect(() => {
        window.myAPI.getAllTags().then((tags) => {
            setData(tags)
        })
    }, [])
    useEffect(() => {
        if (!data) return
        window.myAPI.postAllTags(data)
    }, [data])

    return {
        data, add, erase, edit
    }
}