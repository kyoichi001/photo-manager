import WorkData from "@/entity/work_data"

export interface GetWorksInputData {
    directoryPath: string
    page: number
    recursive?: boolean
    //filters
    //sorts
}

export interface GetWorksOutputData {
    works: WorkData[]
}

export interface IGetWorksUseCase {
    getWorks: (input: GetWorksInputData) => Promise<GetWorksOutputData>
}