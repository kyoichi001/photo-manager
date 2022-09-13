import { getSaveFileDirectory } from "../saveload"
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
        data.find((w) => w.id === workId)?.tags.push(tagId)
        setData([...data])
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
        let path = getSaveFileDirectory() + "\\works.json"
        if (!window.myAPI.existsFile(path)) {
            return
        }
        window.myAPI.readFileAsync(path).then((txt) => {
            const json = JSON.parse(txt)
            console.log("useWorkManager : load " + json["works"])
            let works: any[] = json["works"]
            let res: WorkData[] = works.map((v) => {
                return {
                    id: v["id"],
                    title: "",
                    tags: v["tags"],
                    createdAt: v["created_at"],
                    image: v["image"],
                }
            })
            setData(res)
        })
    }, [])
    useEffect(() => {
        if (!data) return
        const path = getSaveFileDirectory() + "\\works.json"
        if (!window.myAPI.existsFile(path)) {
            return
        }
        console.log("useWorkManager : save ")
        console.log(data)
        let jsonData = {
            "meta": {
                "save_format_version": "0.0.1"
            },
            "works": data
        }
        window.myAPI.writeFileAsync(path, JSON.stringify(jsonData))
    }, [data])

    return {
        data, addWork, eraceWork, addTag, eraceTag
    }
}