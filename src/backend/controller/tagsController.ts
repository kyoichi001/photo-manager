import UUID from "@/entity/uuid";
import { CreateTagInputData, ICreateTagUseCase } from "../usecase/Tag/createTag";
import { DeleteTagInputData, IDeleteTagUseCase } from "../usecase/Tag/deleteTag";
import { GetTagInputData, IGetTagUseCase } from "../usecase/Tag/getTag";
import { GetTagsInputData, IGetTagsUseCase } from "../usecase/Tag/getTags";
import { IRenewTagUseCase, RenewTagInputData } from "../usecase/Tag/renewTag";
import { CreateTagInteractor } from "../interactor/Tag/createTag";
import { DeleteTagInteractor } from "../interactor/Tag/deleteTag";
import { GetTagsInteractor } from "../interactor/Tag/getTags";
import { GetTagInteractor } from "../interactor/Tag/getTag";
import { RenewTagInteractor } from "../interactor/Tag/renewTag";
import { IPostTagsUseCase } from "../usecase/Tag/postTags";
import { PostTagsInteractor } from "../interactor/Tag/postTags";

class TagsController {
    private readonly createTag: ICreateTagUseCase;
    private readonly deleteTag: IDeleteTagUseCase;
    private readonly getTags: IGetTagsUseCase;
    private readonly getTag: IGetTagUseCase;
    private readonly renewTag: IRenewTagUseCase;
    private readonly postTag: IPostTagsUseCase;

    constructor() {
        this.getTags = new GetTagsInteractor();
        this.postTag=new PostTagsInteractor();
        this.getTag = new GetTagInteractor(this.getTags);
        this.createTag = new CreateTagInteractor(this.getTags,this.postTag);
        this.deleteTag = new DeleteTagInteractor(this.getTags,this.postTag);
        this.renewTag = new RenewTagInteractor(this.getTags,this.postTag);
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