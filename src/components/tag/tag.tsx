import React, { ReactNode, useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import { Col } from '../../common/color';
import '../../css/tag.css';
import { useClickAway, useDisclosure, useKeypress } from '../popout/popout_hooks';
import TagClickMenuPopout from '../popout/tag_click_menu_popout';
import TagData from './tag_data';

interface TagProps {
    data: TagData
    onTagRemove: (data: TagData) => void
}

export default function Tag(props: TagProps) {
    const menureferenceRef = useRef<HTMLDivElement | null>(null);
    const menupopperRef = useRef<HTMLDivElement | null>(null);
    const { styles: menustyles, attributes: menuattributes } = usePopper(
        menureferenceRef.current,
        menupopperRef.current,
        {
            placement: 'bottom'
        }
    );
    const { isOpen: ismenuOpen, open: menuopen, close: menuclose } = useDisclosure(false);
    useClickAway(menupopperRef, menuclose);
    useKeypress('Escape', menuclose);

    var col = props.data.color
    var c = Col.brightness(col) < 0.5 ? "tagname-dark" : "tagname-light"
    const [mouseOver, setMouseOver] = useState(false)
    var buttonStyle: React.CSSProperties = !mouseOver ? { color: Col.toString(col) } : {}

    return (
        <div className="tag" style={{ backgroundColor: Col.toString(col) }} ref={menureferenceRef}
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
            <div ref={menupopperRef} style={{
                ...menustyles.popper
            }
            } {
                ...menuattributes.popper
                }>
                {
                    ismenuOpen &&
                    <>
                        {
                            <TagClickMenuPopout
                                tag={props.data}
                                onDelete={(tag: TagData) => props.onTagRemove(tag)}
                            //groupAddPopout={props.groupAddPopout}
                            />
                        }
                    </>
                }
            </div>
        </div>
    )
}
