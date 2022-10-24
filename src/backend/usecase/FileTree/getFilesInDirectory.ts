import FileData from "@/entity/filedata"

export interface GetFilesInDirectoryInputData {
    path: string
}

export interface GetFilesInDirectoryOutputData {
    data: FileData[]
}

export interface IGetFilesInDirectoryUseCase {
    getFilesInDirectory: (input: GetFilesInDirectoryInputData) => Promise<GetFilesInDirectoryOutputData>
}