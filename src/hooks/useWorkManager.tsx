import WorkData from "../value/work_data"
import { useEffect, useState } from "react"

export const useWorkManager = () => {
    const [data, setData] = useState<WorkData[] | undefined>(undefined)
    const addWork = (data_: WorkData[]) => {
        if (!data) return
        setData([...data, ...data_])
    }
    const eraceWork = (id: string) => {
        if (!data) return
        let dat = data.filter((w) => w.id !== id)
        setData([...dat])
    }
    const addTag = (workId: string, tagId: string) => {
        if (!data) return
        let dat = data.map((w) => {
            if (w.id === workId) {
                if (w.tags.includes(tagId)) return w
                w.tags = [...w.tags, tagId]
            }
            return w
        })
        setData([...dat])
    }
    const eraceTag = (workId: string, tagId: string) => {
        if (!data) return
        let dat = data.map((w) => {
            if (w.id === workId) {
                w.tags = w.tags.filter((t) => t !== tagId)
            }
            return w
        })
        setData([...dat])
    }
    useEffect(() => {
        window.myAPI.getAllWorks().then((works) => {
            setData(works)
        })
    }, [])
    useEffect(() => {
        if (!data) return
        window.myAPI.postAllWorks(data)
    }, [data])

    return {
        data, addWork, eraceWork, addTag, eraceTag
    }
}