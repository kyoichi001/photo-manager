import React, { CSSProperties, useMemo, useRef, useState } from 'react';
import Tag from '../tag/tag';
import '../../css/work.css';
import '../../css/popouts.css';
import WorkData from './work_data';
import TagData from '../tag/tag_data';
import { usePopper } from 'react-popper';
import { useClickAway, useDisclosure, useKeypress } from '../popout/popout_hooks';
import TagAddPopout from '../popout/tag_add_popout';

interface WorkProps {
    data: WorkData
    all_tags: TagData[]
    idToTag: (id: string) => TagData | undefined
    onSelected?: (data: WorkData) => void
    addTagToWork: (work: string, tag: string) => void
    createTag: (name: string) => void
    onWorkPreview: (data: WorkData) => void
    onRemoveTag: (work: WorkData, tag: TagData) => void
}

export default function Work(props: WorkProps) {
    const referenceRef = useRef<HTMLButtonElement | null>(null);
    const popperRef = useRef<HTMLDivElement | null>(null);
    const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
    const { styles, attributes } = usePopper(
        referenceRef.current,
        popperRef.current,
        {
            placement: 'bottom',
            modifiers: [
                {
                    name: 'arrow',
                    options: {
                        element: arrowElement
                    },
                },
            ],
        }
    );
    const { isOpen, open, close } = useDisclosure(false);
    useClickAway(popperRef, close);
    useKeypress('Escape', close);
    const popout_style: CSSProperties = { zIndex: 100 }
    const tags = useMemo(() => {
        const tags: JSX.Element[] = []
        for (let tag of props.data.tags) {
            var dat = props.idToTag(tag)
            if (!dat) continue
            tags.push(
                <Tag key={dat.id} data={dat} onTagRemove={(data_) => { props.onRemoveTag(props.data, data_) }} />
            )
        }
        return tags
    }, [props.data.tags])
    return (
        <div className='work'>
            <div className=' p-2 work-bg' onClick={() => { if (props.onSelected) props.onSelected(props.data) }}>
                <div className='work-thumb-container'>
                    <img className='work-thumb clickable-component' src={props.data.image} alt="t" />
                    <button className='work-preview-button' onClick={() => props.onWorkPreview(props.data)}>+</button>
                </div>
                <div className='work-title'><p>{props.data.title}</p></div>
                <div className='tags'>
                    {tags}
                    <button onClick={open} ref={referenceRef}>+</button>
                </div>
                <div className='work-time'><p>{(new Date(props.data.createdAt)).toLocaleDateString("ja")}</p></div>
            </div>
            <div ref={popperRef} style={{
                ...styles.popper,
                ...popout_style
            }
            } {
                ...attributes.popper
                }>
                {
                    isOpen &&
                    <>
                        <TagAddPopout
                            tags={props.all_tags}
                            onClickTag={(tag) => props.addTagToWork(props.data.id, tag.id)}
                            onCreateTag={(name) => props.createTag(name)}
                        />
                        <div ref={setArrowElement} style={styles.arrow} />
                    </>
                }
            </div>
        </div>
    )
}
