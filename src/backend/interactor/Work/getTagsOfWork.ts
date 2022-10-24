import { GetTagsOfWorkInputData, GetTagsOfWorkOutputData, IGetTagsOfWorkUseCase } from "@/backend/usecase/Work/getTagsOfWork";

export class GetTagsOfWorkInteractor implements IGetTagsOfWorkUseCase {
    public async getTagsOfWork(input: GetTagsOfWorkInputData) {
        const output: GetTagsOfWorkOutputData = {
            tags: []
        }
        return output
    }
}