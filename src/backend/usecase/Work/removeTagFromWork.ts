import UUID from "@/entity/uuid"

export interface RemoveTagFromWorkInputData {
    workID: UUID
    tagID: UUID
}

export interface RemoveTagFromWorkOutputData {

}

export interface IRemoveTagFromWorkUseCase {
    removeTagFromWork: (input: RemoveTagFromWorkInputData) => Promise<RemoveTagFromWorkOutputData>
}