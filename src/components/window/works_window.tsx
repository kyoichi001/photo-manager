import React, { useMemo, useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import '../../css/works_window.css'
import WorkFilterPopout from '../popout/work_filter_popout';
//import WorkPreviewPopout from '../popout/work_preview_popout';
import TagData from '../tag/tag_data';
import Work from '../work/work';
import WorkData from '../work/work_data';
import { useClickAway, useDisclosure, useKeypress } from './idk';
import WorkMenubar from './work_menubar';


interface WorksWindowProps {
    works: WorkData[]
    tags: TagData[]
    idToTag: (id: string) => TagData | undefined
    onWorkSelected?: (data: WorkData) => void
    addTagToWork: (work: string, tag: string) => void
    createTag: (name: string) => void
}

export default function WorksWindow(props: WorksWindowProps) {


    const defaultTags: boolean[] = (new Array(props.tags.length)).fill(false)
    const [activeTags, setActiveTags] = useState(defaultTags);
    const works = props.works.filter((work) => {
        if (activeTags.every((t) => t === false)) return true
        for (let i = 0; i < props.tags.length; i++) {
            if (activeTags[i] && work.tags.find((t) => t === props.tags[i].id)) {
                return true
            }
        }
        return false
    }).map((work) => {
        return <Work
            key={work.id}
            data={work}
            all_tags={props.tags}
            onSelected={props.onWorkSelected}
            idToTag={props.idToTag}
            addTagToWork={props.addTagToWork}
            createTag={props.createTag}
        />
    })
    function setFlag(index: number, flag: boolean) {
        var s = activeTags
        s[index] = flag
        console.log("filter tag clicked")
        setActiveTags([...s])
    }


    return (
        <div className='works-window'>
            <div className='window'>
                <WorkMenubar tags={props.tags} setFlag={setFlag} activeTags={activeTags} />
                <div className='works'>
                    {works}
                </div>
            </div>
        </div>
    )
}
