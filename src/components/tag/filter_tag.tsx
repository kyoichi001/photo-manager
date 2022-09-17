import React from 'react';
import { Col } from '../../common/color';
import TagData from '../../value/tag_data';

interface FilterTagProps {
    data: TagData
    isChecked: boolean
    onClick: () => void
}
/**
 * タグのアクティブ・非アクティブを切り替えられるボタン
 * フィルター用
 * @param props 
 * @returns 
 */
export default function FilterTag(props: FilterTagProps) {
    var col = props.isChecked ? 0xFFFFFF : props.data.color
    var c = Col.brightness(Col.int2Color(col)) < 0.5 ? "text-gray-50" : "text-gray-900"
    c += " text-xs"
    return (
        <div className="rounded-sm p-0.5" onClick={props.onClick} style={{ backgroundColor: Col.numbertoHexString(col) }}>
            <div className={c}>
                {props.data.name}
            </div>
        </div>
    )
}
