import Color from "../common/color";
import TagData from "../components/tag/tag_data";
import WorkData from "../components/work/work_data";

declare global {
  interface Window {
    myAPI: IMyAPI
  }
}
export interface IMyAPI {
  sendMessage: (message: string) => void
  onReceiveMessage: (listener: (message: string) => void) => () => void
  loadJSON: (filename: string) => any
  writeFile: (filename: string, content: string) => void
  getRoaming: () => string

  createDirectory: (path: string) => void
  existsFile: (path: string) => boolean

  createTable: () => Promise<void>
  getWorks: () => Promise<WorkData[]>
  getWork: (id: string) => Promise<WorkData>
  getTags: () => Promise<TagData[]>
  getTag: (id: string) => Promise<TagData>
  insertWork: (work: WorkData) => Promise<void>
  insertTag: (tag: TagData) => Promise<void>
  insertTagToWork: (workId: string, tagId: string) => Promise<void>
  updateWork: (id: string, title: string) => Promise<void>
  updateTag: (id: string, name: string, color: Color) => Promise<void>
  deleteWork: (id: string) => Promise<void>
  deleteTag: (id: string) => Promise<void>
  deleteTagFromWork: (workId: string, tagId: string) => Promise<void>
}