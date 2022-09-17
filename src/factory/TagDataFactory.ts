import { Col } from "../common/color";
import Library from "../common/library";
import TagData from "../value/tag_data";
import ITagDataFactory from "./iTagDataFactory";

class TagDataFactory implements ITagDataFactory {
    data: TagData[] = []
    constructor(data_: TagData[]) {
        this.data = data_
    }

    create = (name: string) => {
        const res: TagData = {
            id: Library.generateUuid(),
            name: name,
            color: Col.hexstringToColor("#FFFFFF"),
            children: []
        }
        return res
    }
    convert = (id: string) => {
        return this.data.find((t) => t.id === id)
    }
}
export default TagDataFactory