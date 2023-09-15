import WorkData from "@/entity/work_data"

export interface GetWorksInputData {
}

export interface GetWorksOutputData {
    works: WorkData[]
}

export interface IGetWorksUseCase {
    getWorks: (input: GetWorksInputData) => Promise<GetWorksOutputData>
}