
import SaveFileData from "@/entity/saveFileData";
import TagData from "../entity/tag_data";
import WorkData from "../entity/work_data";

declare global {
  interface Window {
    myAPI: IMyAPI
  }
}
export interface IMyAPI {
  sendMessage: (message: string) => void
  onReceiveMessage: (listener: (message: string) => void) => () => void


}