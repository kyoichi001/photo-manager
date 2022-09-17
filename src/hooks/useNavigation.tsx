import { useState } from "react"

export const useNavigation = (init_index: number, count: number, is_circular: boolean = true) => {
    const [index, setIndex] = useState(init_index)
    const next = () => {
        let n = index + 1
        if (n >= count) {
            if (is_circular) {
                n = 0
            } else {
                n = count - 1
            }
        }
        setIndex(n)
    }
    const prev = () => {
        let n = index - 1
        if (n < 0) {
            if (is_circular) {
                n = count - 1
            } else {
                n = 0
            }
        }
        setIndex(n)
    }
    return { index, next, prev, setIndex }
}