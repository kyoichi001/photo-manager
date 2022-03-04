import React, { ChangeEvent, useMemo, useState } from 'react';
import TagData from '../tag/tag_data';
import '../../css/work.css';
import '../../css/common.css';
import WorkData from '../work/work_data';
import "../../css/popouts.css"


interface WorkPreviewPopoutProps {
    idToTag: (id: string) => TagData | undefined
    work: WorkData
    onClickPrev: (currentWorkId: string) => void
    onClickNext: (currentWorkId: string) => void
    onClose: () => void
}

export default function WorkPreviewPopout(props: WorkPreviewPopoutProps) {

    return (
        <div className='work-preview popout-bg-col'>
            <button onClick={() => props.onClose()}>x</button>
            <div className='row'>
                <button onClick={() => props.onClickPrev(props.work.id)}>prev</button>
                <img className='work-preview-thumb col-11' src={props.work.image} alt="t" />
                <button onClick={() => props.onClickNext(props.work.id)}>next</button>
            </div>
        </div>
    )
}
