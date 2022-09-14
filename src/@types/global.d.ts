
import TagData from "../value/tag_data";
import WorkData from "../value/work_data";

declare global {
  interface Window {
    myAPI: IMyAPI
  }
}
export interface IMyAPI {
  sendMessage: (message: string) => void
  onReceiveMessage: (listener: (message: string) => void) => () => void
  getFilesInDirectory: (path: string) => Promise<string[]>

  getAllWorks: () => Promise<WorkData[]>
  postAllWorks: (data: WorkData[]) => void
  getAllTags: () => Promise<TagData[]>
  postAllTags: (data: TagData[]) => void
}