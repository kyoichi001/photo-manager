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
    function onChange(e: ChangeEvent<HTMLInputElement>) {
        setNewTag(e.target.value)
    }

    const tags = useMemo(() => {
        const tags: JSX.Element[] = []
        if (!props.tags) return []
        props.tags.forEach((p, i) => {
            tags.push(
                <button key={p.id} onClick={() => { props.onClickTag(p) }}>{p.name}</button>
            )
        })
        return tags
    }, [props])
    return (
        <div className='popout-bg tagg-add-popout'>
            <div className='popout'>
                <p>追加するタブ</p>
                <input type="search" id="tag_search" name="tag_search" placeholder="Search or add tag" value={newtag} onChange={onChange}></input>
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
