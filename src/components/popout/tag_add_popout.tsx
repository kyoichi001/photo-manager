import React, { ChangeEvent, useMemo, useState } from 'react';
import TagData from '../tag/tag_data';
import "../../css/common.css"
import "../../css/popouts.css"

interface TagAddPopoutProps {
    tags: TagData[]
    onClickTag: (tag: TagData) => void
    onCreateTag: (name: string) => void
}

export default function TagAddPopout(props: TagAddPopoutProps) {

    const [newtag, setNewTag] = useState('');

    const tags = props.tags.map((p, i) => {
        return <button key={p.id} onClick={() => { props.onClickTag(p) }}>{p.name}</button>
    })

    return (
        <div className='popout popout-bg-col tagg-add-popout'>
            <div className=''>
                <p>追加するタグ</p>
                <input type="search" id="tag_search" name="tag_search" placeholder="Search or add tag" value={newtag} onChange={(e) => setNewTag(e.target.value)}></input>
                <div className='add-new-tag'>
                    <button onClick={() => { props.onCreateTag(newtag) }}>新規作成：{newtag}</button>
                </div>
                <div className='tags'>
                    {tags}
                </div>
            </div>
        </div>
    )
}
