import TagData from "../tag/tag_data"

export default interface WorkData {
    id: string;
    title: string
    image: string
    tags: string[]
    createdAt: string
    extention?: string
}

export const __errorWork: WorkData = {
    id: "",
    title: "",
    image: "",
    tags: [],
    createdAt: ""
}