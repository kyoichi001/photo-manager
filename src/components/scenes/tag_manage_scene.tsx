import React, { useCallback, useEffect, useMemo, useState } from 'react';
import TagManager from '../../tag_manager';
import Tag from '../tag/tag';
import TagData from '../tag/tag_data';
import WorkManager from '../../work_manager';
import WorkData from '../work/work_data';
import TagInfo from '../window/tag_info';

interface TagManageSceneProps {

}

export default function TagManageScene(props: TagManageSceneProps) {
    const [renderFlag, setRenderFlag] = useState(false)

    let tagManager = new TagManager(() => {
        setRenderFlag(renderFlag ? false : true)
    })
    let workManager = new WorkManager(() => {
        setRenderFlag(renderFlag ? false : true)
    })


    const [tags, setTags] = useState<TagData[]>([])
    const [selectedTag, setSelectedTag] = useState<TagData | undefined>(undefined)

    useEffect(() => {
        if (selectedTag) {
            tagManager.editTag(selectedTag.id, selectedTag?.name, selectedTag.color)
        }
    }, [selectedTag])

    const fetchData = async () => {
        console.log("fetch data")
        try {
            const t = await tagManager.getTags()
            setTags(t)
        } catch (error) {
            console.log("tags")
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [renderFlag])

    return (
        <div className=" grid grid-cols-12 gap-1 h-full w-full">
            <div className='col-span-9 bg-gray-600'>
                <p>タグ管理</p>
                <div className='flex gap-2'>
                    {
                        tags.map(
                            (t) =>
                                <div onClick={() => setSelectedTag(t)} key={t.id}>
                                    <Tag data={t} onTagRemove={(data) => tagManager.deleteTag(data.id)} />
                                </div>
                        )
                    }
                    <button onClick={(e) => tagManager.addTag("new tag")}>+</button>
                </div>
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
                    deleteTag={(tag) => { tagManager.deleteTag(tag?.id ?? "") }}
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
