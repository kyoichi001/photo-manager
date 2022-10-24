import UUID from "@/entity/uuid";
import { IAddTagToWorkUseCase, AddTagToWorkInputData } from "../usecase/Work/addTagToWork";
import { ICreateWorkUseCase, CreateWorkInputData } from "../usecase/Work/createWork";
import { IDeleteWorkUseCase, DeleteWorkInputData } from "../usecase/Work/deleteWork";
import { IGetTagsOfWorkUseCase, GetTagsOfWorkInputData } from "../usecase/Work/getTagsOfWork";
import { IGetWorkUseCase, GetWorkInputData } from "../usecase/Work/getWork";
import { IRemoveTagFromWorkUseCase, RemoveTagFromWorkInputData } from "../usecase/Work/removeTagFromWork";

class WorksController {
    private readonly addTagToWork: IAddTagToWorkUseCase;
    private readonly createWork: ICreateWorkUseCase;
    private readonly deleteWork: IDeleteWorkUseCase;
    private readonly getTagsOfWork: IGetTagsOfWorkUseCase;
    private readonly getWork: IGetWorkUseCase;
    private readonly removeTagFromWork: IRemoveTagFromWorkUseCase;

    constructor(
        addTagToWork: IAddTagToWorkUseCase,
        createWork: ICreateWorkUseCase,
        deleteWork: IDeleteWorkUseCase,
        getTagsOfWork: IGetTagsOfWorkUseCase,
        getWork: IGetWorkUseCase,
        removeTagFromWork: IRemoveTagFromWorkUseCase
    ) {
        this.addTagToWork = addTagToWork;
        this.createWork = createWork;
        this.deleteWork = deleteWork;
        this.getTagsOfWork = getTagsOfWork;
        this.getWork = getWork;
        this.removeTagFromWork = removeTagFromWork;
    }
    public AddTagToWork(workID: UUID, tagID: UUID) {
        const inputData: AddTagToWorkInputData = {
            workID: workID,
            tagID: tagID
        }
        return this.addTagToWork.addTagToWork(inputData);
    }
    public CreateWork(path: string) {
        const inputData: CreateWorkInputData = {
            path: path
        }
        return this.createWork.createWork(inputData);
    }
    public DeleteWork(id: UUID) {
        const inputData: DeleteWorkInputData = {
            id: id
        }
        return this.deleteWork.deleteWork(inputData);
    }
    public GetTagsOfWork(workID: UUID) {
        const inputData: GetTagsOfWorkInputData = {
            workID: workID
        }
        return this.getTagsOfWork.getTagsOfWork(inputData);
    }
    public GetWork(path: string) {
        const inputData: GetWorkInputData = {
            path: path
        }
        return this.getWork.getWork(inputData);
    }
    public RemoveTagFromWork(workID: UUID, tagID: UUID) {
        const inputData: RemoveTagFromWorkInputData = {
            workID: workID,
            tagID: tagID
        }
        return this.removeTagFromWork.removeTagFromWork(inputData);
    }
}