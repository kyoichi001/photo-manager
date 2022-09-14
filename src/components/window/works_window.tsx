import React, { useEffect, useMemo, useRef, useState } from 'react';
import WorkPreviewPopout from '../popout/work_preview_popout';
import WorkData, { __errorWork } from '../../value/work_data';
import { useClickAway, useDisclosure, useKeypress } from '../../hooks/popout_hooks';
import WorkMenubar from './work_menubar';
import TagData from '../../value/tag_data';
import Popout from '../popout/popout';
import WorkFactory from '../../factory/WorkFactory';
import TagDataFactory from '../../factory/TagDataFactory';
import TagFactory from '../../factory/TagFactory';

interface WorksWindowProps {
    works: WorkData[]
    tags: TagData[]
    tagDataFactory: TagDataFactory
    onWorkSelected: (data: WorkData) => void
}

export default function WorksWindow(props: WorksWindowProps) {

    const tags = props.tags
    const works = props.works
    console.log("tags " + tags.length)
    const defaultTags: boolean[] = (new Array(tags.length)).fill(false)
    const [activeTags, setActiveTags] = useState(defaultTags);
    const [activeKeyword, setActiveKeyword] = useState("")
    const filteredWorks = works.filter((work) => {
        if (activeTags.every((t) => t === false) && activeKeyword === "") return true
        for (let i = 0; i < tags.length; i++) {
            if (activeTags[i] && work.tags.find((t) => t === tags[i].id)) {
                return true
            }
            /*if (work.title.indexOf(activeKeyword) != -1) {
                return true
            }*/
        }
        return false
    })
    const workFactory = new WorkFactory()
    const tagFactory = new TagFactory()
    function setFlag(index: number, flag: boolean) {
        activeTags[index] = flag
        console.log("filter tag clicked")
        setActiveTags([...activeTags])
    }
    const [targetWorkIndex, setTargetWorkIndex] = useState<number>(-1);

    const popoutRef = useRef<HTMLDivElement | null>(null);
    const { isOpen, open, close } = useDisclosure(false);

    const NoWorks = <div className='no-works'>
        <p>作品がありません</p>
        <p>ここにドラッグアンドドロップ</p>
    </div>
    const worksDOM = filteredWorks.map((work, index) => {
        const w = workFactory.create(work,
            tagFactory,
            props.tagDataFactory,
            (data) => { },
            (work, tag) => { },
            (data) => {
                setTargetWorkIndex(index)
                open()
            }
        )
        return <div onClick={() => props.onWorkSelected(work)} onContextMenu={() => { }} key={work.id}>
            {w}
        </div>
    })

    return (
        <>
            <div className=''>
                <WorkMenubar
                    tags={tags}
                    setFlag={setFlag}
                    setKeyword={setActiveKeyword}
                    activeTags={activeTags}
                />
                <div className='p-2 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-2'>
                    {worksDOM.length === 0 ? NoWorks : worksDOM}
                </div>
            </div>
            <Popout targetRef={popoutRef} isOpen={isOpen} close={close}>
                <WorkPreviewPopout
                    works={filteredWorks}
                    idToTag={(id) => tags.find((t) => t.id === id)}
                    onClose={() => close()}
                    startIndex={targetWorkIndex}
                />
            </Popout>
        </>
    )
}
