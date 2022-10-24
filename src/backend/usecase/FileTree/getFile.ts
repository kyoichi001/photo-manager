import FileData from "@/entity/filedata"

export interface GetFileInputData {
    path: string
}

export interface GetFileOutputData {
    data: FileData
}

export interface IGetFileUseCase {
    getFile: (input: GetFileInputData) => Promise<GetFileOutputData>
}