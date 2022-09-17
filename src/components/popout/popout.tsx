
import { useClickAway, useKeypress } from '../../hooks/popout_hooks';
import React, { ChangeEvent, CSSProperties, ReactNode, useMemo, useRef, useState } from 'react';
import { usePopper } from 'react-popper';

interface PopoutProps {
    targetRef: Element | null
    children?: ReactNode
    isOpen: boolean
    close: () => void
}

export default function Popout(props: PopoutProps) {

    const popperRef = useRef<HTMLDivElement | null>(null);
    const { styles: renamestyles, attributes: renameattributes } = usePopper(
        props.targetRef,
        popperRef.current,
        {
            placement: 'bottom',
        }
    );
    useClickAway(popperRef, props.close);
    useKeypress('Escape', props.close);

    return (
        <div className='z-50' ref={popperRef} style={{
            ...renamestyles.popper,
        }
        } {
            ...renameattributes.popper
            }>
            {
                props.isOpen &&
                <div>
                    {props.children}
                </div>
            }
        </div>
    )
}
