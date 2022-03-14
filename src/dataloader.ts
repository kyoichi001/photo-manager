
import Col from "./common/col"
import Color from "./common/color"
import TagData from "./components/tag/tag_data"
import WorkData from "./components/work/work_data"

export default class DataLoader {

    static GetDataDirectory() {
        return window.myAPI.getRoaming() + "/photo-manager/data/"
    }

    static SetupDirectory() {
        window.myAPI.createDirectory(this.GetDataDirectory())
    }

    static TagsPath(): string {
        return this.GetDataDirectory() + "tags.json"
    }
    static LoadTags(): TagData[] {
        const data = JSON.parse(window.myAPI.loadJSON(this.TagsPath()))["tags"]
        if (!data) return []
        var tags: TagData[] = []
        for (var tag of data) {
            tags.push({
                id: tag["id"],
                name: tag["name"],
                color: Col.obj2Color(tag["color"])
            })
        }
        return tags
    }
    static LoadTag(id: string): TagData | undefined {
        const data = JSON.parse(window.myAPI.loadJSON(this.TagsPath()))["tags"]
        if (!data) return undefined
        for (var tag of data) {
            if (tag["id"] === id) {
                return {
                    id: tag["id"],
                    name: tag["name"],
                    color: Col.obj2Color(tag["color"])
                }
            }
        }
        return undefined
    }
    static SaveTags(tags: TagData[]) {
        const p = this.TagsPath()
        var res = {
            tags: tags
        }
        var j = JSON.stringify(res)
        //console.log(j)
        window.myAPI.writeFile(p, j)
    }
    static SaveTag(tag_: TagData) {
        let tags = this.LoadTags()
        for (let tag of tags) {
            if (tag.id === tag_.id) {
                tag.name = tag_.name
                tag.color = tag_.color
            }
        }
        this.SaveTags(tags)
    }



    static WorksPath(): string {
        return this.GetDataDirectory() + "works.json"
    }
    static LoadWorks(): WorkData[] {
        const data = JSON.parse(window.myAPI.loadJSON(this.WorksPath()))["works"]
        if (!data) return []
        var works: WorkData[] = []
        for (var work of data) {
            var w: WorkData = {
                id: work["id"],
                title: work["title"],
                image: work["image"],
                createdAt: work["createdAt"] ?? Date.now(),
                tags: work["tags"]
            }
            works.push(w)
        }
        return works
    }
    static LoadWork(id: string): WorkData | undefined {
        const data = JSON.parse(window.myAPI.loadJSON(this.WorksPath()))["works"]
        if (!data) return undefined
        for (var work of data) {
            if (work["id"] === id) {
                return {
                    id: work["id"],
                    title: work["title"],
                    image: work["image"],
                    createdAt: work["createdAt"] ?? Date.now().toString(),
                    tags: work["tags"]
                }
            }
        }
        return undefined
    }
    static SaveWorks(works: WorkData[]) {
        const p = this.WorksPath()
        var res = {
            works: works
        }
        var j = JSON.stringify(res)
        console.log(j)
        console.log(p)
        window.myAPI.writeFile(p, j)
    }
    static SaveWork(work_: WorkData) {
        let works = this.LoadWorks()
        for (let work of works) {
            if (work.id === work_.id) {
                work.title = work_.title
                work.image = work_.image
                work.createdAt = work_.createdAt
                work.tags = work_.tags
                work.extention = work_.extention
            }
        }
        this.SaveWorks(works)
    }
}