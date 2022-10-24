import TagData from "./tag_data";
import WorkData from "./work_data";

export default interface SaveFileData {
    tags: TagData[],
    works: WorkData[],
}