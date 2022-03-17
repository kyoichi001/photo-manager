
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
    async addWork(file: File) {
        if (file.path === "") return
        let works = await this.getWorks()
        if (works.some((work) => work.image === file.path)) return//2重追加防止
        let w: WorkData = { id: Library.generateUuid(), title: file.name, image: file.path, createdAt: Date.now(), tags: [] }
        await window.myAPI.insertWork(w)
    }
    async deleteWork(id: string) {
        await window.myAPI.deleteWork(id)
    }
    async addTagToWork(workId: string, tagId: string) {
        await window.myAPI.insertTagToWork(workId, tagId)
    }
    async deleteTagFromWork(workId: string, tagId: string) {
        await window.myAPI.deleteTagFromWork(workId, tagId)
    }
    async editWork(id: string, title?: string) {
        if (!title) return
        await window.myAPI.updateWork(id, title)
    }

}