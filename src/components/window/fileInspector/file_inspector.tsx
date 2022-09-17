import React, { useMemo } from 'react';
import { TagIcon, DatabaseIcon, CogIcon } from '@heroicons/react/solid'
import FolderData from '@/value/folder';
import FolderInspector from './foler_inspector';

interface AppMenuProps {
    root: FolderData
}

export default function AppMenu(props: AppMenuProps) {
    return (
        <div className='bg-gray-600 h-full'>
            <p className='text-xl border-b-2 text-white p-2'>File inspector</p>
            {
                props.root.folders.map((f) => {
                    return <FolderInspector folder={f} />
                })
            }
        </div>
    )
}
