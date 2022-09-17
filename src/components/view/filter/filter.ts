import TagFilter from "../../../value/filter/tag_filter_data";
import TimeFilter from "../../../value/filter/time_filter_data";
import WorkData from "../../../value/work_data";
import IFilter from "../../../value/filter/filter_data";
import NameFilter from "../../../value/filter/name_filter_data";

function implementsNameFilter(arg: any): arg is NameFilter {
    return arg !== null &&
        typeof arg === "object" &&
        typeof arg.name === "string"
}
function implementsTagFilter(arg: any): arg is TagFilter {
    return arg !== null &&
        typeof arg === "object" &&
        Array.isArray(arg.tags)
}
function implementsTimeFilter(arg: any): arg is TimeFilter {
    return arg !== null &&
        typeof arg === "object" &&
        typeof arg.time === "string"
}

export default class Filter {

    data: IFilter | null = null

    constructor(data: IFilter) {
        data = data
    }
    filter(work: WorkData): boolean {
        if (implementsNameFilter(this.data)) {
            const filename = work.image.split("\\").pop()
            if (this.data.type === "includes") {
                return filename?.includes(this.data.name) ?? false
            }
            if (this.data.type === "not_includes") {
                return !filename?.includes(this.data.name) ?? false
            }
            if (this.data.type === "equal") {
                return filename === this.data.name
            }
        }
        if (implementsTagFilter(this.data)) {
            if (this.data.type === "all") {
                for (var dat in this.data.tags) {
                    if (!work.tags.includes(dat)) return false
                }
                return true
            }
            if (this.data.type === "any") {
                for (var dat in this.data.tags) {
                    if (work.tags.includes(dat)) return true
                }
                return false
            }
            if (this.data.type === "none") {
                for (var dat in this.data.tags) {
                    if (work.tags.includes(dat)) return false
                }
                return true
            }
        }
        if (implementsTimeFilter(this.data)) {
            if (this.data.type === "faster_than") {

            }
            if (this.data.type === "later_than") {

            }
        }
        return false
    }

}