import { AddDirectoryInteractor } from "../interactor/WorkSpace/addDirectory";
import { GetWorkSpaceInteractor } from "../interactor/WorkSpace/getWorkSpace";
import { OpenAddDirectoryDialogInteractor } from "../interactor/WorkSpace/openAddDirectoryDialog";
import { PostWorkSpaceInteractor } from "../interactor/WorkSpace/postWorkSpace";
import { RemoveDirectoryInteractor } from "../interactor/WorkSpace/removeDirectory";
import { IAddDirectoryUseCase, AddDirectoryInputData } from "../usecase/WorkSpace/addDirectory";
import { IGetWorkSpaceUseCase } from "../usecase/WorkSpace/getWorkSpace";
import { IOpenAddDirectoryDialogUseCase } from "../usecase/WorkSpace/openAddDirectoryDialog";
import { IPostWorkSpaceUseCase } from "../usecase/WorkSpace/postWorkSpace";
import { IRemoveDirectoryUseCase, RemoveDirectoryInputData } from "../usecase/WorkSpace/removeDirectory";

export class WorkSpaceController {
    private readonly addDirectory: IAddDirectoryUseCase;
    private readonly removeDirectory: IRemoveDirectoryUseCase;
    private readonly openAddDirectoryDialog: IOpenAddDirectoryDialogUseCase;
    private readonly getWorkSpace: IGetWorkSpaceUseCase;
    private readonly postWorkSpace: IPostWorkSpaceUseCase;

    constructor() {
        this.getWorkSpace=new GetWorkSpaceInteractor()
        this.postWorkSpace=new PostWorkSpaceInteractor()
        this.addDirectory = new AddDirectoryInteractor(this.getWorkSpace,this.postWorkSpace);
        this.removeDirectory = new RemoveDirectoryInteractor(this.getWorkSpace,this.postWorkSpace);
        this.openAddDirectoryDialog=new OpenAddDirectoryDialogInteractor()
    }
    public AddDirectory(path: string) {
        const inputData: AddDirectoryInputData = {
            path: path
        }
        return this.addDirectory.addDirectory(inputData);
    }
    public RemoveDirectory(path: string) {
        const inputData: RemoveDirectoryInputData = {
            path: path
        }
        return this.removeDirectory.removeDirectory(inputData);
    }
    public async OpenDialogToAddDirectory(){
        let paths=await this.openAddDirectoryDialog.openAddDirectoryDialog({})
        for(let path in paths)
            this.AddDirectory(path)
    }
}