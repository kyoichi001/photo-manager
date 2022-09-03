
export default interface Sort {
    type: "name" | "createdAt" | "editAt" | "tag"
    order: "descend" | "ascend"
}