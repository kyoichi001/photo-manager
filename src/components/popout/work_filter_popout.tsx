import React, { ChangeEvent, useMemo, useState } from 'react';
import FilterTag from '../tag/filter_tag';
import TagData from '../tag/tag_data';
import '../../css/tag.css';
import "../../css/common.css"
//import "../../css/popouts.css"


interface WorkFilterPopoutProps {
    tags: TagData[]
    activeTags: boolean[]
    onClickTag: (index: number, setFlag: boolean) => void
}

export default function WorkFilterPopout(props: WorkFilterPopoutProps) {

    if (props.tags.length === 0) {
        return <div className='no-tags'>
            <p>タグがありません</p>
        </div>
    }

    return (
        <div className='popout popout-bg-col'>
            <div className=''>
                <p>フィルター</p>
                <div className='tags'>
                    {
                        props.tags.map((p, i) =>
                            <div key={p.id} onClick={() => { props.onClickTag(i, !props.activeTags[i]) }}>
                                <FilterTag data={p} isChecked={props.activeTags[i]} ></FilterTag>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
