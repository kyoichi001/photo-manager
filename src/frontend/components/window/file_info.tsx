import React, { useEffect, useMemo, useRef, useState } from 'react';
import Tag from '../tag/tag';
import TagData from '../../../entity/tag_data';
import WorkData from '../../../entity/work_data';
import { TrashIcon } from '@heroicons/react/24/solid'

interface FileInfoProps {
    work?: WorkData
    idToTag: (id: string) => TagData | undefined
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
        tags.push(<Tag data={dat} key={dat.id} onTagRemove={(tag) => { props.removeTag(props.work?.path ?? "", tag.id) }} />)
    }

    const imgRef = useRef<HTMLImageElement>(null)
    const [imgWidth, setImgWidth] = useState<number | undefined>(undefined)
    const [imgHeight, setImgHeight] = useState<number | undefined>(undefined)

    useEffect(() => {
        console.log("renew file_info img px")
        setImgWidth(imgRef.current?.naturalWidth)
        setImgHeight(imgRef.current?.naturalHeight)
    }, [props.work.path])

    return (
        <div className='file-info p-1'>
            <div className='text-xl border-b-2 text-white p-2 mb-3'>
                FileInfo
            </div>
            <div className='mb-3 bg-gray-500 p-1 rounded-sm divide-y'>
                <div className='font-bold text-gray-100'>image</div>
                <img className="work-thumb py-1" src={props.work.path} alt="t" ref={imgRef} />
                <div className='font-bold text-gray-100'>px : {imgHeight ?? "Loading..."} x {imgWidth ?? "Loading..."}</div>
            </div>
            <div className='mb-3 bg-gray-500 p-1 rounded-sm divide-y'>
                <div className='font-bold text-gray-100'>path</div>
                <div className='break-words text-gray-100'><p>{props.work.path}</p></div>
            </div>
            <div className='mb-3 bg-gray-500 p-1 rounded-sm divide-y'>
                <div className='font-bold text-gray-100'>tags ({tags.length})</div>

                <div className='flex flex-wrap gap-1 py-1'>
                    {tags.length === 0 ? "none" : tags}
                </div>
            </div>
        </div>
    )
}
