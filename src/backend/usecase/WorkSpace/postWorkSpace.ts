import WorkSpaceData from "@/entity/workSpaceData"

export interface PostWorkSpaceInputData {
    data: WorkSpaceData
}

export interface PostWorkSpaceOutputData {

}

export interface IPostWorkSpaceUseCase {
    postWorkSpace: (input: PostWorkSpaceInputData) => PostWorkSpaceOutputData
}