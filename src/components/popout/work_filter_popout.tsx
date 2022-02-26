import React, { ChangeEvent, useMemo, useState } from 'react';
import FilterTag from '../tag/filter_tag';
import TagData from '../tag/tag_data';


interface WorkFilterPopoutProps {
    tags: TagData[]
    activeTags: boolean[]
    onClickTag: (index: number, setFlag: boolean) => void
}

export default function WorkFilterPopout(props: WorkFilterPopoutProps) {


    const tags = useMemo(() => {
        const tags: JSX.Element[] = []
        if (!props.tags) return []
        props.tags.forEach((p, i) => {
            tags.push(
                <div key={p.id} onClick={() => { props.onClickTag(i, !props.activeTags[i]) }}>
                    <FilterTag data={p} isChecked={props.activeTags[i]} ></FilterTag>
                </div>
            )
        })
        return tags
    }, [props])
    return (
        <div className='tagg-add-popout'>
            <div className='window'>
                <h2>tags</h2>
                {tags}
            </div>
        </div>
    )
}
