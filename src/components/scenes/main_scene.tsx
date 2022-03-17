import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import TagManager from '../../tag_manager';
import WorkManager from '../../work_manager';
import TagData from '../tag/tag_data';
import FileInfo from '../window/file_info';
import WorksWindow from '../window/works_window';
import WorkData, { __errorWork } from '../work/work_data';
import "../../css/common.css"

export default function MainScene() {
    const [renderFlag, setRenderFlag] = useState(false)
    const [selectedWork, selectWork] = useState<WorkData | undefined>(undefined);

    let tagManager = new TagManager(() => {
        setRenderFlag(renderFlag ? false : true)
    })
    let workManager = new WorkManager(() => {
        setRenderFlag(renderFlag ? false : true)
    })

    const [tags, setTags] = useState<TagData[]>([])
    const [works, setWorks] = useState<WorkData[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const w = await workManager.getWorks()
            setWorks(w)
            const t = await tagManager.getTags()
            setTags(t)
        }
        fetchData()
    })

    //https://react-dropzone.js.org/
    const onDrop = useCallback((acceptedFiles: File[]) => {
        for (var f of acceptedFiles) {
            const reader = new FileReader()
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {//コールバックなので，複数のファイルを同時に追加しようとすると上書きされてうまくできない
                console.log(f.name)
                workManager.addWork(f)
            }
            reader.readAsArrayBuffer(f)
        }
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
        accept: 'image/jpeg,image/png,image/jfif,image/gif'
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
                            works={works}
                            tags={tags}
                            onWorkSelected={(work) => selectWork(work)}
                        />
                    </div>
                    <div className='app-file-info col-3'>
                        <FileInfo
                            work={selectedWork}
                            idToTag={(id) => tags.find((t) => t.id === id)}
                            deleteWork={(id) => workManager.deleteWork(id)}
                            removeTag={(work, tag) => workManager.deleteTagFromWork(work, tag)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
