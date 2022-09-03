import FilterTag from '../../tag/filter_tag';
import TagData from '../../tag/tag_data';


interface TagFilterProps {
    tags: TagData[]
    activeTags: boolean[]
    onClickTag: (index: number, setFlag: boolean) => void
}

export default function TagFilter(props: TagFilterProps) {

    if (props.tags.length === 0) {
        return <div className='no-tags'>
            <p>タグがありません</p>
        </div>
    }

    return (
        <div className='bg-gray-400 p-1 shadow rounded-sm bg-opacity-70 backdrop-filter backdrop-blur-sm border-2 border-white'>

        </div>
    )
}
