import TagData from "@/entity/tag_data"

export interface PostTagsInputData {
    tags: TagData[]
}

export interface PostTagsOutputData {

}

export interface IPostTagsUseCase {
    postTags: (input: PostTagsInputData) => Promise<PostTagsOutputData>
}