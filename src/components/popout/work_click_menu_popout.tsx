import React, { ChangeEvent, CSSProperties, useMemo, useRef, useState } from 'react';
import FilterTag from '../tag/filter_tag';
import TagData from '../tag/tag_data';
import '../../css/tag.css';
import "../../css/common.css"
import WorkData from '../work/work_data';
import { useClickAway, useDisclosure, useKeypress } from './popout_hooks';
import { usePopper } from 'react-popper';
//import "../../css/popouts.css"


interface WorkClickMenuPopoutProps {
    work: WorkData
    onDelete: (work: WorkData) => void
    tagAddPopout: JSX.Element
}

export default function WorkClickMenuPopout(props: WorkClickMenuPopoutProps) {

    const tagAddreferenceRef = useRef<HTMLLIElement | null>(null);
    const tagAddpopperRef = useRef<HTMLDivElement | null>(null);
    const { styles, attributes } = usePopper(
        tagAddreferenceRef.current,
        tagAddpopperRef.current,
        {
            placement: 'bottom',
        }
    );
    const { isOpen: istagAddOpen, open: tagAddopen, close: tagAddclose } = useDisclosure(false);
    useClickAway(tagAddpopperRef, tagAddclose);
    useKeypress('Escape', tagAddclose);

    return (
        <div className='popout popout-bg-col'>
            <ul>
                <li onClick={() => { props.onDelete(props.work) }}><p>削除</p></li>
                <li onClick={() => { tagAddopen() }} ref={tagAddreferenceRef}><p>タグの追加</p></li>
            </ul>

            <div ref={tagAddpopperRef} style={{
                ...styles.popper
            }
            } {
                ...attributes.popper
                }>
                {
                    istagAddOpen &&
                    <>
                        {
                            props.tagAddPopout
                        }
                    </>
                }
            </div>
        </div>
    )
}
