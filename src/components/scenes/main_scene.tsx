import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import TagManager from '../../tag_manager';
import WorkManager from '../../work_manager';
import TagData from '../tag/tag_data';
import FileInfo from '../window/file_info';
import WorksWindow from '../window/works_window';
import WorkData, { __errorWork } from '../work/work_data';

interface MainSceneData {
    tags: TagData[]
    works: WorkData[]
}

export default function MainScene() {
    console.log("rendering main_scene")
    const [renderFlag, setRenderFlag] = useState(false)
    const [selectedWork, selectWork] = useState<WorkData | undefined>(undefined);

    const tagManager = new TagManager(() => {
        setRenderFlag(renderFlag ? false : true)
    })
    const workManager = new WorkManager(() => {
        setRenderFlag(renderFlag ? false : true)
    })

    const [data, setData] = useState<MainSceneData>({ tags: [], works: [] })

    const fetchData = async () => {
        console.log("fetch data")
        var w: WorkData[] = []
        var t: TagData[] = []
        try {
            w = await workManager.getWorks()
        } catch (error) {
            console.log(error)
        }
        try {
            t = await tagManager.getTags()
            console.log(t)
        } catch (error) {
            console.log("tags")
            console.log(error)
        }
        return { tags: t, works: w }
    }

    //https://zenn.dev/coa00/articles/d3db140113b165
    //メモリリーク対策
    useEffect(() => {
        let isMounted = true; // note this flag denote mount status
        fetchData().then((value) => {
            if (isMounted) setData(value);
        })
        return () => { isMounted = false }; // use effect cleanup to set flag false, if unmounted
    }, [renderFlag])

    const baseStyle: React.CSSProperties = {
    };
    const acceptStyle: React.CSSProperties = {
        borderColor: '#00e676',
        borderStyle: 'dashed',
        borderWidth: 2,
        borderRadius: 2,
    };

    const rejectStyle: React.CSSProperties = {
        borderColor: '#ff1744',
        borderStyle: 'dashed',
        borderWidth: 2,
        borderRadius: 2,
    };

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
        for (let r of res) {
        }
        let ext_filters = ["jpg", "png", "gif", "jpeg", "jfif", "jpe", "jfi", "jif"]
        workManager.addWorks(res.filter((s) => ext_filters.includes(s.split(".").at(-1) ?? "")))
        setDragging(false)
    }

    const onDraggedFile = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        if (!e.dataTransfer) {
            setDragging(true)
            return
        }
        let ext_filters = ["jpg", "png", "gif", "jpeg", "jfif", "jpe", "jfi", "jif"]
        for (let i = 0; i < e.dataTransfer.files.length; i++) {
            let droppedPath = e.dataTransfer.files[i].path.toLowerCase()
            if (await window.myAPI.isDirectory(droppedPath)) {//もしディレクトリを含むなら無視
                setDragging(true)
                return
            }
            let file_extention = droppedPath.split(".").at(-1)
            if (!file_extention) {//拡張子がないなら無視（そんなことある？
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

    const child = useMemo(() => {
        console.log("rendering main_scene_children")
        return <div className='grid grid-cols-12 gap-1 h-full w-full'>
            <div className='col-span-9 bg-gray-600 h-full overflow-y-auto scrollbar-primary'>
                <WorksWindow
                    workManager={workManager}
                    tagManager={tagManager}
                    works={data.works}
                    tags={data.tags}
                    onWorkSelected={(work) => selectWork(work)}
                />
            </div>
            <div className='col-span-3 bg-gray-600 h-full overflow-y-auto scrollbar-primary'>
                <FileInfo
                    work={selectedWork}
                    idToTag={(id) => data.tags.find((t) => t.id === id)}
                    deleteWork={(id) => workManager.deleteWork(id)}
                    removeTag={(work, tag) => workManager.deleteTagFromWork(work, tag)}
                />
            </div>
        </div>
    }, [data, renderFlag, selectedWork])

    return (
        <div className="h-full" onDragEnter={(e) => {
            onDraggedFile(e)
        }}>
            {
                child
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
    )
}
