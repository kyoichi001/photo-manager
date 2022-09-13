import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import FileInfo from '../window/file_info';
import WorksWindow from '../window/works_window';
import WorkData, { __errorWork } from '../../value/work_data';
import { useWorkManager } from '../../hooks/useWorkManager';
import { useTagManager } from '../../hooks/useTagManager';
import WorkDataFactory from '../../factory/WorkDataFactory';
import TagDataFactory from '../../factory/TagDataFactory';

interface DragOverlayProps {
    onDropped: (pathes: string[]) => void
    children: JSX.Element
}

export default function DragOverlay(props: DragOverlayProps) {
    const ext_filters = ["jpg", "png", "gif", "jpeg", "jfif", "jpe", "jfi", "jif"]
    const [dragging, setDragging] = useState(false)
    const onDropedFile = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (!e.dataTransfer) {
            setDragging(false)
            return
        }
        const draggedFiles: File[] = []
        for (let i = 0; i < e.dataTransfer.files.length; i++) {
            draggedFiles.push(e.dataTransfer.files[i])
        }
        let res: string[] = []
        for (let file of draggedFiles) {
            let droppedPath = file.path
            let files = await window.myAPI.getFilesInDirectory(droppedPath)
            res = res.concat(files)
        }
        res = res.map((r) => r.toLowerCase())
            .filter((s) => ext_filters.includes(s.split(".").at(-1) ?? ""))//画像以外のファイルを除外
        props.onDropped(res)
        setDragging(false)
    }

    const onDraggedFile = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        if (!e.dataTransfer) {
            setDragging(true)
            return
        }
        for (let i = 0; i < e.dataTransfer.files.length; i++) {
            let droppedPath = e.dataTransfer.files[i].path.toLowerCase()
            if (await window.myAPI.isDirectory(droppedPath)) {//もしディレクトリを含むなら無視
                setDragging(true)
                return
            }
            let file_extention = droppedPath.split(".").at(-1)
            if (!file_extention) {//拡張子がないなら無視
                setDragging(true)
                return
            }
            if (ext_filters.includes(file_extention)) {//もし画像を含むなら無視
                setDragging(true)
                return
            }
        }
        //すべてのファイルが対応しない拡張子なら
        setDragging(true)
    }
    const onDragExit = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setDragging(false)
    }

    return <div className="z-40 h-full" onDragEnter={(e) => onDraggedFile(e)}>
        {
            props.children
        }
        {
            dragging ?
                <div className="z-50 h-full w-full absolute left-0 top-0"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={onDropedFile}
                    onDragLeave={onDragExit}>
                    <div className='bg-blue-300 bg-opacity-60 h-full w-full flex place-content-center place-items-center' onDrop={() => console.log("drop grandchild")}>
                        <p className='font-bold'>ここにファイルをドラッグ</p>
                    </div>
                </div>
                : <></>
        }
    </div>
}
