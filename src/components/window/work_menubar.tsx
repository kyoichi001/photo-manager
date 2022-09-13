import React, { CSSProperties, useMemo, useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import WorkFilterPopout from '../popout/work_filter_popout';
import TagData from '../../value/tag_data';
import { useClickAway, useDisclosure, useKeypress } from '../../hooks/popout_hooks';
import Popout from '../popout/popout';
import { SearchIcon, FilterIcon } from '@heroicons/react/solid';

interface WorkMenubarProps {
    tags: TagData[]
    setFlag: (index: number, flag: boolean) => void
    setKeyword: (keyword: string) => void
    activeTags: boolean[]
}

export default function WorkMenubar(props: WorkMenubarProps) {

    const referenceRef = useRef<SVGSVGElement | null>(null);
    const { isOpen, open, close } = useDisclosure(false);

    const [searchKeyword, setSearchKeyword] = useState("")

    return (
        <div className='flex flex-row-reverse  sticky top-0 bg-gray-600 bg-opacity-75 w-full p-2 backdrop-filter backdrop-blur-sm z-50 drop-shadow-md'>
            <div className='flex gap-2'>
                <FilterIcon className="h-5 w-5 text-gray-200 hover:text-gray-400 shadow" onClick={() => { open() }} ref={referenceRef} />
                <SearchIcon className="h-5 w-5 text-gray-200" />
                <input className="bg-gray-700 text-gray-300 px-1 shadow-inner rounded-sm" type="text" id='text' name='text'
                    placeholder="ファイル名検索"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key == 'Enter') {
                            e.preventDefault()
                            props.setKeyword(searchKeyword)
                        }
                    }
                    }>
                </input>
            </div>
            <Popout targetRef={referenceRef} isOpen={isOpen} close={close}>
                <WorkFilterPopout
                    tags={props.tags}
                    onClickTag={(i, flag) => { props.setFlag(i, flag); }}
                    activeTags={props.activeTags}
                />
            </Popout>
        </div>
    )
}
