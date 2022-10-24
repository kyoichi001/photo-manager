import UUID from "@/entity/uuid"

export interface GetTagsOfWorkInputData {
    workID: UUID
}

export interface GetTagsOfWorkOutputData {
    tags: UUID[]
}

export interface IGetTagsOfWorkUseCase {
    getTagsOfWork: (input: GetTagsOfWorkInputData) => Promise<GetTagsOfWorkOutputData>
}