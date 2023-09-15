import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Tag from '../tag/tag';
import TagData from '../../../entity/tag_data';
import TagInfo from '../window/tag_info';
import { useTagManager } from '../../hooks/useTagManager';
import TagDataFactory from '../../factory/TagDataFactory';

interface TagManageSceneProps {

}

export default function TagManageScene(props: TagManageSceneProps) {

    const { data: tagData, add:addTag, erase:eraceTag, edit:editTag } = useTagManager()
    const tagDataFactory = useRef<TagDataFactory | null>(null)
    const [selectedTag, setSelectedTag] = useState<TagData | undefined>(undefined)

    useEffect(() => {
        if (selectedTag) {
            editTag(selectedTag.id,selectedTag.color, selectedTag.name)
        }
    }, [selectedTag])

    const child = useMemo(() => {
        console.log("rendering main_scene_children")
        if (!tagData) {
            return <p>ロード中</p>
        }
        if (!tagDataFactory.current)
            tagDataFactory.current = new TagDataFactory(tagData)
        return <div className='flex gap-2'>
            {
                tagData.map(
                    (t) =>
                        <div onClick={() => setSelectedTag(t)} key={t.id}>
                            <Tag data={t} onTagRemove={(data) => eraceTag(data.id)} />
                        </div>
                )
            }
            <button onClick={(e) => {
                if (!tagDataFactory.current) return
                addTag([tagDataFactory.current.create("new tag")])
            }}>+</button>
        </div>
    }, [tagData])

    return (
        <div className=" grid grid-cols-12 gap-1 h-full w-full">
            <div className='col-span-9 bg-gray-600'>
                <p>タグ管理</p>
                {child}
            </div>
            <div className='col-span-3 bg-gray-600'>
                <TagInfo
                    tag={selectedTag}
                    onChangeTagName={(tag, newValue) => {
                        if (selectedTag) {
                            selectedTag.name = newValue
                            setSelectedTag({ ...selectedTag })
                        }
                    }}
                    deleteTag={(tag) => { eraceTag(tag?.id ?? "") }}
                    onChangeColor={(tag, newValue) => {
                        if (selectedTag) {
                            selectedTag.color = newValue
                            setSelectedTag({ ...selectedTag })
                        }
                    }}
                />
            </div>
        </div>
    )
}
