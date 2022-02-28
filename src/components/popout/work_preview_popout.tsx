import React, { ChangeEvent, useMemo, useState } from 'react';
import FilterTag from '../tag/filter_tag';
import TagData from '../tag/tag_data';
import '../../css/work.css';
import '../../css/common.css';
import WorkData from '../work/work_data';
import Tag from '../tag/tag';
import "../../css/popouts.css"


interface WorkPreviewPopoutProps {
    idToTag: (id: string) => TagData | undefined
    work: WorkData
}

export default function WorkPreviewPopout(props: WorkPreviewPopoutProps) {

    const tags = useMemo(() => {
        const tags: JSX.Element[] = []
        for (let tag of props.work.tags) {
            var dat = props.idToTag(tag)
            if (!dat) continue
            tags.push(
                <Tag key={dat.id} data={dat} />
            )
        }
        return tags
    }, [props.work.tags])

    return (
        <div className='work-preview popout-bg popout-bg-col'>
            <div className='popout-fixed'>
                <img className='work-thumb' src={props.work.image} alt="t" />
            </div>
        </div>
    )
}
