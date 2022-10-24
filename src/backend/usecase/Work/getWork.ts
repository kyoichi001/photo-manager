import WorkData from "@/entity/work_data"

export interface GetWorkInputData {
    path: string
}

export interface GetWorkOutputData {
    data: WorkData
}

export interface IGetWorkUseCase {
    getWork: (input: GetWorkInputData) => Promise<GetWorkOutputData>
}