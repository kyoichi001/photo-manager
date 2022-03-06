import React, { useMemo, useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import WorkFilterPopout from '../popout/work_filter_popout';
import TagData from '../tag/tag_data';
import { useClickAway, useDisclosure, useKeypress } from '../popout/popout_hooks';


interface WorkMenubarProps {
    tags: TagData[]
    setFlag: (index: number, flag: boolean) => void
    activeTags: boolean[]
}

export default function WorkMenubar(props: WorkMenubarProps) {


    const referenceRef = useRef<HTMLDivElement | null>(null);
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

    function onFilterActive() {

    }

    const { isOpen, open, close } = useDisclosure(false);
    useClickAway(popperRef, close);
    useKeypress('Escape', close);

    return (
        <div className='work-menubar'>
            <p>検索</p>
            <div onClick={() => { open() }} ref={referenceRef}>
                フィルター
            </div>
            <div ref={popperRef} style={styles.popper} {...attributes.popper}>
                {
                    isOpen &&
                    <>
                        <WorkFilterPopout
                            tags={props.tags}
                            onClickTag={(i, flag) => { props.setFlag(i, flag); }}
                            activeTags={props.activeTags}
                        />
                        <div ref={setArrowElement} style={styles.arrow} />
                    </>
                }
            </div>
        </div>
    )
}
