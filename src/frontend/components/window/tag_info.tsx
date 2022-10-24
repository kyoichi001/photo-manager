import React, { useMemo } from 'react';
import { Col } from '../../../common/color';
import TagData from '../../../entity/tag_data';

interface TagInfoProps {
    tag?: TagData
    deleteTag: (tag: TagData | undefined) => void
    onChangeTagName: (tag: TagData | undefined, newName: string) => void
    onChangeColor: (tag: TagData | undefined, newValue: number) => void
}

export default function TagInfo(props: TagInfoProps) {
    console.log("render taginfo " + props.tag?.name)
    if (!props.tag) {
        return (
            <div className='tag-info'>
                <p>タグが選択されていません</p>
            </div>
        )
    }

    return (
        <div className='tag-info'>
            <div className='tag-name'>
                <p>タグ名</p>
                <input type="text" id="name" name="name"
                    value={props.tag.name}
                    onChange={(e) => { props.onChangeTagName(props.tag, e.target.value) }}></input>
            </div>
            <p>色</p>
            <input type="color" id="color" name="color"
                value={Col.numbertoHexString(props.tag.color)}
                onChange={(e) => props.onChangeColor(props.tag, Col.hexstringToColor(e.target.value))}>
            </input>
            <p>{Col.numbertoHexString(props.tag.color)}</p>
            <p>作成日：**/**/**</p>
            <p>ID {props.tag.id}</p>
            <button onClick={() => props.deleteTag(props.tag)}>
                削除
            </button>
        </div>
    )
}
