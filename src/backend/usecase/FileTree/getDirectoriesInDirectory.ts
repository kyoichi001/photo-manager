import DirectoryData from "@/entity/directoryData"

export interface GetDirectoriesInDirectoryInputData {
    path: string
}

export interface GetDirectoriesInDirectoryOutputData {
    data: DirectoryData[]
}

export interface IGetDirectoriesInDirectoryUseCase {
    getDirectoriesInDirectory: (input: GetDirectoriesInDirectoryInputData) => Promise<GetDirectoriesInDirectoryOutputData>
}