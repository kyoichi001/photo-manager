import TagData from "../value/tag_data";

interface ITagFactory {
    create: (data: TagData, onTagRemove: (data: TagData) => void) => JSX.Element
}
export default ITagFactory