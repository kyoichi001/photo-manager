import React, { CSSProperties, useMemo, useRef, useState } from 'react';
import WorkData from '../../value/work_data';
import TagData from '../../value/tag_data';
import { useClickAway, useDisclosure, useKeypress } from '../../hooks/popout_hooks';
import WorkClickMenuPopout from '../popout/work_click_menu_popout';
import Popout from '../popout/popout';
import { SearchIcon, PlusIcon } from '@heroicons/react/solid';
import ITagFactory from '@/factory/iTagFactory';
import ITagDataFactory from '@/factory/iTagDataFactory';

interface WorkProps {
    data: WorkData
    tagFactory: ITagFactory
    tagDataFactory: ITagDataFactory
    onTagPopoutOpen: (data: WorkData) => void
    onWorkPreview: (data: WorkData) => void
    onTagRemove: (work: WorkData, tag: TagData) => void
}

export default function Work(props: WorkProps) {
    const tags = useMemo(() => {
        console.log("generate tags " + props.data.tags.length)
        var t: JSX.Element[] = []
        for (let tag of props.data.tags) {
            var dat = props.tagDataFactory.convert(tag)
            if (!dat) continue
            t.push(props.tagFactory.create(dat, (tag) => props.onTagRemove(props.data, tag)))
        }
        return t
    }, [props.data.tags])

    return (
        <div className='work h-min bg-gray-500 rounded-sm'>
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
                <div className='bg-gray-300 hover:bg-gray-400 rounded-sm shadow h-4' onClick={() => props.onTagPopoutOpen(props.data)}>
                    <PlusIcon className="h-4 w-4 text-gray-800" />
                </div>
            </div>
        </div>
    )
}
