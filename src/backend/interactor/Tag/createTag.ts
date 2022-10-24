import { CreateTagInputData, CreateTagOutputData, ICreateTagUseCase } from "@/backend/usecase/Tag/createTag";
import { IGetTagsUseCase } from "@/backend/usecase/Tag/getTags";
import { IPostTagsUseCase } from "@/backend/usecase/Tag/postTags";
import { Col } from "@/common/color";
import Library from "@/common/library";

export class CreateTagInteractor implements ICreateTagUseCase {

    readonly getTags: IGetTagsUseCase
    readonly postTags: IPostTagsUseCase

    constructor(getTags: IGetTagsUseCase, postTags: IPostTagsUseCase) {
        this.getTags = getTags;
        this.postTags = postTags
    }

    public async createTag(input: CreateTagInputData) {
        const output: CreateTagOutputData = {
            data: {
                id: Library.generateUuid(),
                name: input.name,
                color: Col.hexstringToColor("#FFFFFF"),
                children: []
            }
        }
        let tagsData = await this.getTags.getTags({})
        let tags = tagsData.tags
        await this.postTags.postTags({ tags: [...tags, output.data] })
        return output
    }

}