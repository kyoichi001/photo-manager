import { GetTagInputData, GetTagOutputData, IGetTagUseCase } from "@/backend/usecase/Tag/getTag";
import { IGetTagsUseCase } from "@/backend/usecase/Tag/getTags";

export class GetTagInteractor implements IGetTagUseCase {

    readonly getTags: IGetTagsUseCase

    constructor(getTags: IGetTagsUseCase) {
        this.getTags = getTags;
    }

    public async getTag(input: GetTagInputData) {
        let tagsData = await this.getTags.getTags({})
        let tags = tagsData.tags.filter((t) => t.id === input.id.uuid)
        if (tags.length === 0) {
            throw Error()
        }
        const output: GetTagOutputData = {
            data: tags[0]
        }
        return output
    }

}