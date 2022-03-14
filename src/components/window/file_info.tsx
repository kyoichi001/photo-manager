import React, { useMemo } from 'react';
import '../../css/file_info.css'
import Tag from '../tag/tag';
import TagData from '../tag/tag_data';
import WorkData from '../work/work_data';

interface FileInfoProps {
    work?: WorkData
    idToTag: (id: string) => TagData | undefined
    deleteWork: (id: string) => void
    removeTag: (workId: string, tagId: string) => void
}

export default function FileInfo(props: FileInfoProps) {

    if (!props.work) {
        return (
            <div className='file-info'>
                <div className='window'>
                    <div className='work-title'>
                        <p>作品が選択されていません</p>
                    </div>
                </div>
            </div>
        )
    }

    const tags: JSX.Element[] = []
    for (var tag of props.work.tags) {
        var dat = props.idToTag(tag)
        if (!dat) continue
        tags.push(<Tag data={dat} key={dat.id} onTagRemove={(tag) => { props.removeTag(props.work?.id ?? "", tag.id) }} />)
    }

    return (
        <div className='file-info'>
            <div className='window'>
                <img className="work-thumb" src={props.work.image} alt="t" />
                <div className='work-title'><p>{props.work.title}</p></div>
                <div className='tags'>
                    {tags}
                </div>
                <div className='work-time'><p>{(new Date(props.work.createdAt)).toLocaleDateString("ja")}</p></div>
                <button onClick={() => props.deleteWork(props.work?.id ?? "")}>
                    削除
                </button>
            </div>
        </div>
    )
}
