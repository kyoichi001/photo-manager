import TagData from '@/entity/tag_data';
import React, { ChangeEvent, useMemo, useState } from 'react';

interface TagAddPopoutProps {
    tags?: TagData[]
    onClickTag: (tag: TagData) => void
    onCreateTag: (name: string) => void
}

export default function TagAddPopout(props: TagAddPopoutProps) {

    const [newtag, setNewTag] = useState('');

    return (
        <div className='bg-gray-400 p-1 shadow rounded-sm bg-opacity-75 w-full backdrop-filter backdrop-blur-sm drop-shadow-md border-2 border-white'>
            <p className='py-1'>追加するタグ</p>
            <input type="search" id="tag_search" name="tag_search" placeholder="Search or add tag" value={newtag} onChange={(e) => setNewTag(e.target.value)}></input>
            {
                newtag !== "" ?
                    <div className='bg-gray-300 hover:bg-gray-400 rounded-sm shadow m-1 p-1'>
                        <button onClick={() => { props.onCreateTag(newtag) }}>新規作成：{newtag}</button>
                    </div> :
                    <></>
            }
            <div className='flex gap-1'>
                {
                    props.tags ?
                        props.tags.map((p) =>
                            <button className='bg-gray-300 hover:bg-gray-400 rounded-sm shadow p-0.5 text-xs' key={p.id} onClick={() => { props.onClickTag(p) }}>
                                {p.name}
                            </button>
                        ) :
                        <p>ロード中...</p>
                }
            </div>
        </div>
    )
}
