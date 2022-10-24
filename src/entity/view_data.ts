import IFilter from "./filter/filter_data"
import Sort from "./sort_data"

export default interface ViewData {
    id: string
    name: string
    filters: IFilter[]
    sorts: Sort[]
}