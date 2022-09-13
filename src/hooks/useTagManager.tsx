import { getSaveFileDirectory } from "../saveload"
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
        let path = getSaveFileDirectory() + "\\tags.json"
        console.log(path)
        if (!window.myAPI.existsFile(path)) {
            return
        }
        window.myAPI.readFileAsync(path).then((txt) => {
            const json = JSON.parse(txt)
            console.log(json)
            let tags: any[] = json["tags"]
            let res: TagData[] = tags.map((v) => {
                return {
                    id: v["id"],
                    name: v["name"],
                    color: v["color"],
                    children: []
                }
            })
            setData(res)
        })
    }, [])
    useEffect(() => {
        if (!data) return
        const path = getSaveFileDirectory() + "\\tags.json"
        if (!window.myAPI.existsFile(path)) {
            return
        }
        let jsonData = {
            "meta": {
                "save_format_version": "0.0.1"
            },
            "tags": data
        }
        window.myAPI.writeFileAsync(path, JSON.stringify(jsonData))
    }, [data])

    return {
        data, addTag, eraceTag, editTag
    }
}