import WorkData from "../../entity/work_data"
import { useEffect, useState } from "react"

export const useWorkManager = () => {
    const [data, setData] = useState<WorkData[] | undefined>(undefined)
    const addWork = (data_: WorkData[]) => {
        if (!data) return
        setData([...data, ...data_])
    }
    const eraceWork = (path: string) => {
        if (!data) return
        let dat = data.filter((w) => w.path !== path)
        setData([...dat])
    }
    const addTag = (workPath: string, tagId: string) => {
        if (!data) return
        let dat = data.map((w) => {
            if (w.path === workPath) {
                if (w.tags.includes(tagId)) return w
                w.tags = [...w.tags, tagId]
            }
            return w
        })
        setData([...dat])
    }
    const eraceTag = (workPath: string, tagId: string) => {
        if (!data) return
        let dat = data.map((w) => {
            if (w.path === workPath) {
                w.tags = w.tags.filter((t) => t !== tagId)
            }
            return w
        })
        setData([...dat])
    }
    useEffect(() => {
        window.myAPI.getWorks().then((works) => {
            setData(works)
        })
    }, [])
    useEffect(() => {
        if (!data) return
        window.myAPI.postWorks(data)
    }, [data])

    return {
        data, addWork, eraceWork, addTag, eraceTag
    }
}