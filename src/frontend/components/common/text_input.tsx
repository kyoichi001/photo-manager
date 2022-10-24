import React, { CSSProperties, useMemo, useRef, useState } from 'react';

interface TextInputProps {
    onEnter: (input: string) => void
    placeHolder: string
    init_input?: string
}

export default function TextInput(props: TextInputProps) {
    const [input, setInput] = useState(props.init_input ?? "")
    return (
        <input className="bg-gray-700 text-gray-300 px-1 shadow-inner rounded-sm" type="text" id='text' name='text'
            placeholder={props.placeHolder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
                if (e.key == 'Enter') {
                    e.preventDefault()
                    props.onEnter(input)
                }
            }}
            onBlur={(e) => {
                props.onEnter(input)
            }}
        />
    )
}
