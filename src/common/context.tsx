
export type SceneName = "all_works" | "tags" | "settings"

import { createContext } from "react";
import TagData from "../components/tag/tag_data";
import WorkData from "../components/work/work_data";

export interface State {
    works: WorkData[]
    tags: TagData[]
}

export type Type = "INIT" | "ACTIVE"

export interface Action {
    type: Type
    init?: any
    actives?: string[],
}


export const initState: State = {
    works: [],
    tags: []
}

/*export function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "INIT":
            return init(state, action.init!);
        case "ACTIVE":
            return active(state, action.actives!)
        default:
            return state
    }
}
function init(state: State, init: any): State {
    return { state, ...init }
}

function active(state: State, actives: string[]): State {
    return { ...state, actives: actives }
}

export const Context = createContext({} as {
    state: State
    dispatch: Dispatch<Action>
})*/