//https://zenn.dev/rakim_stayfresh/articles/2928ac74a153a5
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { IPCKeys } from './common/constants';
import fs from "fs";
import { Color, Col } from './common/color';
import sqlite3 from 'sqlite3';
import WorkData from './components/work/work_data';
import TagData from './components/tag/tag_data';

const dbName = 'testdata.db'

function DBAll(db: sqlite3.Database, query: string, replacement?: any): Promise<any[]> {
  return new Promise<any[]>((resolve, reject) => {
    if (replacement) {
      db.all(query, replacement, (err, rows) => {
        if (err) reject(err)
        else
          resolve(rows)
      })
    } else {
      db.all(query, (err, rows) => {
        if (err) reject(err)
        else
          resolve(rows)
      })
    }
  })
}
function DBRun(db: sqlite3.Database, query: string, replacement?: any): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (replacement) {
      db.run(query, replacement, (err) => {
        if (err) reject(err)
        else
          resolve()
      })
    } else {
      db.run(query, (err) => {
        if (err) reject(err)
        else
          resolve()
      })
    }
  })
}
function DBGet(db: sqlite3.Database, query: string, replacement?: any): Promise<any> {
  return new Promise<any[]>((resolve, reject) => {
    if (replacement) {
      db.get(query, replacement, (err, row) => {
        if (err) reject(err)
        else
          resolve(row)
      })
    } else {
      db.get(query, (err, row) => {
        if (err) reject(err)
        else
          resolve(row)
      })
    }
  })
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

  //===============================================================================
  //initialize
  //===============================================================================
  createTable: async () => {
    var db = new sqlite3.Database(dbName);
    console.log("creating")
    try {
      await DBRun(db, "create table works (id text, title text,image text, createdAt int)")
      await DBRun(db, "create table works (id text, title text,image text, createdAt int)")
      await DBRun(db, "create table tags (id text, name text, r int, g int, b int,createdAt int)")
      await DBRun(db, "create table tagworks (workid text, tagid text)")
      await DBRun(db, "create table tagtree (parentid text, childid text)")
    } catch (e: any) {
      console.log("reject create taggrouptags table")
      return
    }
    console.log("finish creating tables")
    db.close()
  },


  //===============================================================================
  //get
  //===============================================================================
  getWorks: async () => {
    var db = new sqlite3.Database(dbName);
    var rows = await DBAll(db, "select * from works")
    console.log("load works " + rows.length)
    var res: WorkData[] = rows.map((row) => {
      return {
        id: row["id"],
        title: row['title'],
        image: row['image'],
        tags: [],
        createdAt: row['createdAt']
      }
    })
    var tagWorks = await DBAll(db, "select * from tagworks")
    for (var row of tagWorks) {
      var w = res.find((w) => w.id === row['workid'])
      if (w !== undefined) w.tags = [...w.tags, row['tagid']]
    }
    db.close()
    return res
  },
  getWork: async (id: string) => {
    if (id == "") return undefined
    var db = new sqlite3.Database(dbName);
    var workDat = await DBGet(db, "select * from works where id=$id", { '$id': id })
    var rows = await DBAll(db, "select * from tagworks where workid=$workid", { '$workid': id })
    var work: WorkData = {
      id: workDat['id'],
      title: workDat['title'],
      image: workDat['image'],
      tags: rows.map((row) => row['tagid']),
      createdAt: workDat['createdAt']
    }
    db.close()
    return work
  },
  getTags: async () => {
    var db = new sqlite3.Database(dbName);
    var rows = await DBAll(db, "select * from tags")
    var res: TagData[] = rows.map((row) => {
      return {
        id: row["id"],
        name: row['name'],
        color: Col.generate(row['r'], row['g'], row['b']),
        children: []
      }
    })
    db.close()
    return res
  },
  getTag: async (id: string) => {
    if (id == "") return undefined
    var db = new sqlite3.Database(dbName);
    var row = await DBGet(db, "select * from tags where id=$id", { '$id': id })
    var tag: TagData = {
      id: row['id'],
      name: row['name'],
      color: Col.generate(row['r'], row['g'], row['b']),
      children: []
    }
    db.close()
    return tag
  },
  getWorksFromTags: async (ids: string[]) => {
    /*var db = new sqlite3.Database(dbName);
    var query = ids.map((t, i) => "tagid=? and ")
    var rows = await DBAll(db, "select * from tagworks where " + query, [ids])
    var res: string[] = rows.map((row) => row["workid"])
    db.close()
    return res*/
    return []
  },
  getRootTags: async () => {
    var db = new sqlite3.Database(dbName);
    var rows = await DBAll(db, "select * from tagchildren where parentid=$id", { '$id': "root" })
    var res: string[] = rows.map((row) => row['childid'])
    db.close()
    return res
  },
  getChildTags: async (tagId: string) => {
    var db = new sqlite3.Database(dbName);
    var rows = await DBAll(db, "select * from tagchildren where parentid=$id", { '$id': tagId })
    var res: string[] = rows.map((row) => row['childid'])
    db.close()
    return res
  },
  getParentTag: async (tagId: string) => {
    var db = new sqlite3.Database(dbName);
    var row = await DBGet(db, "select * from tagchildren where childid=$id", { '$id': tagId })
    db.close()
    var res: string = row['parentid']
    return res
  },


  //===============================================================================
  //insert (add)
  //===============================================================================
  insertWork: async (work: WorkData) => {
    console.log("start inserting")
    var db = new sqlite3.Database(dbName);
    await DBRun(db, "insert into works(id, title,image,createdAt) values ($id, $title, $image, $createdAt)",
      { '$id': work.id, '$title': work.title, '$image': work.image, '$createdAt': work.createdAt })
    for (var tag of work.tags) {
      await DBRun(db, "insert into tagworks(workid text, tagid text) values ($workid, $tagid)",
        { '$workid': work.id, '$tagid': tag })
    }
    db.close()
  },
  insertTag: async (tag: TagData) => {
    var db = new sqlite3.Database(dbName)
    await DBRun(db, "insert into tags(id, name, r, g, b,createdAt) values ($id, $name, $r, $g, $b,$createdAt)",
      { '$id': tag.id, '$name': tag.name, '$r': tag.color.r, '$g': tag.color.g, '$b': tag.color.b, '$createdAt': 0 })
    db.close()
  },
  insertTagToWork: async (workId: string, tagId: string) => {
    var db = new sqlite3.Database(dbName)
    await DBRun(db, "insert into tagworks(workid, tagid) values ($workid, $tagid)",
      { '$workid': workId, '$tagid': tagId })
    db.close()
  },
  addTagToParentTag: async (parentId: string, childId: string) => {
    var db = new sqlite3.Database(dbName)
    await DBRun(db, `insert into tagchildren(parentid, childid) values ($parentid, $childid)`,
      { '$parentid': parentId, '$childid': childId })
    db.close()
  },


  //===============================================================================
  //update
  //===============================================================================
  updateWork: async (id: string, title: string) => {
    var db = new sqlite3.Database(dbName)
    await DBRun(db, "update works set title=$title where id=$id",
      { '$id': id, '$title': title })
    db.close()
  },
  updateTag: async (id: string, name: string, color: Color) => {
    var db = new sqlite3.Database(dbName)
    await DBRun(db, "update tags set name=$name,r=$r,g=$g,b=$b where id=$id",
      { '$id': id, '$name': name, '$r': color.r, '$g': color.g, '$b': color.b })
    db.close()
  },


  //===============================================================================
  //delete
  //===============================================================================
  deleteWork: async (id: string) => {
    var db = new sqlite3.Database(dbName)
    await DBRun(db, "delete from works where id=$id", { '$id': id })
    db.close()
  },
  deleteTag: async (id: string) => {
    var db = new sqlite3.Database(dbName);
    await DBRun(db, "delete from tags where id=$id", { '$id': id })
    db.close()
  },
  deleteTagFromWork: async (workId: string, tagId: string) => {
    var db = new sqlite3.Database(dbName);
    await DBRun(db, "delete from tagworks where workid=$workid and tagid=$tagid",
      { '$workid': workId, '$tagid': tagId })
    db.close()
  },
  removeTagFromParentTag: async (parentId: string, childId: string) => {
    var db = new sqlite3.Database(dbName);
    await DBRun(db, "delete from tagchildren where parentid=$parentid and childid=$childid",
      { '$parentid': parentId, '$childid': childId })
    db.close()
  }
});