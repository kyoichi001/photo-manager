import React, { ChangeEvent, useMemo, useState } from 'react';
import TagData from '../tag/tag_data';
import WorkData from '../work/work_data';


interface WorkPreviewPopoutProps {
    idToTag: (id: string) => TagData | undefined
    work: WorkData
    onClickPrev: (currentWorkId: string) => void
    onClickNext: (currentWorkId: string) => void
    onClose: () => void
}

export default function WorkPreviewPopout(props: WorkPreviewPopoutProps) {

    return (
        <div className='popout workpreview-popout popout-bg-col'>
            <button className='workpreview-closebutton' onClick={() => props.onClose()}>x</button>
            <div className='row'>
                <button className='workpreview-button' onClick={() => props.onClickPrev(props.work.id)}>prev</button>
                <div className='col-11' onClick={() => props.onClose()}>
                    <img className='workpreview-thumb' src={props.work.image} alt="t" />
                </div>
                <button className='workpreview-button' onClick={() => props.onClickNext(props.work.id)}>next</button>
            </div>
        </div>
    )
}
