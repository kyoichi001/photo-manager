import React, { CSSProperties, useMemo, useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import WorkFilterPopout from '../popout/work_filter_popout';
import TagData from '../tag/tag_data';
import "../../css/popouts.css"
import { useClickAway, useDisclosure, useKeypress } from '../popout/popout_hooks';
import Popout from '../popout/popout';


interface WorkMenubarProps {
    tags: TagData[]
    setFlag: (index: number, flag: boolean) => void
    setKeyword: (keyword: string) => void
    activeTags: boolean[]
}

export default function WorkMenubar(props: WorkMenubarProps) {

    const referenceRef = useRef<HTMLDivElement | null>(null);
    const { isOpen, open, close } = useDisclosure(false);

    const [searchKeyword, setSearchKeyword] = useState("")

    return (
        <div className='work-menubar'>
            <input type="text" id='text' name='text'
                placeholder="ファイル名検索"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key == 'Enter') {
                        console.log("press enter")
                        e.preventDefault()
                        props.setKeyword(searchKeyword)
                    }
                }
                }>
            </input>
            <div onClick={() => { open() }} ref={referenceRef}>
                フィルター
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
