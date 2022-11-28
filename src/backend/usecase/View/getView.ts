import Color from "@/entity/color"
import UUID from "@/entity/uuid"
import WorkData from "@/entity/work_data"

export interface GetViewInputData {
    directoryPath: string,
    page: number,
    recursive?: boolean,
    workspacePath: string
}

export interface GetViewOutputData {
    works: WorkData[]
    hasNextPage: boolean
}

export interface IGetViewUseCase {
    getView: (input: GetViewInputData) => Promise<GetViewOutputData>
}