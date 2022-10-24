import TagData from "@/entity/tag_data"

export interface GetTagsInputData {

}

export interface GetTagsOutputData {
    tags: TagData[]
}

export interface IGetTagsUseCase {
    getTags: (input: GetTagsInputData) => Promise<GetTagsOutputData>
}