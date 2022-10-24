import FilterTag from './filter_tag';
import TagData from '../../../../entity/tag_data';

interface WorkFilterPopoutProps {
    tags: TagData[]
    activeTags: boolean[]
    onClickTag: (index: number, setFlag: boolean) => void
}

export default function WorkFilterPopout(props: WorkFilterPopoutProps) {

    if (props.tags.length === 0) {
        return <div className='bg-gray-400 p-1 shadow rounded-sm bg-opacity-70 backdrop-filter backdrop-blur-sm border-2 border-white'>
            <p>タグがありません</p>
        </div>
    }

    return (
        <div className='bg-gray-400 shadow rounded-sm bg-opacity-70 backdrop-filter backdrop-blur-sm border-2 border-white'>
            <p className='text-lg font-bold p-1'>フィルター</p>
            <div className='gap-1'>
                {
                    props.tags.map((p, i) =>
                        <div key={p.id} >
                            <FilterTag
                                tag={p}
                                checked={props.activeTags[i]}
                                onChange={() => {
                                    props.onClickTag(i, !props.activeTags[i])
                                }}
                            />
                        </div>
                    )
                }
            </div>
        </div>
    )
}
