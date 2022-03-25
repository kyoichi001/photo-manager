import Color from "../common/color";
import TagData from "../components/tag/tag_data";
import TagGroup from "../components/tag/tag_group";
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
  getWork: (id: string) => Promise<WorkData | undefined>
  getTags: () => Promise<TagData[]>
  getTag: (id: string) => Promise<TagData | undefined>
  getTagGroups: () => Promise<TagGroup[]>
  getTagGroup: (id: string) => Promise<TagGroup>
  getWorksFromTags: (ids: string[]) => Promise<WorkData[]>
  getTagsFromTagGroup: (id: string) => Promise<TagData[]>
  insertWork: (work: WorkData) => Promise<void>
  insertTag: (tag: TagData) => Promise<void>
  insertTagToWork: (workId: string, tagId: string) => Promise<void>
  insertTagGroup: (tagGroup: TagGroup) => Promise<void>
  insertTagToTagGroup: (groupId: string, tagId: string) => Promise<void>
  updateWork: (id: string, title: string) => Promise<void>
  updateTag: (id: string, name: string, color: Color) => Promise<void>
  updateTagGroup: (id: string, name: string) => Promise<void>
  deleteWork: (id: string) => Promise<void>
  deleteTag: (id: string) => Promise<void>
  deleteTagFromWork: (workId: string, tagId: string) => Promise<void>
  deleteTagGroup: (id: string) => Promise<void>
  deleteTagFromTagGroup: (groupId: string, tagId: string) => Promise<void>
}