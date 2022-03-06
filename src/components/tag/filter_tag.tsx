import React from 'react';
import Col from '../../common/col';
import '../../css/tag.css';
import TagData from './tag_data';

interface FilterTagProps {
    data: TagData
    isChecked: boolean
}

export default function FilterTag(props: FilterTagProps) {
    var col = props.isChecked ? { "r": 100, "g": 100, "b": 255, "a": 1 } : props.data.color
    var c = Col.brightness(col) < 0.5 ? "tagname-dark" : "tagname-light"

    return (
        <div className="tag clickable-component" style={{ backgroundColor: Col.toString(col) }}>
            <div className={c}>
                {props.data.name}
            </div>
        </div>
    )
}
