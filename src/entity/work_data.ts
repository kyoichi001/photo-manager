import TagData from "./tag_data"

export default interface WorkData {
    path: string
    tags: string[]
}

export const __errorWork: WorkData = {
    path: "",
    tags: [],
}
