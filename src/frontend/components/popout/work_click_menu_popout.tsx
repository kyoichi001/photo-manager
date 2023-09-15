import React, { ChangeEvent, CSSProperties, useMemo, useRef, useState } from 'react';
import WorkData from '../../../entity/work_data';
import { useClickAway, useDisclosure, useKeypress } from '../../hooks/popout_hooks';
import Popout from './popout';
import { TrashIcon, TagIcon } from '@heroicons/react/24/solid';


interface WorkClickMenuPopoutProps {
    work: WorkData
    tagAddPopout: JSX.Element
}

export default function WorkClickMenuPopout(props: WorkClickMenuPopoutProps) {

    const tagAddreferenceRef = useRef<HTMLDivElement | null>(null);
    const { isOpen: istagAddOpen, open: tagAddopen, close: tagAddclose } = useDisclosure(false);

    return (
        <div className='bg-gray-400 p-1 shadow rounded-sm bg-opacity-75 w-full backdrop-filter backdrop-blur-sm drop-shadow-md border-2 border-white'>
            <div className=' hover:bg-gray-500 rounded-sm shadow p-1 my-1 text-gray-100' onClick={() => { tagAddopen() }} ref={tagAddreferenceRef}>
                <TagIcon className="h-5 w-5 text-gray-200 inline-block" />
                タグの追加
            </div>
            <Popout targetRef={tagAddreferenceRef.current} isOpen={istagAddOpen} close={tagAddclose}>
                {
                    props.tagAddPopout
                }
            </Popout>
        </div>
    )
}
