import DirectoryData from "@/entity/directoryData"

export interface GetDirectoryInputData {
    path: string
}

export interface GetDirectoryOutputData {
    data: DirectoryData
}

export interface IGetDirectoryUseCase {
    getDirectory: (input: GetDirectoryInputData) => Promise<GetDirectoryOutputData>
}