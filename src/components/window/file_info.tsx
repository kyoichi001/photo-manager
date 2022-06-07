import React, { useMemo } from 'react';
import Tag from '../tag/tag';
import TagData from '../tag/tag_data';
import WorkData from '../work/work_data';
import { TrashIcon } from '@heroicons/react/solid'

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
            <img className="work-thumb py-1" src={props.work.image} alt="t" />
            <div className='work-title'><p>{props.work.title}</p></div>
            <div className='flex gap-1 py-1'>
                {tags}
            </div>
            <div className='work-time py-1'><p>{(new Date(props.work.createdAt)).toLocaleDateString("ja")}</p></div>
            <button className='bg-red-700 hover:bg-red-800 rounded-sm shadow text-gray-200 p-1' onClick={() => props.deleteWork(props.work?.id ?? "")}>
                <TrashIcon className='h-5 w-5 text-gray-200 inline-block' />
                削除
            </button>
        </div>
    )
}
