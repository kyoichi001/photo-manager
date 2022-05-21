
import { Color, Col } from "./common/color"
import TagData from "./components/tag/tag_data"
import Library from "./common/constants"
import { getSaveFileDirectory } from "./saveload"

export default class TagManager {

    onDataSaved: () => void

    constructor(onDataSaved: () => void) {
        this.onDataSaved = onDataSaved
    }

    getSaveFilePath() {
        return getSaveFileDirectory() + "\\tags.json"
    }

    async writeTagData(data: TagData[]) {
        let path = this.getSaveFilePath()
        if (!window.myAPI.existsFile(path)) {
        }
        let jsonData = {
            "meta": {
                "save_format_version": "0.0.1"
            },
            "tags": data
        }
        await window.myAPI.writeFileAsync(path, JSON.stringify(jsonData))
    }

    jsonToData(data: any): TagData[] {
        let tags: any[] = data["tags"]
        let res: TagData[] = tags.map((v) => {
            return {
                id: v["id"],
                name: v["name"],
                createdAt: v["created_at"],
                color: v["color"],
                children: []
            }
        })
        return res
    }

    async getTags(): Promise<TagData[]> {
        let path = this.getSaveFilePath()
        if (!window.myAPI.existsFile(path)) {
            return []
        }
        let file = await window.myAPI.readFileAsync(path)
        let data = this.jsonToData(JSON.parse(file))
        return data
    }

    async idToTag(id: string): Promise<TagData | undefined> {
        try {
            let data = await this.getTags()
            return data.find((t) => t.id === id)
        } catch (e) {
            return undefined
        }
    }
    async addTag(name: string) {
        let tags = await this.getTags()
        const tag: TagData = { id: Library.generateUuid(), name: name, color: 0xFFFFFF, children: [] }
        tags.push(tag)
        await this.writeTagData(tags)
        this.onDataSaved()
    }
    async deleteTag(id: string) {
        let tags = await this.getTags()
        tags = tags.filter((t) => t.id !== id)
        await this.writeTagData(tags)
        this.onDataSaved()
    }
    async editTag(id: string, name?: string, color?: number) {
        let tags = await this.getTags()
        tags.map((t) => {
            if (t.id === id) {
                if (name) t.name = name
                if (color) t.color = color
            }
        })
        await this.writeTagData(tags)
        this.onDataSaved()
    }
}