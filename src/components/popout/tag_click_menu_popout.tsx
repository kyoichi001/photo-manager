import React, { ChangeEvent, CSSProperties, useMemo, useRef, useState } from 'react';
import FilterTag from '../tag/filter_tag';
import TagData from '../tag/tag_data';
import '../../css/tag.css';
import "../../css/common.css"
import WorkData from '../work/work_data';
import { useClickAway, useDisclosure, useKeypress } from './popout_hooks';
import { usePopper } from 'react-popper';
//import "../../css/popouts.css"


interface TagClickMenuPopoutProps {
    tag: TagData
    onDelete: (tag: TagData) => void
    //groupAddPopout: JSX.Element
}

export default function TagClickMenuPopout(props: TagClickMenuPopoutProps) {

    const renamereferenceRef = useRef<HTMLLIElement | null>(null);
    const renamepopperRef = useRef<HTMLDivElement | null>(null);
    const { styles: renamestyles, attributes: renameattributes } = usePopper(
        renamereferenceRef.current,
        renamepopperRef.current,
        {
            placement: 'bottom',
        }
    );
    const { isOpen: isrenameOpen, open: renameopen, close: renameclose } = useDisclosure(false);
    useClickAway(renamepopperRef, renameclose);
    useKeypress('Escape', renameclose);

    const tagAddreferenceRef = useRef<HTMLLIElement | null>(null);
    const tagAddpopperRef = useRef<HTMLDivElement | null>(null);
    const { styles, attributes } = usePopper(
        tagAddreferenceRef.current,
        tagAddpopperRef.current,
        {
            placement: 'bottom',
        }
    );
    const { isOpen: isgroupAddOpen, open: groupAddopen, close: groupAddclose } = useDisclosure(false);
    useClickAway(tagAddpopperRef, groupAddclose);
    useKeypress('Escape', groupAddclose);

    const [newName, setNewName] = useState(props.tag.name)

    return (
        <div className='popout popout-bg-col'>
            <ul>
                <li onClick={() => { renameopen() }} ref={renamereferenceRef}><p>名前の変更</p></li>
                <li onClick={() => { groupAddopen() }} ref={tagAddreferenceRef}><p>グループへの追加</p></li>
                <li onClick={() => { props.onDelete(props.tag) }}><p>削除</p></li>
            </ul>

            <div ref={tagAddpopperRef} style={{
                ...styles.popper,
            }
            } {
                ...attributes.popper
                }>
                {
                    isgroupAddOpen &&
                    <>
                        {
                            // props.groupAddPopout
                        }
                    </>
                }
            </div>
            <div ref={renamepopperRef} style={{
                ...renamestyles.popper,
            }
            } {
                ...renameattributes.popper
                }>
                {
                    isrenameOpen &&
                    <div className='popout'>
                        <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} ></input>
                    </div>
                }
            </div>
        </div>
    )
}
