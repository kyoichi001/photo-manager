//https://zenn.dev/rakim_stayfresh/articles/2928ac74a153a5
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { IPCKeys } from './common/constants';
import fs from "fs"
import sqlite3 from 'sqlite3'
import Color from './common/color';
import WorkData from './components/work/work_data';
import TagData from './components/tag/tag_data';
import Col from './common/col';
import util from 'util'

const dbName = 'testdata.db'

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
  loadJSON: (filename: string) => {
    return fs.readFileSync(filename, { encoding: 'utf8' })
  },
  writeFile: (filename: string, content: string) => {
    fs.writeFileSync(filename, content)
  },
  getRoaming: () => {
    return process.env.APPDATA
  },
  createDirectory: (path: string) => {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
  },
  existsFile: (path: string) => {
    return fs.existsSync(path)
  },
  createTable: () => {
    const p = new Promise<void>((resolve, reject) => {
      var db = new sqlite3.Database(dbName);
      db.serialize(async function () {
        const dbRunAsync = util.promisify<string, void>(db.run)
        try {
          await dbRunAsync("create table works (id text, title text,image text, createdAt int)")
          await dbRunAsync("create table tags (id text, name text, r int, g int, b int,createdAt int)")
          await dbRunAsync("create table tagworks (workid text, tagid text)");
        } catch (e: any) {
          reject(e)
          return
        }
        resolve()
      })
      db.close()
    })
    return p
  },
  getWorks: () => {
    const p = new Promise<WorkData[]>((resolve, reject) => {
      var db = new sqlite3.Database(dbName);
      db.serialize(async function () {
        var res: WorkData[] = []
        const dbAllAsync = util.promisify<string, ((this: sqlite3.Statement, err: Error | null, rows: any[]) => void) | undefined, number>(db.all)
        try {
          await dbAllAsync("select * from works", (err, rows) => {
            if (err) throw err
            res = rows.map((row) => {
              return {
                id: row["id"],
                title: row['title'],
                image: row['image'],
                tags: [],
                createdAt: row['createdAt']
              }
            })
          })
          await dbAllAsync("select * from tagworks", (err, rows) => {
            if (err) throw err
            for (var row of rows) {
              var w = res.find((w) => w.id === row['workid'])
              if (w !== undefined) w.tags.push(row['tagid'])
            }
          })
        } catch (e: any) {
          reject(e)
          return
        }
        resolve(res)
      });
      db.close()
    })
    return p
  },
  getWork: (id: string) => {
    const p = new Promise<WorkData>((resolve, reject) => {
      var db = new sqlite3.Database(dbName);
      db.serialize(async function () {
        db.get("select * from works where id=$id", { '$id': id }, (err, row) => {
          if (err) {
            reject(err)
            return
          }
          const work: WorkData = {
            id: row['id'],
            title: row['title'],
            image: row['image'],
            tags: [],
            createdAt: row['createdAt']
          }
          db.all("select * from tagworks where workid=$workid", { '$workid': id }, (err, rows) => {
            if (err) {
              reject(err)
              return
            }
            for (var row of rows) {
              work.tags.push(row['tagid'])
            }
            resolve(work)
          })
        })
      })
      db.close()
    })
    return p
  },
  getTags: () => {
    const p = new Promise<TagData[]>((resolve, reject) => {
      var db = new sqlite3.Database(dbName);
      db.serialize(function () {
        var res: TagData[] = []
        db.each("select * from tags", (err, row) => {
          if (err) throw err
          var tag: TagData = {
            id: row["id"],
            name: row['title'],
            color: Col.generate(row['r'], row['g'], row['b'])
          }
          res.push(tag)
        }, (err, count) => {
          if (err)
            reject(err)
          else
            resolve(res)
        });
      });
      db.close()
    })
    return p
  },
  getTag: (id: string) => {
    const p = new Promise<TagData>((resolve, reject) => {
      var db = new sqlite3.Database(dbName);
      db.serialize(async function () {
        db.get("select * from tags where id=$id", { '$id': id }, (err, row) => {
          if (err) {
            reject(err)
            return
          }
          const tag: TagData = {
            id: row['id'],
            name: row['name'],
            color: Col.generate(row['r'], row['g'], row['b'])
          }
          resolve(tag)
        })
      })
      db.close()
    })
    return p
  },
  insertWork: (work: WorkData) => {
    const p = new Promise<void>((resolve, reject) => {
      var db = new sqlite3.Database(dbName);
      db.serialize(async function () {
        const dbRunAsync = util.promisify<string, any, void>(db.run)
        try {
          await dbRunAsync("insert into works(id text, title text,image text, createdAt int) values ($id, $title, $image, $createdAt)",
            { '$id': work.id, '$title': work.title, '$image': work.image, '$createdAt': work.createdAt });

          for (var tag of work.tags) {
            await dbRunAsync("insert into tagworks(workid text, tagid text) values ($workid, $tagid)",
              { '$workid': work.id, '$tagid': tag })
          }
        } catch (e: any) {
          reject(e)
          return
        }
        resolve()
      });
      db.close()
    })
    return p
  },
  insertTag: (tag: TagData) => {
    const p = new Promise<void>((resolve, reject) => {
      var db = new sqlite3.Database(dbName);
      db.serialize(function () {
        db.run("insert into tags(id text, name text, r int, g int, b int,createdAt int) values ($id, $name, $r, $g, $b)",
          { '$id': tag.id, '$title': tag.name, '$r': tag.color.r, '$g': tag.color.g, '$b': tag.color.b },
          (err) => {
            if (err) reject(err)
            else resolve()
          });
      });
      db.close()
    })
    return p
  },
  insertTagToWork: (workId: string, tagId: string, callback: (err: Error | null, res: TagData[]) => void) => {
    const p = new Promise<void>((resolve, reject) => {
      var db = new sqlite3.Database(dbName);
      db.serialize(function () {
        db.run("insert into tagworks(workid text, tagid text) values ($workid, $tagid)",
          { '$workid': workId, '$tagid': tagId },
          (err) => {
            if (err) reject(err)
            else resolve()
          });
      });
      db.close()
    })
    return p
  },
  updateWork: (id: string, title: string) => {
    const p = new Promise<void>((resolve, reject) => {
      var db = new sqlite3.Database(dbName);
      db.serialize(function () {
        db.run("update works set title=$title where id=$id",
          { '$id': id, '$title': title },
          (err) => {
            if (err) reject(err)
            else resolve()
          });
      });
      db.close()
    })
    return p
  },
  updateTag: (id: string, name: string, color: Color) => {
    const p = new Promise<void>((resolve, reject) => {
      var db = new sqlite3.Database(dbName);
      db.serialize(function () {
        db.run("update tags set name=$name,r=$r,g=$g,b=$b where id=$id",
          { '$id': id, '$name': name, '$r': color.r, '$g': color.g, '$b': color.b },
          (err) => {
            if (err) reject(err)
            else resolve()
          });
      });
      db.close()
    })
    return p
  },
  deleteWork: (id: string) => {
    const p = new Promise<void>((resolve, reject) => {
      var db = new sqlite3.Database(dbName);
      db.serialize(function () {
        db.run("delete from works where id=$id",
          { '$id': id },
          (err) => {
            if (err) reject(err)
            else resolve()
          });
      });
      db.close()
    })
    return p
  },
  deleteTag: (id: string) => {
    const p = new Promise<void>((resolve, reject) => {
      var db = new sqlite3.Database(dbName);
      db.serialize(function () {
        db.run("delete from tags where id=$id",
          { '$id': id },
          (err) => {
            if (err) reject(err)
            else resolve()
          });
      });
      db.close()
    })
    return p
  },
  deleteTagFromWork: (workId: string, tagId: string) => {
    const p = new Promise<void>((resolve, reject) => {
      var db = new sqlite3.Database(dbName);
      db.serialize(function () {
        db.run("delete from tagworks where workid=$workid and tagid=$tagid",
          { '$workid': workId, '$tagid': tagId },
          (err) => {
            if (err) reject(err)
            else resolve()
          });
      });
      db.close()
    })
    return p
  }
});