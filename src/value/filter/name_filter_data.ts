import IFilter from "./filter_data"

export default interface NameFilter extends IFilter {
    type: "includes" | "not_includes" | "equal"
    name: string
}
