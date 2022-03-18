import React, { useCallback, useEffect, useMemo, useState } from 'react';
import TagManager from '../../tag_manager';
import Tag from '../tag/tag';
import TagData from '../tag/tag_data';
import '../../css/common.css'
import WorkManager from '../../work_manager';
import WorkData from '../work/work_data';

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

    const tagDOMs: JSX.Element[] = tags.map(
        (t) => <Tag key={t.id} data={t} onTagRemove={(data) => tagManager.deleteTag(data.id)} />
    )

    return (
        <div className="tag-manage-scene">
            <div className='row'>
                <div className='col-9'>
                    <p>タグ管理</p>
                    <div className='wrap-container'>
                        {tagDOMs}
                    </div>
                </div>
                <div className='col-3'>

                </div>
            </div>
        </div>
    )
}
