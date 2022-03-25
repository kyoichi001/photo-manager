import TagData from "./tag_data";

export default interface TagGroup {
    id: string;
    name: string;
    tags: TagData[]
}