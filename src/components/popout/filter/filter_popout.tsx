import FilterTag from '../../tag/filter_tag';
import TagData from '../../../value/tag_data';


interface FilterPopoutProps {
    tags: TagData[]
    activeTags: boolean[]
    onClickTag: (index: number, setFlag: boolean) => void
}

export default function FilterPopout(props: FilterPopoutProps) {

    if (props.tags.length === 0) {
        return <div className='no-tags'>
            <p>タグがありません</p>
        </div>
    }

    return (
        <div className='bg-gray-400 p-1 shadow rounded-sm bg-opacity-70 backdrop-filter backdrop-blur-sm border-2 border-white'>
            <p>フィルター</p>
            <div className='flex gap-1'>
                {
                    props.tags.map((p, i) =>
                        <div key={p.id} >
                            <FilterTag data={p}
                                isChecked={props.activeTags[i]}
                                onClick={() => { props.onClickTag(i, !props.activeTags[i]) }}
                            />
                        </div>
                    )
                }
            </div>
        </div>
    )
}
