import React, { useState } from 'react';
import Col from '../../common/col';
import '../../css/tag.css';
import TagData from './tag_data';

interface TagProps {
    data: TagData
    onTagRemove: (data: TagData) => void
}

export default function Tag(props: TagProps) {
    var col = props.data.color
    var c = Col.brightness(col) < 0.5 ? "tagname-dark" : "tagname-light"
    const [mouseOver, setMouseOver] = useState(false)
    var buttonStyle: React.CSSProperties = !mouseOver ? { color: Col.toString(col) } : {}

    return (
        <div className="tag" style={{ backgroundColor: Col.toString(col) }}
            onMouseOver={() => setMouseOver(true)}
            onMouseOut={() => setMouseOver(false)}
        >
            <div className={c}>
                <div className='tag-removebutton clickable-component' style={buttonStyle} onClick={() => props.onTagRemove(props.data)}>
                    x
                </div>
                <div>
                    {props.data.name}
                </div>
            </div>
        </div>
    )
}
