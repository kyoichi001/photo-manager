import TagData from "@/entity/tag_data"

export interface CreateTagInputData {
    name: string
}

export interface CreateTagOutputData {
    data: TagData
}

export interface ICreateTagUseCase {
    createTag: (input: CreateTagInputData) => Promise<CreateTagOutputData>
}