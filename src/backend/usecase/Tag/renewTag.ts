import Color from "@/entity/color"
import UUID from "@/entity/uuid"

export interface RenewTagInputData {
    id: UUID
    newName?: string
    newColor?: number
}

export interface RenewTagOutputData {

}

export interface IRenewTagUseCase {
    renewTag: (input: RenewTagInputData) => Promise<RenewTagOutputData>
}