import TagData from "../tag/tag_data"

export default interface WorkData {
    id: string;
    title: string
    image: string
    tags: string[]
    createdAt: string
    extention?: string
    /*constructor(id: string, title: string, image: string, createdAt: string, tags?: string[], extention?: string) {
        this.id = id
        this.title = title
        this.image = image
        this.tags = tags ?? []
        this.createdAt = createdAt
        this.extention = extention
    }*/
}