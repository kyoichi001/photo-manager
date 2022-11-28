import WorkData from "@/entity/work_data"

export interface GetWorksInputData {
    directoryPath: string
    recursive?: boolean
    //filters
    //sorts
    workspacePath: string
}

export interface GetWorksOutputData {
    works: WorkData[]
}

export interface IGetWorksUseCase {
    getWorks: (input: GetWorksInputData) => Promise<GetWorksOutputData>
}