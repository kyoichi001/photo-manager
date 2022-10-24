import TagData from "@/entity/tag_data"
import UUID from "@/entity/uuid"

export interface GetTagInputData {
    id: UUID
}

export interface GetTagOutputData {
    data: TagData
}

export interface IGetTagUseCase {
    getTag: (input: GetTagInputData) => Promise<GetTagOutputData>
}