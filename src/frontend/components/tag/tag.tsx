import React, { ReactNode, useRef, useState } from 'react';
import { Col } from '../../../common/color';
import Popout from '../popout/popout';
import { useClickAway, useDisclosure, useKeypress } from '../../hooks/popout_hooks';
import TagClickMenuPopout from '../popout/tag_click_menu_popout';
import TagData from '../../../entity/tag_data';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface TagProps {
    data: TagData
    onTagRemove: (data: TagData) => void
}

export default function Tag(props: TagProps) {
    var col = props.data.color
    var c = Col.brightness(Col.int2Color(col)) < 0.5 ? "tagname-dark" : "tagname-light"
    c += " flex p-0.5 text-xs"
    const [mouseOver, setMouseOver] = useState(false)
    var buttonStyle: React.CSSProperties = !mouseOver ? { color: Col.numbertoHexString(col) } : {}

    return (
        <div className="rounded-md" style={{ backgroundColor: Col.numbertoHexString(col) }}
            onMouseOver={() => setMouseOver(true)}
            onMouseOut={() => setMouseOver(false)}
        >
            <div className={c}>
                <button className='px-1' style={buttonStyle} onClick={() => props.onTagRemove(props.data)}>
                    <XMarkIcon className='h-3 w-3 inline-block' />
                </button>
                <div>
                    {props.data.name}
                </div>
            </div>
        </div>
    )
}
