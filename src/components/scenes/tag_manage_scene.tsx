import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DataLoader from '../../dataloader';
import TagManager from '../../tag_manager';
import TagData from '../tag/tag_data';

interface TagManageSceneProps {

}

export default function TagManageScene(props: TagManageSceneProps) {
    const [tags, setTags] = useState(DataLoader.LoadTags())
    useEffect(() => {
        console.log("save tags")
        DataLoader.SaveTags(tags)
    }, [tags])

    let tagManager = new TagManager(
        () => tags,
        (tags_: TagData[]) => {
            console.log("set tags")
            setTags(tags_)
        }
    )

    return (
        <div className="tag-manage-scene">
            まだ未実装だよ！
        </div>
    )
}
