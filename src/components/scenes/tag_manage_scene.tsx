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
        <div className="tag-manage-scene">
            <div className='window'>
                <div className='row'>
                    <div className='col-9'>
                        <p>タグ管理</p>
                        <div className='wrap-container'>
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
                    <div className='col-3'>
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
            </div>
        </div>
    )
}
