import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import FileInfo from '../window/file_info';
import WorksWindow from '../window/works_window';
import WorkData, { __errorWork } from '../../../entity/work_data';
import { useWorkManager } from '../../hooks/useWorkManager';
import { useTagManager } from '../../hooks/useTagManager';
import WorkDataFactory from '../../factory/WorkDataFactory';
import TagDataFactory from '../../factory/TagDataFactory';
import DragOverlay from './drag_overlay';
import { useDisclosure } from '../../hooks/popout_hooks';
import WorkClickMenuPopout from '../popout/work_click_menu_popout';
import Popout from '../popout/popout';
import TagAddPopout from '../popout/tag_add_popout';
import tag_data from '@/entity/tag_data';

export default function MainScene() {
    console.log("rendering main_scene")
    const [selectedWork, selectWork] = useState<WorkData | undefined>(undefined);

    const { data: workData, addWork, eraceWork, addTag: addTagtoWork, eraceTag: eraceTagFromWork } = useWorkManager()
    const { data: tagData, add: addTag, erase: eraceTag, edit: editTag } = useTagManager()
    const { isOpen: isWorkContextOpen, open: openWorkContext, close: closeWorkContext } = useDisclosure(false);
    const { isOpen: isTagAddOpen, open: openTagAdd, close: closeTagAdd } = useDisclosure(false);
    const [contextWork, setContextWork] = useState<{ work: WorkData | null, ref: Element | null }>({ work: null, ref: null })

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
                    onWorkContextMenu={(work, elem) => {
                        console.log("main_scene work contextMenu ", work, elem);
                        setContextWork({ work: work, ref: elem });
                        openWorkContext();
                    }}
                    onRemoveTagFromWork={(work, tag) => eraceTagFromWork(work.path, tag.id)}
                    onOpenTagAddPopout={(work, elem) => {
                        setContextWork({ work: work, ref: elem });
                        openTagAdd()
                    }}
                />
            </div>
            <div className='col-span-3 bg-gray-600 h-full overflow-y-auto scrollbar-primary'>
                <FileInfo
                    work={selectedWork}
                    idToTag={(id) => tagData.find((t) => t.id === id)}
                    removeTag={(work, tag) => eraceTagFromWork(work, tag)}
                />
            </div>
        </>
    }, [workData, tagData, selectedWork])

    return (
        <div className='grid grid-cols-12 gap-1 h-full w-full'>
            {
                child
            }
            {
                (contextWork.ref && contextWork.work) && <Popout targetRef={contextWork.ref} isOpen={isWorkContextOpen} close={closeWorkContext}>
                    <WorkClickMenuPopout
                        work={contextWork.work}
                        tagAddPopout={
                            <TagAddPopout
                                tags={tagData}
                                onClickTag={(tag) => { if (contextWork.work) addTagtoWork(contextWork.work.path, tag.id) }}
                                onCreateTag={(name) => {
                                    const newTag = tagDataFactory.current?.create(name)
                                    if (newTag) addTag([newTag])
                                }}
                            />
                        }
                    />
                </Popout>
            }
            <Popout targetRef={contextWork.ref} isOpen={isTagAddOpen} close={closeTagAdd}>
                <TagAddPopout
                    tags={tagData}
                    onClickTag={(tag) => { if (contextWork.work) addTagtoWork(contextWork.work.path, tag.id) }}
                    onCreateTag={(name) => {
                        const newTag = tagDataFactory.current?.create(name)
                        if (newTag) addTag([newTag])
                    }}
                />
            </Popout>
        </div>
    )
}
