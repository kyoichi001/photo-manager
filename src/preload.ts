//https://zenn.dev/rakim_stayfresh/articles/2928ac74a153a5
import { app, contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { IPCKeys } from './common/constants';
import fs from "fs";
import WorkData from './value/work_data';
import TagData from './value/tag_data';

const getUseDataPath = () => {
  return process.env.APPDATA + "\\photo-manager\\data"
}

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
  getFilesInDirectory: async (path: string) => {
    async function getFileFunc(p: string) {
      let f = await fs.promises.readdir(p)//ディレクトリ内のファイルを列挙
      let res: string[] = []
      for (let j of f) {
        let stat = await fs.promises.stat(p + "\\" + j)
        if (!stat.isDirectory()) {
          res.push(p + "\\" + j)
        } else {
          let fls = await getFileFunc(p + "\\" + j)
          res = res.concat(fls)
        }
      }
      return res
    }
    let stat = await fs.promises.stat(path)
    if (!stat.isDirectory()) return [path]
    let res = await getFileFunc(path)
    return res
  },
  getAllWorks: async () => {
    let path = getUseDataPath() + "\\works.json"
    if (!fs.existsSync(path)) {
      return
    }
    const txt = await fs.promises.readFile(path, { encoding: 'utf8' })
    const json = JSON.parse(txt)
    console.log("useWorkManager : load " + json["works"])
    let works: any[] = json["works"]
    let res: WorkData[] = works.map((v) => {
      return {
        id: v["id"],
        title: "",
        tags: v["tags"],
        createdAt: v["created_at"],
        image: v["image"],
      }
    })
    return res
  },
  postAllWorks: async (data: WorkData[]) => {
    const path = getUseDataPath() + "\\works.json"
    if (!fs.existsSync(path)) {
      return
    }
    console.log("useWorkManager : save ")
    console.log(data)
    let jsonData = {
      "meta": {
        "save_format_version": "0.0.1"
      },
      "works": data
    }
    fs.promises.writeFile(path, JSON.stringify(jsonData), { encoding: 'utf8' })
  },
  getAllTags: async () => {
    let path = getUseDataPath() + "\\tags.json"
    console.log(path)
    if (!fs.existsSync(path)) {
      return []
    }
    const txt = await fs.promises.readFile(path, { encoding: 'utf8' })
    const json = JSON.parse(txt)
    console.log(json)
    let tags: any[] = json["tags"]
    let res: TagData[] = tags.map((v) => {
      return {
        id: v["id"],
        name: v["name"],
        color: v["color"],
        children: []
      }
    })
    return res
  },
  postAllTags: async (data: TagData[]) => {
    const path = getUseDataPath() + "\\tags.json"
    if (!fs.existsSync(path)) {
      return
    }
    let jsonData = {
      "meta": {
        "save_format_version": "0.0.1"
      },
      "tags": data
    }
    fs.promises.writeFile(path, JSON.stringify(jsonData), { encoding: 'utf8' })
  }
});