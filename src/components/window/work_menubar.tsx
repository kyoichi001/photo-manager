import React, { useMemo } from 'react';


interface WorkMenubarProps {
    onFilterActive: () => void
}

export default function WorkMenubar(props: WorkMenubarProps) {

    return (
        <div className='work-menubar'>
            <p>検索</p>
            <div onClick={() => props.onFilterActive()}>
                フィルター
            </div>
        </div>
    )
}
