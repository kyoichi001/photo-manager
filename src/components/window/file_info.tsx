import React, { useEffect, useMemo, useRef, useState } from 'react';
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
            <div className='file-info p-1'>
                <div className='text-xl border-b-2 text-white p-2 mb-3'>
                    FileInfo
                </div>
                <div className='mb-3 bg-gray-500 p-1 rounded-sm divide-y'>
                    <div className='font-bold text-gray-100'>作品が選択されていません</div>
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

    const imgRef = useRef<HTMLImageElement>(null)
    const [imgWidth, setImgWidth] = useState<number | undefined>(undefined)
    const [imgHeight, setImgHeight] = useState<number | undefined>(undefined)

    useEffect(() => {
        console.log("renew file_info img px")
        setImgWidth(imgRef.current?.naturalWidth)
        setImgHeight(imgRef.current?.naturalHeight)
    }, [props.work.image])

    return (
        <div className='file-info p-1'>
            <div className='text-xl border-b-2 text-white p-2 mb-3'>
                FileInfo
            </div>
            <div className='mb-3 bg-gray-500 p-1 rounded-sm divide-y'>
                <div className='font-bold text-gray-100'>image</div>
                <img className="work-thumb py-1" src={props.work.image} alt="t" ref={imgRef} />
                <div className='font-bold text-gray-100'>px : {imgHeight ?? "Loading..."} x {imgWidth ?? "Loading..."}</div>
            </div>
            <div className='mb-3 bg-gray-500 p-1 rounded-sm divide-y'>
                <div className='font-bold text-gray-100'>path</div>
                <div className='break-words text-gray-100'><p>{props.work.image}</p></div>
            </div>
            <div className='mb-3 bg-gray-500 p-1 rounded-sm divide-y'>
                <div className='font-bold text-gray-100'>tags ({tags.length})</div>

                <div className='flex gap-1 py-1'>
                    {tags.length === 0 ? "none" : tags}
                </div>
            </div>
            <div className='work-time py-1'><p>{(new Date(props.work.createdAt)).toLocaleDateString("ja")}</p></div>
            <button className='bg-red-700 hover:bg-red-800 rounded-sm shadow text-gray-200 p-1' onClick={() => props.deleteWork(props.work?.id ?? "")}>
                <TrashIcon className='h-5 w-5 text-gray-200 inline-block' />
                削除
            </button>
        </div>
    )
}
