import React, { CSSProperties, useMemo, useRef, useState } from 'react';
import WorkFilterPopout from '../popout/tag_filter/work_filter_popout';
import TagData from '../../value/tag_data';
import { useClickAway, useDisclosure, useKeypress } from '../../hooks/popout_hooks';
import Popout from '../popout/popout';
import { SearchIcon, FilterIcon, ViewListIcon } from '@heroicons/react/solid';
import TextInput from '../common/text_input';

interface WorkMenubarProps {
    tags: TagData[]
    setFlag: (index: number, flag: boolean) => void
    setKeyword: (keyword: string) => void
    activeTags: boolean[]
}

export default function WorkMenubar(props: WorkMenubarProps) {

    const referenceRef = useRef<SVGSVGElement | null>(null);
    const { isOpen, open, close } = useDisclosure(false);

    const activeFilterStyle = "text-gray-200 hover:text-gray-400 bg-blue-400"
    const normalFilterStyle = "text-gray-200 hover:text-gray-400"

    return (
        <div className='flex flex-row-reverse  sticky top-0 bg-gray-600 bg-opacity-75 w-full p-2 backdrop-filter backdrop-blur-sm z-50 drop-shadow-md'>
            <div className='flex gap-2'>
                <FilterIcon className={"h-5 w-5 rounded " + (props.activeTags.includes(true) ? activeFilterStyle : normalFilterStyle)} onClick={() => { open() }} ref={referenceRef} />
                {
                    //<ViewListIcon className="h-5 w-5 text-gray-200 hover:text-gray-400 shadow" />
                }
                <div className='flex gap-2'>
                    <SearchIcon className="h-5 w-5 text-gray-200" />
                    <TextInput
                        onEnter={(input) => props.setKeyword(input)}
                        placeHolder={'ファイル名検索'}
                    />
                </div>
            </div>
            <Popout targetRef={referenceRef.current} isOpen={isOpen} close={close}>
                <WorkFilterPopout
                    tags={props.tags}
                    onClickTag={(i, flag) => { props.setFlag(i, flag); }}
                    activeTags={props.activeTags}
                />
            </Popout>
        </div>
    )
}
