import React, { CSSProperties, useMemo, useRef, useState } from 'react';
import WorkData from '../../value/work_data';
import TagData from '../../value/tag_data';
import { PlusIcon } from '@heroicons/react/solid';
import ITagFactory from '../../factory/iTagFactory';
import ITagDataFactory from '../../factory/iTagDataFactory';

interface WorkTagsProps {
    data: WorkData
    tagFactory: ITagFactory
    tagDataFactory: ITagDataFactory
    onTagPopoutOpen: (data: WorkData, elem: Element) => void
    onTagRemove: (work: WorkData, tag: TagData) => void
}

export default function WorkTags(props: WorkTagsProps) {
    const tags = useMemo(() => {
        console.log("generate tags " + props.data.tags.length)
        var t: JSX.Element[] = []
        for (let tag of props.data.tags) {
            var dat = props.tagDataFactory.convert(tag)
            if (!dat) continue
            t.push(props.tagFactory.create(dat, (tag) => props.onTagRemove(props.data, tag)))
        }
        return t
    }, [props.data.tags])

    return (
        <div className='flex flex-wrap p-1 gap-1'>
            {tags}
            <div className='bg-gray-300 hover:bg-gray-400 rounded-sm shadow h-4' onClick={(e) => props.onTagPopoutOpen(props.data, e.currentTarget)}>
                <PlusIcon className="h-4 w-4 text-gray-800" />
            </div>
        </div>
    )
}
