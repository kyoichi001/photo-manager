import React from 'react';
import Col from '../../common/col';
import '../../css/tag.css';
import TagData from './tag_data';

interface TagProps {
    data: TagData
}

export default function Tag(props: TagProps) {
    var col = props.data.color
    var c = Col.brightness(col) < 0.5 ? "tagname-dark" : "tagname-light"
    return (
        <div className="tag" style={{ backgroundColor: col.toString() }}>
            <div className={c}>
                {props.data.name}
            </div>
        </div>
    )
}
