//https://zenn.dev/remon/articles/ae268edf552728

import React, { useState, useEffect, useRef, RefObject } from 'react';
import { usePopper } from 'react-popper';

const defaultEvents = ['mousedown', 'touchstart'];

export const useClickAway = <E extends Event = Event>(
    ref: RefObject<HTMLElement | null>,
    onClickAway: (event: E) => void,
    events: string[] = defaultEvents
) => {
    const savedCallback = useRef(onClickAway);
    useEffect(() => {
        savedCallback.current = onClickAway;
    }, [onClickAway]);
    useEffect(() => {
        const handler = (event: any) => {
            const { current: el } = ref;
            if (el && !el.contains(event.target)) {
                savedCallback.current(event);
            }
        };
        events.forEach(eventName => document.addEventListener(eventName, handler));
        return () => {
            events.forEach(eventName =>
                document.removeEventListener(eventName, handler)
            );
        };
    }, [events, ref]);
};

export const useDisclosure = (initialValue: boolean) => {
    const [isOpen, setIsOpen] = useState(initialValue);
    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return {
        isOpen,
        open,
        close,
    };
};

export function useKeypress(key: string, handler: () => void) {
    const savedHandler = useRef(handler);
    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        const onKeyup = (event: KeyboardEvent) => {
            if (event.key === key) {
                savedHandler.current();
            }
        };
        document.addEventListener('keyup', onKeyup);
        return () => document.removeEventListener('keyup', onKeyup);
    }, []);
}

export const Example = () => {
    const referenceRef = useRef<HTMLButtonElement | null>(null);
    const popperRef = useRef<HTMLDivElement | null>(null);
    const { styles, attributes } = usePopper(
        referenceRef.current,
        popperRef.current,
        {
            placement: 'bottom',
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [0, 16],
                    },
                },
            ],
        }
    );

    const { isOpen, open, close } = useDisclosure(false);
    useClickAway(popperRef, close);
    useKeypress('Escape', close);

    return (
        <div>
            <button onClick={open} ref={referenceRef}>
                open
            </button>
            <div ref={popperRef} style={styles.popper} {...attributes.popper}>
                {isOpen && <p>content</p>}
            </div>
        </div>
    );
};
