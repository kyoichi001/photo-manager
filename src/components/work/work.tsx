import React, { CSSProperties, useMemo, useRef, useState } from 'react';
import Tag from '../tag/tag';
import WorkData from './work_data';
import TagData from '../tag/tag_data';
import { Popper, usePopper } from 'react-popper';
import { useClickAway, useDisclosure, useKeypress } from '../popout/popout_hooks';
import TagAddPopout from '../popout/tag_add_popout';
import WorkClickMenuPopout from '../popout/work_click_menu_popout';
import Popout from '../popout/popout';
import { SearchIcon } from '@heroicons/react/solid';

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

    const tagAddreferenceRef = useRef<HTMLDivElement | null>(null);
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
        <div className='work h-min bg-gray-500 rounded-sm' onClick={() => { props.onSelected(props.data) }} onContextMenu={(e) => {
            e.preventDefault();
            menuopen()
        }} ref={menureferenceRef}>
            <div className='max-h-48 overflow-hidden relative rounded-t-sm'>
                <img className='' src={props.data.image} alt="t" />
                <div className='shadow bg-gray-600 hover:bg-gray-700 bg-opacity-50 absolute bottom-0 left-0 w-min p-1 backdrop-filter backdrop-blur-sm' onClick={() => props.onWorkPreview(props.data)}>
                    <SearchIcon className="h-5 w-5 text-gray-200" />
                </div>
            </div>
            <div className='flex p-1 gap-1'>
                {tags}
                <div className='bg-gray-300 hover:bg-gray-400 rounded-sm shadow' onClick={tagAddopen} ref={tagAddreferenceRef}>+</div>
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
