import { DeleteTagInputData, DeleteTagOutputData, IDeleteTagUseCase } from "@/backend/usecase/Tag/deleteTag";
import { IGetTagsUseCase } from "@/backend/usecase/Tag/getTags";
import { IPostTagsUseCase } from "@/backend/usecase/Tag/postTags";

export class DeleteTagInteractor implements IDeleteTagUseCase {
    readonly getTags: IGetTagsUseCase
    readonly postTags: IPostTagsUseCase

    constructor(getTags: IGetTagsUseCase, postTags: IPostTagsUseCase) {
        this.getTags = getTags;
        this.postTags = postTags
    }
    public async deleteTag(input: DeleteTagInputData) {
        const output: DeleteTagOutputData = {

        }
        let tagsData = await this.getTags.getTags({})
        let tags = tagsData.tags.filter((t) => t.id !== input.id.uuid)
        await this.postTags.postTags({ tags: [...tags] })
        return output
    }

}