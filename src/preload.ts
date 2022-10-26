//https://zenn.dev/rakim_stayfresh/articles/2928ac74a153a5
import { app, contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { IPCKeys } from './common/constants';
import fs from "fs";
import WorkData from './entity/work_data';
import TagData from './entity/tag_data';

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
});