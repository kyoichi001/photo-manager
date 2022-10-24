import Library from "../../common/library";
import WorkData from "../../entity/work_data";
import IWorkDataFactory from "./iWorkDataFactory";

class WorkDataFactory implements IWorkDataFactory {
    data: WorkData[] = []
    constructor(data_: WorkData[]) {
        this.data = data_
    }

    convert = (path: string) => {
        return this.data.find((w) => w.path === path)
    }

    create = (path: string) => {
        if (this.data.find((w) => w.path === path)) return undefined
        const res: WorkData = {
            path: path,
            tags: [],
        }
        return res
    }
}

export default WorkDataFactory