
import Col from "./common/col"
import Color from "./common/color"
import TagData from "./components/tag/tag_data"
import Library from "./common/constants"

export default class TagManager {
    public loadTags: () => TagData[]
    public saveTags: (tags: TagData[]) => void

    constructor(loadTags: () => TagData[], saveTags: (tags: TagData[]) => void) {
        this.saveTags = saveTags
        this.loadTags = loadTags
    }
    idToTag(id: string): TagData | undefined {
        for (var tag of this.loadTags()) {
            if (tag.id === id) return tag;
        }
        return undefined
    }
    addTag(name: string) {
        if (name === "") return
        let tags = this.loadTags()
        tags = [...tags, { id: Library.generateUuid(), name: name, color: Col.generate(255, 255, 255) }]
        console.log("add tag: " + tags)
        this.saveTags(tags)
    }
    deleteTag(id: string) {
        let tags = this.loadTags()
        var t = tags.filter((tag) => tag.id !== id)
        this.saveTags(t)
    }
    editTag(id: string, name?: string, color?: Color) {
        let tag = this.idToTag(id)
        if (!tag) return
        if (name) tag.name = name
        if (color) tag.color = color
    }
}