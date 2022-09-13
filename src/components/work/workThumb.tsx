import React, { CSSProperties, useMemo, useRef, useState } from 'react';
import WorkData from '../../value/work_data';
import { SearchIcon, PlusIcon } from '@heroicons/react/solid';

interface WorkThumbProps {
    data: WorkData
    onWorkPreview: (data: WorkData) => void
}

export default function WorkThumb(props: WorkThumbProps) {
    return (
        <div className='relative rounded-t-sm'>
            <img className='object-contain h-48 w-full' src={props.data.image} alt="t" />
            <div className='transition duration-75 ease-linear z-10 absolute bottom-0 left-0 bg-black opacity-0 h-48 w-full hover:opacity-60'>
                <div className='z-20 bg-gray-600 hover:bg-gray-900 shadow rounded-sm absolute bottom-1 left-1 w-min p-1' onClick={() => props.onWorkPreview(props.data)}>
                    <SearchIcon className="hover:text-opacity-100 h-24 w-24 text-gray-100 hover:opacity-100 hover:bg-opacity-100" />
                </div>
            </div>
        </div>
    )
}
