
import WorkData from "./components/work/work_data"
import Library from "./common/constants"

export default class WorkManager {

    onDataSaved: () => void
    constructor(onDataSaved: () => void) {
        this.onDataSaved = onDataSaved
    }

    async getWorks(): Promise<WorkData[]> {
        return await window.myAPI.getWorks()
    }
    async idToWork(id: string): Promise<WorkData | undefined> {
        try {
            return await window.myAPI.getWork(id)
        } catch (e) {
            return undefined
        }
    }
    async addWorks(files: File[]) {
        for (var f of files) {
            if (f.path === "") return
            let works = await this.getWorks()
            if (works.some((work) => work.image === f.path)) return//2重追加防止
            let w: WorkData = { id: Library.generateUuid(), title: f.name, image: f.path, createdAt: Date.now(), tags: [] }
            await window.myAPI.insertWork(w)
        }
        this.onDataSaved()
    }
    async addWork(file: File) {
        if (file.path === "") return
        let works = await this.getWorks()
        if (works.some((work) => work.image === file.path)) return//2重追加防止
        let w: WorkData = { id: Library.generateUuid(), title: file.name, image: file.path, createdAt: Date.now(), tags: [] }
        await window.myAPI.insertWork(w)
        this.onDataSaved()
    }
    async deleteWork(id: string) {
        await window.myAPI.deleteWork(id)
        this.onDataSaved()
    }
    async addTagToWork(workId: string, tagId: string) {
        await window.myAPI.insertTagToWork(workId, tagId)
        this.onDataSaved()
    }
    async deleteTagFromWork(workId: string, tagId: string) {
        await window.myAPI.deleteTagFromWork(workId, tagId)
        this.onDataSaved()
    }
    async editWork(id: string, title?: string) {
        if (!title) return
        await window.myAPI.updateWork(id, title)
        this.onDataSaved()
    }

}