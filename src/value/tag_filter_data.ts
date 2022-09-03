import IFilter from "./filter_data"

export default interface TagFilter extends IFilter {
    type: "all" | "any" | "none"
    tags: string[]
}