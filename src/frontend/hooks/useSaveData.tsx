import { Color } from "../../entity/color"
import TagData from "../../entity/tag_data"
import { useEffect, useState } from "react"
import SaveFileData from "@/entity/saveFileData"

export const useSaveData = () => {
    const [data, setData] = useState<SaveFileData | undefined | null>(undefined)
    useEffect(() => {
        window.myAPI.loadInitData().then((data) => {
            if (data) {
                setData(data)
            } else {
                setData(null)
            }
        })
    }, [])
    useEffect(() => {
        if (!data) return
        window.myAPI.saveData(data)
    }, [data])

    return {
        data,
    }
}