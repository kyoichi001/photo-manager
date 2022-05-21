//https://zenn.dev/rakim_stayfresh/articles/2928ac74a153a5
import { app, contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { IPCKeys } from './common/constants';
import fs from "fs";

contextBridge.exposeInMainWorld('myAPI', {
  // 関数で包んで部分的に公開する
  // renderer -> main
  sendMessage: (message: string) => {
    ipcRenderer.send(IPCKeys.SEND_MESSSAGE, message);
  },
  // main -> renderer
  onReceiveMessage: (listener: (message: string) => void) => {
    ipcRenderer.on(
      IPCKeys.RECEIVE_MESSAGE,
      (event: IpcRendererEvent, message: string) => listener(message),
    );
    return () => {
      ipcRenderer.removeAllListeners(IPCKeys.RECEIVE_MESSAGE);
    };
  },
  readFile: (filename: string) => {
    return fs.readFileSync(filename, { encoding: 'utf8' })
  },
  writeFile: (filename: string, content: string) => {
    fs.writeFileSync(filename, content, { encoding: 'utf8' })
  },
  readFileAsync: (filename: string) => {
    return fs.promises.readFile(filename, { encoding: 'utf8' })
  },
  writeFileAsync: (filename: string, content: string) => {
    return fs.promises.writeFile(filename, content, { encoding: 'utf8' })
  },
  getRoaming: () => {
    return process.env.APPDATA
  },
  getUseDataPath: () => {
    return process.env.APPDATA + "\\photo-manager\\data"
  },
  createDirectory: (path: string) => {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
  },
  existsFile: (path: string) => {
    return fs.existsSync(path)
  }
});