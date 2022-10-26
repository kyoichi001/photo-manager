import FileData from "@/entity/filedata"

export interface GetFilesInDirectoryInputData {
    path: string
    recursive?: boolean
}

export interface GetFilesInDirectoryOutputData {
    data: FileData[]
}

export interface IGetFilesInDirectoryUseCase {
    getFilesInDirectory: (input: GetFilesInDirectoryInputData) => Promise<GetFilesInDirectoryOutputData>
}