import { IGetTagsUseCase } from "@/backend/usecase/Tag/getTags";
import { IPostTagsUseCase } from "@/backend/usecase/Tag/postTags";
import { IRenewTagUseCase, RenewTagInputData, RenewTagOutputData } from "@/backend/usecase/Tag/renewTag";
import TagData from "@/entity/tag_data";


export class RenewTagInteractor implements IRenewTagUseCase {
    readonly getTags: IGetTagsUseCase
    readonly postTags: IPostTagsUseCase

    constructor(getTags: IGetTagsUseCase, postTags: IPostTagsUseCase) {
        this.getTags = getTags;
        this.postTags = postTags
    }

    public async renewTag(input: RenewTagInputData) {
        const output: RenewTagOutputData = {

        }
        let tagsData = await this.getTags.getTags({})
        let tags = tagsData.tags.map((t) => {
            if (t.id === input.id.uuid) {
                const newTag: TagData = {
                    id: t.id,
                    name: t.name,
                    color: t.color,
                    children: t.children
                }
                if (input.newColor) {
                    newTag.color = input.newColor
                }
                if (input.newName) {
                    newTag.name = input.newName
                }
                return newTag
            }
            return t
        })
        await this.postTags.postTags({ tags: [...tags] })
        return output
    }

}