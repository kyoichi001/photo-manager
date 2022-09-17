import React, { CSSProperties, useMemo, useRef, useState } from 'react';

interface CheckboxProps {
    checked: boolean
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Checkbox(props: CheckboxProps) {
    return (
        <input className='h-4 w-4' data-toggle type="checkbox" checked={props.checked} onChange={props.onChange} />
    )
}
