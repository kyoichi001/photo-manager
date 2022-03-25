
import Col from "./common/col"
import Color from "./common/color"
import TagData from "./components/tag/tag_data"
import Library from "./common/constants"
import TagGroup from "./components/tag/tag_group"

export default class TagManager {

    onDataSaved: () => void

    constructor(onDataSaved: () => void) {
        this.onDataSaved = onDataSaved
    }

    async getTags(): Promise<TagData[]> {
        return await window.myAPI.getTags()
    }
    async getTagGroups(): Promise<TagGroup[]> {
        return await window.myAPI.getTagGroups()
    }
    async idToTag(id: string): Promise<TagData | undefined> {
        try {
            return await window.myAPI.getTag(id)
        } catch (e: any) {
            return undefined
        }
    }
    async idToTagGroup(id: string): Promise<TagGroup | undefined> {
        try {
            return await window.myAPI.getTagGroup(id)
        } catch (e: any) {
            return undefined
        }
    }
    async addTag(name: string) {
        const tag: TagData = { id: Library.generateUuid(), name: name, color: Col.generate(255, 255, 255) }
        await window.myAPI.insertTag(tag)
        this.onDataSaved()
    }
    async addTagGroup(name: string) {
        const tagGroup: TagGroup = { id: Library.generateUuid(), name: name, tags: [] }
        await window.myAPI.insertTagGroup(tagGroup)
        this.onDataSaved()
    }
    async addTagToTagGroup(groupid: string, tagid: string) {
        await window.myAPI.insertTagToTagGroup(groupid, tagid)
        this.onDataSaved()
    }
    async deleteTag(id: string) {
        await window.myAPI.deleteTag(id)
        this.onDataSaved()
    }
    async deleteTagGroup(id: string) {
        await window.myAPI.deleteTagGroup(id)
        this.onDataSaved()
    }
    async deleteTagFromTagGroup(groupid: string, tagid: string) {
        await window.myAPI.deleteTagFromTagGroup(groupid, tagid)
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
    async editTagGroup(id: string, name?: string) {
        let tag = await this.idToTagGroup(id)
        if (!tag) return
        if (name) tag.name = name
        await window.myAPI.updateTagGroup(id, tag.name)
        this.onDataSaved()
    }
}