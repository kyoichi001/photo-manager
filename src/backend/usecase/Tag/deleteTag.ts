import UUID from "@/entity/uuid"

export interface DeleteTagInputData {
    id: UUID
}

export interface DeleteTagOutputData {

}

export interface IDeleteTagUseCase {
    deleteTag: (input: DeleteTagInputData) => Promise<DeleteTagOutputData>
}