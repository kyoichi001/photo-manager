import React, { useMemo, useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import '../../css/works_window.css'
import '../../css/popouts.css'
import WorkPreviewPopout from '../popout/work_preview_popout';
import TagData from '../tag/tag_data';
import Work from '../work/work';
import WorkData, { __errorWork } from '../work/work_data';
import { useClickAway, useDisclosure, useKeypress } from '../popout/popout_hooks';
import WorkMenubar from './work_menubar';


interface WorksWindowProps {
    works: WorkData[]
    tags: TagData[]
    idToTag: (id: string) => TagData | undefined
    onWorkSelected?: (data: WorkData) => void
    addTagToWork: (work: string, tag: string) => void
    onRemoveTagFromWork: (work: WorkData, tag: TagData) => void
    createTag: (name: string) => void
}

export default function WorksWindow(props: WorksWindowProps) {


    const defaultTags: boolean[] = (new Array(props.tags.length)).fill(false)
    const [activeTags, setActiveTags] = useState(defaultTags);
    const filteredWorks = props.works.filter((work) => {
        if (activeTags.every((t) => t === false)) return true
        for (let i = 0; i < props.tags.length; i++) {
            if (activeTags[i] && work.tags.find((t) => t === props.tags[i].id)) {
                return true
            }
        }
        return false
    })
    const works = filteredWorks.map((work, index) => {
        return <Work
            key={work.id}
            data={work}
            all_tags={props.tags}
            onSelected={props.onWorkSelected}
            idToTag={props.idToTag}
            addTagToWork={props.addTagToWork}
            createTag={props.createTag}
            onWorkPreview={(data) => {
                open()
                setTargetWorkIndex(index)
            }}
            onRemoveTag={(work, tag) => {
                props.onRemoveTagFromWork(work, tag)
            }}
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
                <WorkMenubar tags={props.tags} setFlag={setFlag} activeTags={activeTags} />
                <div className='works'>
                    {works.length === 0 ? NoWorks : works}
                </div>
            </div>
            <div ref={popperRef} style={styles.popper} {...attributes.popper}>
                {
                    isOpen &&
                    <WorkPreviewPopout
                        work={filteredWorks[targetWorkIndex]}
                        idToTag={(id) => props.idToTag(id)}
                        onClickPrev={(id) => { setTargetWorkIndex((targetWorkIndex - 1 + works.length) % works.length) }}
                        onClickNext={(id) => { setTargetWorkIndex((targetWorkIndex + 1) % works.length) }}
                        onClose={() => close()}
                    />
                }
            </div>
        </div>
    )
}
