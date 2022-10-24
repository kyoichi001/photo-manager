import IFilter from "./filter/filter_data";
import WorkData from "./work_data";

export default interface FolderData {
    filters: IFilter
    folders: FolderData[]
    works: WorkData[]
    name: string
}