import WorkData from "@/entity/work_data"

export interface CreateWorkInputData {
    path: string
}

export interface CreateWorkOutputData {
    data: WorkData
}

export interface ICreateWorkUseCase {
    createWork: (input: CreateWorkInputData) => Promise<CreateWorkOutputData>
}