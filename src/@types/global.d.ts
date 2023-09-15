
import SaveFileData from "@/entity/saveFileData";
import WorkSpaceData from "@/entity/workSpaceData";
import TagData from "../entity/tag_data";
import WorkData from "../entity/work_data";
import UUID from "@/entity/uuid";

declare global {
  interface Window {
    myAPI: IMyAPI
  }
}
export interface IMyAPI {
  sendMessage: (message: string) => void
  onReceiveMessage: (listener: (message: string) => void) => () => void,
  
  //work
  addTagToWork:(workID:UUID,tagID:UUID)=>Promise<void>,
  getTagsOfWork:(workID:UUID)=>Promise<UUID[]>,
  getWork:(workID:UUID)=>Promise<WorkData>,
  getWorks: () => Promise<WorkData[]>,
  postWorks: (works: WorkData[]) => Promise<void>,
  removeTagFromWork:(workID:UUID,tagID:UUID)=>Promise<void>

  //tag
  createTag: (name:string) => Promise<TagData>,
  deleteTag:(id:UUID)=>Promise<void>,
  getTag:(id:UUID)=>Promise<TagData>,
  getTags:()=>Promise<TagData[]>,
  postTags: (tags: TagData[]) => Promise<void>,
  renewTag:(id:UUID,newName?:string,newColor?:number)=>Promise<TagData>

  //view
  getView:(directoryPath:string,page:number,recursive?:boolean)=>Promise<[WorkData[],boolean]>,

  //workspace
  openAddDirectoryDialogToWorkSpace:()=>Promise<void>
  addDirectoryToWorkSpace:(path:string)=>Promise<void> //ウィンドウにドロップしたとき用
  removeDirectoryFromWorkSpace:(path:string)=>Promise<void>
  getWorkSpace: () => Promise<WorkSpaceData> //セーブデータ取得

  //filetree
  getFilesInDirectory: (path: string) => Promise<string[]>
  getDirectoriesInDirectory: (path: string, recursive: boolean) => Promise<string[]>
}