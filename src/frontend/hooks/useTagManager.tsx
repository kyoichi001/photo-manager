import Color from "../../entity/color"
import TagData from "../../entity/tag_data"
import { useEffect, useState } from "react"
import SaveFileData from "@/entity/saveFileData"
import UUID from "@/entity/uuid"

export const useTagManager = () => {
    const [data, setData] = useState<TagData[] | undefined>(undefined)
    const add = (tags: TagData[]) => {
        if (!data) return
        setData([...data, ...tags])
        window.myAPI.createTag()
    }
    const erase = (id: UUID) => {
        if (!data) return
        let dat = data.filter((w) => w.id !== id)
        setData([...dat])
        window.myAPI.deleteTag(id)
    }
    const edit = (id: string, color?: number, name?: string) => {

    }

    return {
        data, add, erase, edit
    }
}