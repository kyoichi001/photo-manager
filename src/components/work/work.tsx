import React, { useMemo } from 'react';
import Tag from '../tag/tag';
import '../../css/work.css';
import WorkData from './work_data';
import TagData from '../tag/tag_data';

interface WorkProps {
    data: WorkData
    idToTag: (id: string) => TagData | undefined
    onSelected?: (data: WorkData) => void
    onAddTag?: (data: WorkData) => void
}

export default function Work(props: WorkProps) {

    const tags = useMemo(() => {
        const tags: JSX.Element[] = []
        for (let tag of props.data.tags) {
            var dat = props.idToTag(tag)
            if (!dat) continue
            tags.push(
                <Tag key={dat.id} data={dat} />
            )
        }
        return tags
    }, [props.data.tags])

    return (
        <div className='work'>
            <div className='clickable-component p-2 work-bg' onClick={() => { if (props.onSelected) props.onSelected(props.data) }}>
                <img className='work-thumb' src={props.data.image} alt="t" />
                <div className='work-title'><p>{props.data.title}</p></div>
                <div className='tags'>
                    {tags}
                    <button onClick={() => { if (props.onAddTag) props.onAddTag(props.data) }}>+</button>
                </div>
                <div className='work-time'><p>{props.data.createdAt}</p></div>
            </div>
        </div>
    )
}
