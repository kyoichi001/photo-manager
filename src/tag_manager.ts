
import Col from "./common/col"
import Color from "./common/color"
import TagData from "./components/tag/tag_data"
import Library from "./common/constants"

export default class TagManager {

    onDataSaved: () => void

    constructor(onDataSaved: () => void) {
        this.onDataSaved = onDataSaved
    }

    async getTags(): Promise<TagData[]> {
        return await window.myAPI.getTags()
    }
    async idToTag(id: string): Promise<TagData | undefined> {
        return await window.myAPI.getTag(id)
    }
    async addTag(name: string) {
        const tag = { id: Library.generateUuid(), name: name, color: Col.generate(255, 255, 255) }
        await window.myAPI.insertTag(tag)
        this.onDataSaved()
    }
    async deleteTag(id: string) {
        await window.myAPI.deleteTag(id)
        this.onDataSaved()
    }
    async editTag(id: string, name?: string, color?: Color) {
        let tag = await this.idToTag(id)
        if (!tag) return
        if (name) tag.name = name
        if (color) tag.color = color
        await window.myAPI.updateTag(id, tag.name, tag.color)
        this.onDataSaved()
    }
}