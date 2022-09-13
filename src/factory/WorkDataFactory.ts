import Library from "../common/library";
import WorkData from "../value/work_data";
import IWorkDataFactory from "./iWorkDataFactory";

class WorkDataFactory implements IWorkDataFactory {
    data: WorkData[] = []
    constructor(data_: WorkData[]) {
        this.data = data_
    }

    convert = (id: string) => {
        return this.data.find((w) => w.id === id)
    }

    create = (path: string) => {
        if (this.data.find((w) => w.image === path)) return undefined
        const res: WorkData = {
            id: Library.generateUuid(),
            image: path,
            tags: [],
            createdAt: 0
        }
        return res
    }
}

export default WorkDataFactory