import WorkData from "@/entity/work_data"

export interface PostWorksInputData {
    works: WorkData[]
}

export interface PostWorksOutputData {

}

export interface IPostWorksUseCase {
    postWorks: (input: PostWorksInputData) => Promise<PostWorksOutputData>
}