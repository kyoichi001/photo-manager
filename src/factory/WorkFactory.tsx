import WorkTags from "../components/work/workTags";
import WorkThumb from "../components/work/workThumb";
import TagData from "../value/tag_data";
import WorkData from "../value/work_data";
import ITagDataFactory from "./iTagDataFactory";
import ITagFactory from "./iTagFactory";
import IWorkFactory from "./iWorkFactory";

class WorkFactory implements IWorkFactory {
    create = (data: WorkData,
        tagFactory: ITagFactory,
        tagDataFactory: ITagDataFactory,
        onTagPopoutOpen: (data: WorkData) => void,
        onTagRemove: (work: WorkData, tag: TagData) => void,
        onWorkPreview: (data: WorkData) => void
    ) => {
        return <div className='work h-min bg-gray-500 rounded-sm'>
            <WorkThumb
                data={data}
                onWorkPreview={onWorkPreview}
            />
            <WorkTags
                data={data}
                tagFactory={tagFactory}
                tagDataFactory={tagDataFactory}
                onTagPopoutOpen={onTagPopoutOpen}
                onTagRemove={onTagRemove}
            />
        </div>
    }
}
export default WorkFactory