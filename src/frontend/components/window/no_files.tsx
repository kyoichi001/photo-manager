import React, { useEffect, useMemo, useRef, useState } from 'react';
import DragOverlay from '../scenes/drag_overlay';

interface WorksWindowProps {
    onDroppedFile: (pathes: string[]) => void
}

export default function WorksWindow(props: WorksWindowProps) {
    return (
        <DragOverlay onDropped={props.onDroppedFile} >
            <p>作品がありません</p>
            <p>ここに管理したいフォルダをドラッグアンドドロップ</p>
        </DragOverlay>
    )
}
