import React, { useEffect, useMemo, useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import '../../css/works_window.css'
import '../../css/popouts.css'
import WorkPreviewPopout from '../popout/work_preview_popout';
import Work from '../work/work';
import WorkData, { __errorWork } from '../work/work_data';
import { useClickAway, useDisclosure, useKeypress } from '../popout/popout_hooks';
import WorkMenubar from './work_menubar';
import WorkManager from '../../work_manager';
import TagManager from '../../tag_manager';
import TagAddPopout from '../popout/tag_add_popout';
import TagData from '../tag/tag_data';


interface WorksWindowProps {
    workManager: WorkManager
    tagManager: TagManager
    works: WorkData[]
    tags: TagData[]
    onWorkSelected?: (data: WorkData) => void
}

export default function WorksWindow(props: WorksWindowProps) {

    const tags = props.tags
    const works = props.works
    console.log("tags " + tags.length)
    const defaultTags: boolean[] = (new Array(tags.length)).fill(false)
    const [activeTags, setActiveTags] = useState(defaultTags);
    const filteredWorks = works.filter((work) => {
        if (activeTags.every((t) => t === false)) return true
        for (let i = 0; i < tags.length; i++) {
            if (activeTags[i] && work.tags.find((t) => t === tags[i].id)) {
                return true
            }
        }
        return false
    })
    const worksDOM = filteredWorks.map((work, index) => {
        return <Work
            key={work.id}
            data={work}
            onSelected={props.onWorkSelected}
            idToTag={(id) => tags.find((t) => t.id === id)}
            onWorkPreview={(data) => {
                open()
                setTargetWorkIndex(index)
            }}
            onRemoveTag={(work, tag) => {
                props.workManager.deleteTagFromWork(work.id, tag.id)
            }}
            tagAddPopout={
                <TagAddPopout
                    tags={tags}
                    onClickTag={(tag) => props.workManager.addTagToWork(work.id, tag.id)}
                    onCreateTag={(name) => props.tagManager.addTag(name)}
                />
            }
        />
    })
    function setFlag(index: number, flag: boolean) {
        var s = activeTags
        s[index] = flag
        console.log("filter tag clicked")
        setActiveTags([...s])
    }
    const [targetWorkIndex, setTargetWorkIndex] = useState<number>(-1);
    const popperRef = useRef<HTMLDivElement | null>(null);
    const { styles, attributes } = usePopper(
        null,
        popperRef.current,
        {
            placement: 'bottom',
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [20, 0]
                    },
                },
            ],
        }
    );
    const { isOpen, open, close } = useDisclosure(false);
    useClickAway(popperRef, close);
    useKeypress('Escape', close);

    const NoWorks = <div className='no-works'>
        <p>作品がありません</p>
        <p>ここにドラッグアンドドロップ</p>
    </div>

    return (
        <div className='works-window'>
            <div className='window'>
                <div className='works-window-container'>
                    <WorkMenubar tags={tags} setFlag={setFlag} activeTags={activeTags} />
                    <div className='works'>
                        {worksDOM.length === 0 ? NoWorks : worksDOM}
                    </div>
                </div>
            </div>
            <div ref={popperRef} style={styles.popper} {...attributes.popper}>
                {
                    isOpen &&
                    <WorkPreviewPopout
                        work={filteredWorks[targetWorkIndex]}
                        idToTag={(id) => tags.find((t) => t.id === id)}
                        onClickPrev={(id) => { setTargetWorkIndex((targetWorkIndex - 1 + worksDOM.length) % worksDOM.length) }}
                        onClickNext={(id) => { setTargetWorkIndex((targetWorkIndex + 1) % worksDOM.length) }}
                        onClose={() => close()}
                    />
                }
            </div>
        </div>
    )
}
