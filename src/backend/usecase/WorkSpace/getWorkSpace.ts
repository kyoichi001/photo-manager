import WorkSpaceData from "@/entity/workSpaceData"

export interface GetWorkSpaceInputData {
}

export interface GetWorkSpaceOutputData {
data:WorkSpaceData
}

export interface IGetWorkSpaceUseCase {
    getWorkSpace: (input: GetWorkSpaceInputData) => Promise<GetWorkSpaceOutputData>
}