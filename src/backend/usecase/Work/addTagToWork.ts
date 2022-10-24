import UUID from "@/entity/uuid"

export interface AddTagToWorkInputData {
    workID: UUID
    tagID: UUID
}

export interface AddTagToWorkOutputData {

}

export interface IAddTagToWorkUseCase {
    addTagToWork: (input: AddTagToWorkInputData) => Promise<AddTagToWorkOutputData>
}