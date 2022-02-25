import React, { useMemo } from 'react';

interface TextBoxProps {
    defaultText?: string
    label?: string
}

export default function TextBox(props: TextBoxProps) {
    return (
        <div className='text-box'>
            <input type="text" id="name" name="name"><p>{props.label}</p></input>
        </div>
    )
}
