import TagData from "../value/tag_data"
import WorkData from "../value/work_data"
import ITagDataFactory from "./iTagDataFactory"
import ITagFactory from "./iTagFactory"

interface IWorkFactory {
    create: (
        data: WorkData,
        tagFactory: ITagFactory,
        tagDataFactory: ITagDataFactory,
        onTagPopoutOpen: (data: WorkData) => void,
        onTagRemove: (work: WorkData, tag: TagData) => void,
        onWorkPreview: (data: WorkData) => void
    ) => JSX.Element
}
export default IWorkFactory
