import React, { useMemo } from 'react';
import { TagIcon, DatabaseIcon, CogIcon } from '@heroicons/react/solid'

interface AppMenuProps {
    onClickMenu: (menu: string) => void
    currentScene: string
}

export default function AppMenu(props: AppMenuProps) {
    const activeClassName = 'bg-gray-700 hover:bg-gray-800'
    const normalClassName = 'bg-gray-600 hover:bg-gray-700'
    return (
        <div className='bg-gray-600 h-full'>
            <p className='text-xl border-b-2 text-white p-2'>App Menu</p>
            <div className={'text-white w-100 cursor-pointer p-2 ' + (props.currentScene === "all_works" ? activeClassName : normalClassName)}
                onClick={() => props.onClickMenu("all_works")}>
                <DatabaseIcon className='h-5 w-5 text-gray-200 inline-block m-1' />
                すべての作品
            </div>
            <div className={'text-white w-100 cursor-pointer p-2 ' + (props.currentScene === "tags" ? activeClassName : normalClassName)}
                onClick={() => props.onClickMenu("tags")}>
                <TagIcon className='h-5 w-5 text-gray-200 inline-block m-1' />
                タグ管理
            </div>
            <div className={'text-white w-100 cursor-pointer p-2 ' + (props.currentScene === "settings" ? activeClassName : normalClassName)}
                onClick={() => props.onClickMenu("settings")}>
                <CogIcon className='h-5 w-5 text-gray-200 inline-block m-1' />
                設定
            </div>
        </div>
    )
}
