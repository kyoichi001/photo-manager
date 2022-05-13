import React, { ChangeEvent, CSSProperties, ReactNode, useMemo, useRef, useState } from 'react';
import { useClickAway, useDisclosure, useKeypress } from './popout_hooks';
import { usePopper } from 'react-popper';

interface PopoutProps {
    children: ReactNode
    isOpen: boolean
    close: () => void
}

export default function Popout(props: PopoutProps) {

    const renamereferenceRef = useRef<HTMLLIElement | null>(null);
    const renamepopperRef = useRef<HTMLDivElement | null>(null);
    const { styles: renamestyles, attributes: renameattributes } = usePopper(
        renamereferenceRef.current,
        renamepopperRef.current,
        {
            placement: 'bottom',
        }
    );
    useClickAway(renamepopperRef, props.close);
    useKeypress('Escape', props.close);

    return (
        <div className='popout popout-bg-col'>
            <div ref={renamepopperRef} style={{
                ...renamestyles.popper,
            }
            } {
                ...renameattributes.popper
                }>
                {
                    props.isOpen &&
                    <div className='popout'>
                        {props.children}
                    </div>
                }
            </div>
        </div>
    )
}
