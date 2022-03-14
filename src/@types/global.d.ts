declare global {
  interface Window {
    myAPI: IMyAPI;
  }
}
export interface IMyAPI {
  sendMessage: (message: string) => void;
  onReceiveMessage: (listener: (message: string) => void) => () => void;
  loadJSON: (filename: string) => any;
  writeFile: (filename: string, content: string) => void;
  getRoaming: () => string;
  createDirectory: (path: string) => void;
  existsFile: (path: string) => boolean;
}