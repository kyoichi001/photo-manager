import React, { ChangeEvent, CSSProperties, useMemo, useRef, useState } from 'react';
import TagData from '../../value/tag_data';
import { useClickAway, useDisclosure, useKeypress } from '../../hooks/popout_hooks';
import Popout from './popout';
//import "../../css/popouts.css"


interface TagClickMenuPopoutProps {
    tag: TagData
    onDelete: (tag: TagData) => void
    //groupAddPopout: JSX.Element
}

export default function TagClickMenuPopout(props: TagClickMenuPopoutProps) {

    const renamereferenceRef = useRef<HTMLLIElement | null>(null);
    const { isOpen: isrenameOpen, open: renameopen, close: renameclose } = useDisclosure(false);

    const tagAddreferenceRef = useRef<HTMLLIElement | null>(null);
    const { isOpen: isgroupAddOpen, open: groupAddopen, close: groupAddclose } = useDisclosure(false);

    const [newName, setNewName] = useState(props.tag.name)

    return (
        <div className='popout popout-bg-col'>
            <ul>
                <li onClick={() => { renameopen() }} ref={renamereferenceRef}><p>名前の変更</p></li>
                <li onClick={() => { groupAddopen() }} ref={tagAddreferenceRef}><p>グループへの追加</p></li>
                <li onClick={() => { props.onDelete(props.tag) }}><p>削除</p></li>
            </ul>

            <Popout targetRef={tagAddreferenceRef.current} isOpen={isgroupAddOpen} close={groupAddclose}>
            </Popout>
            <Popout targetRef={renamereferenceRef.current} isOpen={isrenameOpen} close={renameclose}>
                <div className='popout'>
                    <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} ></input>
                </div>
            </Popout>
        </div>
    )
}
