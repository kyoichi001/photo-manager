import React, { useEffect, useMemo, useRef, useState } from 'react';
import FolderData from '@/entity/folder';

interface FolderInspectorProps {
    folder: FolderData
}

export default function FolderInspector(props: FolderInspectorProps) {
    const [open, setOpen] = useState(false)
    return (
        <div>
            <p onClick={() => setOpen(!open)}>{props.folder.name}</p>
            {
                open && props.folder.folders.map((f) => {
                    return <FolderInspector folder={f} />
                })
            }
        </div>
    )
}
