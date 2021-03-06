import React, { useEffect, useMemo, useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import WorkPreviewPopout from '../popout/work_preview_popout';
import Work from '../work/work';
import WorkData, { __errorWork } from '../work/work_data';
import { useClickAway, useDisclosure, useKeypress } from '../popout/popout_hooks';
import WorkMenubar from './work_menubar';
import WorkManager from '../../work_manager';
import TagManager from '../../tag_manager';
import TagAddPopout from '../popout/tag_add_popout';
import TagData from '../tag/tag_data';
import Popout from '../popout/popout';


interface WorksWindowProps {
    workManager: WorkManager
    tagManager: TagManager
    works: WorkData[]
    tags: TagData[]
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
        return <Work
            key={work.id}
            data={work}
            onSelected={props.onWorkSelected}
            idToTag={(id) => tags.find((t) => t.id === id)}
            onWorkPreview={(data) => {
                open();
                setTargetWorkIndex(index);
            }}
            onRemoveTag={(work, tag) => {
                props.workManager.deleteTagFromWork(work.id, tag.id);
            }}
            tagAddPopout={
                <TagAddPopout
                    tags={tags}
                    onClickTag={(tag) => props.workManager.addTagToWork(work.id, tag.id)}
                    onCreateTag={(name) => props.tagManager.addTag(name)}
                />
            }
            onDeleteWork={(work) => {
                props.workManager.deleteWork(work.id)
            }} />
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
