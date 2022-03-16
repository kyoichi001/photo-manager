import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DataLoader from '../../dataloader';
import TagManager from '../../tag_manager';
import Tag from '../tag/tag';
import TagData from '../tag/tag_data';
import '../../css/common.css'

interface TagManageSceneProps {

}

export default function TagManageScene(props: TagManageSceneProps) {
    const [tags, setTags] = useState(DataLoader.LoadTags())


    let tagManager = new TagManager(
        () => tags,
        (tags_: TagData[]) => {
            console.log("set tags")
            setTags([...tags_])
            DataLoader.SaveTags(tags_)
        }
    )

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
