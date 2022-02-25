import React, { useMemo } from 'react';
import '../../css/works_window.css'
import TagData from '../tag/tag_data';
import Work from '../work/work';
import WorkData from '../work/work_data';
import WorkMenubar from './work_menubar';


interface WorksWindowProps {
    works: WorkData[]
    idToTag: (id: string) => TagData | undefined
    onWorkSelected?: (data: WorkData) => void
    onAddTag?: (data: WorkData) => void
}

export default function WorksWindow(props: WorksWindowProps) {

    const works = props.works.map((work) => {
        return <Work key={work.id} data={work} onSelected={props.onWorkSelected} idToTag={props.idToTag} onAddTag={props.onAddTag} />
    })

    return (
        <div className='works-window'>
            <div className='window'>
                <WorkMenubar />
                <div className='works'>
                    {works}
                </div>
            </div>
        </div>
    )
}
