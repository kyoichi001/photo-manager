import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import DataLoader from '../../dataloader';
import TagManager from '../../tag_manager';
import WorkManager from '../../work_manager';
import TagAddPopout from '../popout/tag_add_popout';
import TagData from '../tag/tag_data';
import FileInfo from '../window/file_info';
import WorksWindow from '../window/works_window';
import WorkData, { __errorWork } from '../work/work_data';
import "../../css/common.css"
import WorkFilterPopout from '../popout/work_filter_popout';
import WorkPreviewPopout from '../popout/work_preview_popout';
import { usePopper } from 'react-popper';
import { useClickAway, useDisclosure, useKeypress } from '../popout/popout_hooks';

interface MainSceneProps {

}

export default function MainScene(props: MainSceneProps) {
    const [works, setWorks] = useState(DataLoader.LoadWorks())
    const [tags, setTags] = useState(DataLoader.LoadTags())
    const [selectedWork, selectWork] = useState('');

    useEffect(() => {
        DataLoader.SaveWorks(works)
    }, [works])
    useEffect(() => {
        DataLoader.SaveTags(tags)
    }, [tags])

    let tagManager = new TagManager(
        () => tags,
        (tags_: TagData[]) => {
            setTags([...tags_])
        }
    )
    let workManager = new WorkManager(
        () => works,
        (works_: WorkData[]) => {
            setWorks([...works_])
        }
    )

    //https://react-dropzone.js.org/
    const onDrop = useCallback((acceptedFiles: File[]) => {
        acceptedFiles.forEach((file: File) => {
            const reader = new FileReader()
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                //console.log(file.name)
                workManager.addWork(file)
            }
            reader.readAsArrayBuffer(file)
        })
    }, [])



    const { getRootProps, getInputProps } = useDropzone({ onDrop, noClick: true })
    return (
        <div className="main-scene">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <div className='view row' >
                    <div className='app-works-window col-9'>
                        <WorksWindow
                            works={works}
                            tags={tags}
                            onWorkSelected={(work) => selectWork(work.id)}
                            idToTag={(id) => tagManager.idToTag(id)}
                            addTagToWork={(work: string, tag: string) => {
                                workManager.addTagToWork(work, tag)
                            }}
                            createTag={(name: string) => {
                                tagManager.addTag(name)
                            }}
                        />
                    </div>
                    <div className='app-file-info col-3'>
                        <FileInfo work={workManager.idToWork(selectedWork)} idToTag={(id) => tagManager.idToTag(id)} deleteWork={(id) => workManager.deleteWork(id)} />
                    </div>
                </div>
            </div>
        </div>
    )
}
