import React, { useEffect, useMemo, useRef, useState } from 'react';
import WorkPreviewPopout from '../popout/work_preview_popout';
import WorkData, { __errorWork } from '../../../entity/work_data';
import { useClickAway, useDisclosure, useKeypress } from '../../hooks/popout_hooks';
import WorkMenubar from './work_menubar';
import TagData from '../../../entity/tag_data';
import Popout from '../popout/popout';
import WorkFactory from '../../factory/WorkFactory';
import TagDataFactory from '../../factory/TagDataFactory';
import TagFactory from '../../factory/TagFactory';

interface WorksWindowProps {
    works: WorkData[]
    tags: TagData[]
    tagDataFactory: TagDataFactory
    onWorkSelected: (data: WorkData) => void
    onWorkContextMenu: (data: WorkData, elem: Element) => void
    onRemoveTagFromWork: (work: WorkData, tag: TagData) => void
    onOpenTagAddPopout: (work: WorkData, elem: Element) => void
}

export default function WorksWindow(props: WorksWindowProps) {
    const defaultTags: boolean[] = (new Array(props.tags.length)).fill(false)
    const [activeTags, setActiveTags] = useState(defaultTags);
    const [activeKeyword, setActiveKeyword] = useState("")
    const filteredWorks = props.works.filter((work) => {
        if (activeTags.every((t) => t === false) && activeKeyword === "") return true
        for (let i = 0; i < props.tags.length; i++) {
            if (activeTags[i] && work.tags.find((t) => t === props.tags[i].id)) {
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
    </div>
    const worksDOM = filteredWorks.map((work, index) => {
        const w = workFactory.create(work,
            tagFactory,
            props.tagDataFactory,
            (data, elem) => props.onOpenTagAddPopout(data, elem),
            (work, tag) => props.onRemoveTagFromWork(work, tag),
            (data) => {
                setTargetWorkIndex(index)
                open()
            }
        )
        return <div onClick={() => props.onWorkSelected(work)} onContextMenu={(e) => props.onWorkContextMenu(work, e.currentTarget)} key={work.path}>
            {w}
        </div>
    })

    return (
        <>
            <div className=''>
                <WorkMenubar
                    tags={props.tags}
                    setFlag={setFlag}
                    setKeyword={setActiveKeyword}
                    activeTags={activeTags}
                />
                <div className='p-2 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-2'>
                    {worksDOM.length === 0 ? NoWorks : worksDOM}
                </div>
            </div>
            <Popout targetRef={popoutRef.current} isOpen={isOpen} close={close}>
                <WorkPreviewPopout
                    works={filteredWorks}
                    idToTag={(id) => props.tags.find((t) => t.id === id)}
                    onClose={() => close()}
                    startIndex={targetWorkIndex}
                />
            </Popout>
        </>
    )
}
