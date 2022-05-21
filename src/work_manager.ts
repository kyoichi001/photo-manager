
import WorkData from "./components/work/work_data"
import Library from "./common/constants"
import { getSaveFileDirectory } from "./saveload"

export default class WorkManager {

    onDataSaved: () => void
    constructor(onDataSaved: () => void) {
        this.onDataSaved = onDataSaved
    }

    getSaveFilePath() {
        return getSaveFileDirectory() + "\\works.json"
    }

    async writeWorkData(data: WorkData[]) {
        let path = this.getSaveFilePath()
        if (!window.myAPI.existsFile(path)) {
        }
        let jsonData = {
            "meta": {
                "save_format_version": "0.0.1"
            },
            "works": data
        }
        await window.myAPI.writeFileAsync(path, JSON.stringify(jsonData))
    }

    jsonToData(data: any): WorkData[] {
        let works: any[] = data["works"]
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
    }

    async getWorks(): Promise<WorkData[]> {
        let path = this.getSaveFilePath()
        if (!window.myAPI.existsFile(path)) {
            return []
        }
        let file = await window.myAPI.readFileAsync(path)
        let data = this.jsonToData(JSON.parse(file))
        return data
    }
    async idToWork(id: string): Promise<WorkData | undefined> {
        try {
            let data = await this.getWorks()
            return data.find((w) => w.id === id)
        } catch (e) {
            return undefined
        }
    }

    async addWorks(files: File[]) {
        let works = await this.getWorks()
        for (var f of files) {
            if (f.path === "") return
            if (works.some((work) => work.image === f.path)) return//2重追加防止
            let w: WorkData = { id: Library.generateUuid(), title: f.name, image: f.path, createdAt: Date.now(), tags: [] }
            works.push(w)
        }
        await this.writeWorkData(works)
        this.onDataSaved()
    }

    async addWork(file: File) {
        if (file.path === "") return
        let works = await this.getWorks()
        if (works.some((work) => work.image === file.path)) return//2重追加防止
        let w: WorkData = { id: Library.generateUuid(), title: file.name, image: file.path, createdAt: Date.now(), tags: [] }
        works.push(w)
        await this.writeWorkData(works)
        this.onDataSaved()
    }

    async deleteWork(id: string) {
        let works = await this.getWorks()
        works = works.filter((w) => w.id !== id)
        await this.writeWorkData(works)
        this.onDataSaved()
    }

    async addTagToWork(workId: string, tagId: string) {
        let works = await this.getWorks()
        works.find((w) => w.id === workId)?.tags.push(tagId)
        await this.writeWorkData(works)
        this.onDataSaved()
    }

    async deleteTagFromWork(workId: string, tagId: string) {
        let works = await this.getWorks()
        works.map((w) => {
            if (w.id === workId) {
                w.tags = w.tags.filter((t) => t !== tagId)
            }
            return w
        })
        await this.writeWorkData(works)
        this.onDataSaved()
    }
}