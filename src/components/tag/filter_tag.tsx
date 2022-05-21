import React from 'react';
import { Col } from '../../common/color';
import '../../css/tag.css';
import TagData from './tag_data';

interface FilterTagProps {
    data: TagData
    isChecked: boolean
}

export default function FilterTag(props: FilterTagProps) {
    var col = props.isChecked ? 0xFFFFFF : props.data.color
    var c = Col.brightness(Col.int2Color(col)) < 0.5 ? "tagname-dark" : "tagname-light"

    return (
        <div className="tag clickable-component" style={{ backgroundColor: Col.numbertoHexString(col) }}>
            <div className={c}>
                {props.data.name}
            </div>
        </div>
    )
}
