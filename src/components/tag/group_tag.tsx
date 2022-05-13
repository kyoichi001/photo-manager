import React from 'react';
import '../../css/tag.css';
import TagData from './tag_data';

interface GroupTagProps {
    tag: TagData
    idToTag: (id: string) => TagData
}

export default function GroupTag(props: GroupTagProps) {

    var children: TagData[] = []
    for (var tag of props.tag.children) {
        var dat = props.idToTag(tag)
        if (!dat) continue
        children.push(dat)
    }

    return (
        <div className="grouptag">
            <div className="tag-name">
                {props.tag.name}
            </div>
            <div className='tag-container'>

            </div>
        </div>
    )
}
