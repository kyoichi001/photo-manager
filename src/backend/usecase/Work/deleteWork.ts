import UUID from "@/entity/uuid"

export interface DeleteWorkInputData {
    id: UUID
}

export interface DeleteWorkOutputData {

}

export interface IDeleteWorkUseCase {
    deleteWork: (input: DeleteWorkInputData) => Promise<DeleteWorkOutputData>
}