import { Color } from "../value/color"
import TagData from "../value/tag_data"
import { useEffect, useState } from "react"

export const useTagManager = () => {
    const [data, setData] = useState<TagData[] | undefined>(undefined)
    const addTag = (data_: TagData[]) => {
        if (!data) return
        setData([...data, ...data_])
    }
    const eraceTag = (id: string) => {
        if (!data) return
        let dat = data.filter((w) => w.id !== id)
        setData([...dat])
    }
    const editTag = (id: string, name?: string, color?: number) => {
        if (!data) return
        data.map((t) => {
            if (t.id === id) {
                if (name) t.name = name
                if (color) t.color = color
            }
        })
        setData([...data])
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
        data, addTag, eraceTag, editTag
    }
}