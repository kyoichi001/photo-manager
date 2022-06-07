import React, { ChangeEvent, CSSProperties, useMemo, useRef, useState } from 'react';
import FilterTag from '../tag/filter_tag';
import TagData from '../tag/tag_data';
import WorkData from '../work/work_data';
import { useClickAway, useDisclosure, useKeypress } from './popout_hooks';
import { usePopper } from 'react-popper';
import Popout from './popout';


interface WorkClickMenuPopoutProps {
    work: WorkData
    onDelete: (work: WorkData) => void
    tagAddPopout: JSX.Element
}

export default function WorkClickMenuPopout(props: WorkClickMenuPopoutProps) {

    const tagAddreferenceRef = useRef<HTMLLIElement | null>(null);
    const { isOpen: istagAddOpen, open: tagAddopen, close: tagAddclose } = useDisclosure(false);

    return (
        <div className='popout popout-bg-col'>
            <ul>
                <li onClick={() => { props.onDelete(props.work) }}><p>削除</p></li>
                <li onClick={() => { tagAddopen() }} ref={tagAddreferenceRef}><p>タグの追加</p></li>
            </ul>

            <Popout targetRef={tagAddreferenceRef} isOpen={istagAddOpen} close={tagAddclose}>
                {
                    props.tagAddPopout
                }
            </Popout>
        </div>
    )
}
