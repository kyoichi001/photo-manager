import UUID from "@/entity/uuid";
import { CreateTagInputData, ICreateTagUseCase } from "../usecase/Tag/createTag";
import { DeleteTagInputData, IDeleteTagUseCase } from "../usecase/Tag/deleteTag";
import { GetTagInputData, IGetTagUseCase } from "../usecase/Tag/getTag";
import { GetTagsInputData, IGetTagsUseCase } from "../usecase/Tag/getTags";
import { IRenewTagUseCase, RenewTagInputData } from "../usecase/Tag/renewTag";

class TagsController {
    private readonly createTag: ICreateTagUseCase;
    private readonly deleteTag: IDeleteTagUseCase;
    private readonly getTags: IGetTagsUseCase;
    private readonly getTag: IGetTagUseCase;
    private readonly renewTag: IRenewTagUseCase;

    constructor(createTag: ICreateTagUseCase, eraceTag: IDeleteTagUseCase, getTags: IGetTagsUseCase, getTag: IGetTagUseCase, renewTag: IRenewTagUseCase) {
        this.createTag = createTag;
        this.deleteTag = eraceTag;
        this.getTags = getTags;
        this.getTag = getTag;
        this.renewTag = renewTag;
    }
    public AddTag(name?: string) {
        const inputData: CreateTagInputData = {
            name: name ?? "new tag"
        }
        return this.createTag.createTag(inputData);
    }
    public RemoveTag(id: UUID) {
        const inputData: DeleteTagInputData = {
            id: id
        }
        return this.deleteTag.deleteTag(inputData);
    }
    public GetTags() {
        const inputData: GetTagsInputData = {

        }
        return this.getTags.getTags(inputData);
    }
    public GetTag(id: UUID) {
        const inputData: GetTagInputData = {
            id: id
        }
        return this.getTag.getTag(inputData);
    }
    public RenewTag(id: UUID) {
        const inputData: RenewTagInputData = {
            id: id
        }
        return this.renewTag.renewTag(inputData);
    }
}