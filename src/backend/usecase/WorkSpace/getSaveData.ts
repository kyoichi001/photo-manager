import SaveFileData from "@/entity/saveFileData"

export interface GetSaveDataInputData {
    saveFilePath: string
}

export interface GetSaveDataOutputData {
    data: SaveFileData
}

export interface IGetSaveDataUseCase {
    getSaveData: (input: GetSaveDataInputData) => Promise<GetSaveDataOutputData>
}