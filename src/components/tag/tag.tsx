import React, { ReactNode, useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import { Col } from '../../common/color';
import Popout from '../popout/popout';
import { useClickAway, useDisclosure, useKeypress } from '../popout/popout_hooks';
import TagClickMenuPopout from '../popout/tag_click_menu_popout';
import TagData from './tag_data';

interface TagProps {
    data: TagData
    onTagRemove: (data: TagData) => void
}

export default function Tag(props: TagProps) {
    const menureferenceRef = useRef<HTMLDivElement | null>(null);
    const { isOpen: ismenuOpen, open: menuopen, close: menuclose } = useDisclosure(false);

    var col = props.data.color
    var c = Col.brightness(Col.int2Color(col)) < 0.5 ? "tagname-dark" : "tagname-light"
    c += " flex p-0.5 text-xs"
    const [mouseOver, setMouseOver] = useState(false)
    var buttonStyle: React.CSSProperties = !mouseOver ? { color: Col.numbertoHexString(col) } : {}

    return (
        <div className="rounded-md" style={{ backgroundColor: Col.numbertoHexString(col) }} ref={menureferenceRef}
            onMouseOver={() => setMouseOver(true)}
            onMouseOut={() => setMouseOver(false)}
        >
            <div className={c}>
                <button className='px-1' style={buttonStyle} onClick={() => props.onTagRemove(props.data)}>
                    x
                </button>
                <div>
                    {props.data.name}
                </div>
            </div>

            <Popout targetRef={menureferenceRef} isOpen={ismenuOpen} close={menuclose}>
                <TagClickMenuPopout
                    tag={props.data}
                    onDelete={(tag: TagData) => props.onTagRemove(tag)}
                //groupAddPopout={props.groupAddPopout}
                />
            </Popout>
        </div>
    )
}
