import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import FileInfo from '../window/file_info';
import WorksWindow from '../window/works_window';
import WorkData, { __errorWork } from '../../value/work_data';
import { useWorkManager } from '../../hooks/useWorkManager';
import { useTagManager } from '../../hooks/useTagManager';
import WorkDataFactory from '../../factory/WorkDataFactory';
import TagDataFactory from '../../factory/TagDataFactory';
import DragOverlay from './drag_overlay';

export default function MainScene() {
    console.log("rendering main_scene")
    const [selectedWork, selectWork] = useState<WorkData | undefined>(undefined);

    const { data: workData, addWork, eraceWork, addTag: addTagtoWork, eraceTag: eraceTagFromWork } = useWorkManager()
    const { data: tagData, addTag, eraceTag, editTag } = useTagManager()

    //https://zenn.dev/coa00/articles/d3db140113b165
    //メモリリーク対策
    /*useEffect(() => {
        let isMounted = true; // note this flag denote mount status
        fetchData().then((value) => {
            if (isMounted) setData(value);
        })
        return () => { isMounted = false }; // use effect cleanup to set flag false, if unmounted
    }, [renderFlag])*/

    const workDataFactory = useRef<WorkDataFactory | null>(null)
    const tagDataFactory = useRef<TagDataFactory | null>(null)

    const onDropedFile = async (pathes: string[]) => {
        let workDat: WorkData[] = []
        pathes.map((path) => {
            let d = workDataFactory.current?.create(path)
            if (d)//すでに追加されているものでなければ追加
                workDat.push(d)
        })
        console.log("main_scene : addWork ")
        console.log(workDat)
        addWork(workDat)
    }

    const child = useMemo(() => {
        console.log("rendering main_scene_children")
        if (!workData || !tagData) {
            return <p>ロード中</p>
        }
        if (!workDataFactory.current)
            workDataFactory.current = new WorkDataFactory(workData)
        if (!tagDataFactory.current)
            tagDataFactory.current = new TagDataFactory(tagData)
        return <>
            <div className='col-span-9 bg-gray-600 h-full overflow-y-auto scrollbar-primary'>
                <WorksWindow
                    works={workData}
                    tags={tagData}
                    tagDataFactory={tagDataFactory.current}
                    onWorkSelected={(work) => selectWork(work)}
                />
            </div>
            <div className='col-span-3 bg-gray-600 h-full overflow-y-auto scrollbar-primary'>
                <FileInfo
                    work={selectedWork}
                    idToTag={(id) => tagData.find((t) => t.id === id)}
                    deleteWork={(id) => eraceWork(id)}
                    removeTag={(work, tag) => eraceTagFromWork(work, tag)}
                />
            </div>
        </>
    }, [workData, tagData, selectedWork])

    return (
        <DragOverlay onDropped={onDropedFile} >
            <div className='grid grid-cols-12 gap-1 h-full w-full'>
                {
                    child
                }
            </div>
        </DragOverlay>
    )
}
