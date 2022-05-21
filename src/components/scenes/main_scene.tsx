import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DropEvent, useDropzone } from 'react-dropzone';
import TagManager from '../../tag_manager';
import WorkManager from '../../work_manager';
import TagData from '../tag/tag_data';
import FileInfo from '../window/file_info';
import WorksWindow from '../window/works_window';
import WorkData, { __errorWork } from '../work/work_data';
import "../../css/common.css"
import "../../css/main_scene.css"

interface MainSceneData {
    tags: TagData[]
    works: WorkData[]
}

export default function MainScene() {
    const [renderFlag, setRenderFlag] = useState(false)
    const [selectedWork, selectWork] = useState<WorkData | undefined>(undefined);

    let tagManager = new TagManager(() => {
        setRenderFlag(renderFlag ? false : true)
    })
    let workManager = new WorkManager(() => {
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

    //https://react-dropzone.js.org/
    const onDrop = useCallback((acceptedFiles: File[]) => {
        console.log("on drop " + acceptedFiles.map((f) => f.name))
        workManager.addWorks(acceptedFiles)
    }, [])


    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        onDrop,
        noClick: true,
        accept: 'image/jpeg,image/png,image/jfif,image/gif',
        multiple: true,
    })

    const baseStyle: React.CSSProperties = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 0,
        margin: 0,
        borderWidth: 2,
        borderRadius: 2,
        outline: 'none',
        transition: 'border .24s ease-in-out'
    };

    const acceptStyle: React.CSSProperties = {
        borderColor: '#00e676',
        borderStyle: 'dashed',
    };

    const rejectStyle: React.CSSProperties = {
        borderColor: '#ff1744',
        borderStyle: 'dashed',
    };

    const style: React.CSSProperties = useMemo(() => ({
        ...baseStyle,
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);

    return (
        <div className="main-scene">
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <div className='view row' >
                    <div className='app-works-window col-9'>
                        <WorksWindow
                            workManager={workManager}
                            tagManager={tagManager}
                            works={data.works}
                            tags={data.tags}
                            onWorkSelected={(work) => selectWork(work)}
                        />
                    </div>
                    <div className='app-file-info col-3'>
                        <FileInfo
                            work={selectedWork}
                            idToTag={(id) => data.tags.find((t) => t.id === id)}
                            deleteWork={(id) => workManager.deleteWork(id)}
                            removeTag={(work, tag) => workManager.deleteTagFromWork(work, tag)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
