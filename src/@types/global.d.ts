
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
  readFile: (filename: string) => string
  writeFile: (filename: string, content: string) => void
  readFileAsync: (filename: string) => Promise<string>
  writeFileAsync: (filename: string, content: string) => Promise<void>
  getUseDataPath: () => string
  getRoaming: () => string

  createDirectory: (path: string) => void
  existsFile: (path: string) => boolean
  readDirectory: (path: string) => Promise<string[]>
  isDirectory: (path: string) => Promise<boolean>
  getFilesInDirectory: (path: string) => Promise<string[]>
}