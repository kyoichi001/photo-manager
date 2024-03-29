import TagData from '../../../value/tag_data';
import Checkbox from '../../../components/common/checkbox';
import { TagIcon } from '@heroicons/react/solid';


interface FilterTagProps {
    tag: TagData
    checked: boolean
    onChange: () => void
}

export default function FilterTag(props: FilterTagProps) {

    return (
        <div className='border-b border-white flex space-x-1 items-center bg-gray-400 hover:bg-gray-500 bg-opacity-70 p-0.5 px-2' onClick={(e) => {
            e.stopPropagation()
            props.onChange()
        }}>
            <Checkbox
                checked={props.checked}
                onChange={(e) => {
                }}
            />
            <TagIcon className="h-4 w-4 text-gray-200 inline-block" />
            <div className=''>
                {props.tag.name}

            </div>
        </div>
    )
}
