import IFilter from "./filter_data"

export default interface TimeFilter extends IFilter {
    type: "later_than" | "faster_than"
    time: string
}