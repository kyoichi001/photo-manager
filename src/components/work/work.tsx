import React, { CSSProperties, useMemo, useRef, useState } from 'react';
import Tag from '../tag/tag';
import WorkData from './work_data';
import TagData from '../tag/tag_data';
import { useClickAway, useDisclosure, useKeypress } from '../popout/popout_hooks';
import WorkClickMenuPopout from '../popout/work_click_menu_popout';
import Popout from '../popout/popout';
import { SearchIcon, PlusIcon } from '@heroicons/react/solid';

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
            <div className='relative rounded-t-sm'>
                <img className='object-contain h-48 w-full' src={props.data.image} alt="t" />
                <div className='transition duration-75 ease-linear z-10 absolute bottom-0 left-0 bg-black opacity-0 h-48 w-full hover:opacity-60'>
                    <div className='z-20 bg-gray-600 hover:bg-gray-900 shadow rounded-sm absolute bottom-1 left-1 w-min p-1' onClick={() => props.onWorkPreview(props.data)}>
                        <SearchIcon className="hover:text-opacity-100 h-24 w-24 text-gray-100 hover:opacity-100 hover:bg-opacity-100" />
                    </div>
                </div>
            </div>
            <div className='flex p-1 gap-1'>
                {tags}
                <div className='bg-gray-300 hover:bg-gray-400 rounded-sm shadow h-4' onClick={tagAddopen} ref={tagAddreferenceRef}>
                    <PlusIcon className="h-4 w-4 text-gray-800" />
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
