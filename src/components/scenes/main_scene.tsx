import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import DataLoader from '../../dataloader';
import TagManager from '../../tag_manager';
import WorkManager from '../../work_manager';
import TagData from '../tag/tag_data';
import FileInfo from '../window/file_info';
import WorksWindow from '../window/works_window';
import WorkData, { __errorWork } from '../work/work_data';
import "../../css/common.css"

export default function MainScene() {
    const [works, setWorks] = useState(DataLoader.LoadWorks())
    const [tags, setTags] = useState(DataLoader.LoadTags())
    useEffect(() => {
        DataLoader.SaveWorks(works)
    }, [works])
    useEffect(() => {
        DataLoader.SaveTags(tags)
    }, [tags])
    const [selectedWork, selectWork] = useState('');

    let tagManager = new TagManager(
        () => DataLoader.LoadTags(),
        (tags_: TagData[]) => {
            console.log("save " + tags_.length + " tag")
            DataLoader.SaveTags(tags_)
        }
    )
    let workManager = new WorkManager(
        () => DataLoader.LoadWorks(),
        (works_: WorkData[]) => {
            console.log("save " + works_.length + " work")
            DataLoader.SaveWorks(works_)
        }
    )

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
                            onWorkSelected={(work) => selectWork(work.id)}
                        />
                    </div>
                    <div className='app-file-info col-3'>
                        <FileInfo
                            work={workManager.idToWork(selectedWork)}
                            idToTag={(id) => tagManager.idToTag(id)}
                            deleteWork={(id) => workManager.deleteWork(id)}
                            removeTag={(work, tag) => workManager.deleteTagFromWork(work, tag)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
