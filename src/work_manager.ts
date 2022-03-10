
import WorkData from "./components/work/work_data"
import Library from "./common/constants"

export default class WorkManager {
    public loadWorks: () => WorkData[]
    public saveWorks: (works: WorkData[]) => void

    constructor(loadWorks: () => WorkData[], saveWorks: (works: WorkData[]) => void) {
        this.saveWorks = saveWorks
        this.loadWorks = loadWorks
    }
    idToWork(id: string): WorkData | undefined {
        return this.loadWorks().find((w) => w.id === id)
    }
    addWork(file: File) {
        if (file.path === "") return
        let works = this.loadWorks()
        if (works.some((work) => work.image === file.path)) return//2重追加防止
        let w: WorkData = { id: Library.generateUuid(), title: file.name, image: file.path, createdAt: Date.now(), tags: [] }
        this.saveWorks([...works, w])
    }
    deleteWork(id: string) {
        let works = this.loadWorks()
        var t = works.filter((work) => work.id !== id)
        works = t
        this.saveWorks(works)
    }
    addTagToWork(workId: string, tagId: string) {
        let works = this.loadWorks()
        let w = works.find((w) => w.id === workId)
        if (!w) return
        if (w.tags.some((tag) => tag === tagId)) return
        console.log(w)
        w.tags = [...w.tags, tagId]
        this.saveWorks(works)
    }
    deleteTagFromWork(workId: string, tagId: string) {
        let works = this.loadWorks()
        let w = works.find((w) => w.id === workId)
        if (!w) return
        var t = w.tags.filter((tag) => tag !== tagId)
        w.tags = t
        this.saveWorks(works)
    }
    editWork(id: string, title?: string) {
        let work = this.idToWork(id)
        if (!work) return
        if (title) work.title = title
    }

}