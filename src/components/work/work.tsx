import React, { CSSProperties, useMemo, useRef, useState } from 'react';
import Tag from '../tag/tag';
import '../../css/work.css';
import '../../css/popouts.css';
import WorkData from './work_data';
import TagData from '../tag/tag_data';
import { Popper, usePopper } from 'react-popper';
import { useClickAway, useDisclosure, useKeypress } from '../popout/popout_hooks';
import TagAddPopout from '../popout/tag_add_popout';
import WorkClickMenuPopout from '../popout/work_click_menu_popout';
import Popout from '../popout/popout';

interface WorkProps {
    data: WorkData
    tagAddPopout: JSX.Element
    idToTag: (id: string) => TagData | undefined
    onSelected: (data: WorkData) => void
    onWorkPreview: (data: WorkData) => void
    onRemoveTag: (work: WorkData, tag: TagData) => void
    onDeleteWork: (work: WorkData) => void
}

export default function Work(props: WorkProps) {
    const menureferenceRef = useRef<HTMLDivElement | null>(null);
    const { isOpen: ismenuOpen, open: menuopen, close: menuclose } = useDisclosure(false);

    const tagAddreferenceRef = useRef<HTMLButtonElement | null>(null);
    const { isOpen: istagAddOpen, open: tagAddopen, close: tagAddclose } = useDisclosure(false);

    const tags = useMemo(() => {
        console.log("generate tags " + props.data.tags.length)
        var t: JSX.Element[] = []
        for (let tag of props.data.tags) {
            var dat = props.idToTag(tag)
            if (!dat) continue
            t.push(
                <Tag
                    key={dat.id}
                    data={dat}
                    onTagRemove={(data_) => { props.onRemoveTag(props.data, data_) }}
                />
            )
        }
        return t
    }, [props.data.tags])

    return (
        <div className='work' onClick={() => { props.onSelected(props.data) }} onContextMenu={(e) => {
            e.preventDefault();
            menuopen()
        }} ref={menureferenceRef}>
            <div className=' p-2 work-bg'>
                <div className='work-thumb-container'>
                    <img className='work-thumb clickable-component' src={props.data.image} alt="t" />
                    <button className='work-preview-button' onClick={() => props.onWorkPreview(props.data)}>+</button>
                </div>
                <div className='work-title'><p>{props.data.title}</p></div>
                <div className='tags'>
                    {tags}
                    <button onClick={tagAddopen} ref={tagAddreferenceRef}>+</button>
                </div>
            </div>
            <Popout targetRef={tagAddreferenceRef} isOpen={istagAddOpen} close={tagAddclose}>
                {
                    props.tagAddPopout
                }
            </Popout>
            <Popout targetRef={menureferenceRef} isOpen={ismenuOpen} close={menuclose}>
                <WorkClickMenuPopout
                    work={props.data}
                    onDelete={(work) => { props.onDeleteWork(work) }}
                    tagAddPopout={props.tagAddPopout}
                />
            </Popout>
        </div>
    )
}
