import Tag from "../components/tag/tag";
import TagData from "../value/tag_data";
import ITagFactory from "./iTagFactory";

class TagFactory implements ITagFactory {
    create = (data: TagData, onTagRemove: (data: TagData) => void) => {
        return <Tag
            data={data}
            onTagRemove={onTagRemove}
        />
    }
}
export default TagFactory