import { IAddDirectoryUseCase, AddDirectoryInputData } from "../usecase/WorkSpace/addDirectory";
import { IRemoveDirectoryUseCase, RemoveDirectoryInputData } from "../usecase/WorkSpace/removeDirectory";

class WorkSpaceController {
    private readonly addDirectory: IAddDirectoryUseCase;
    private readonly removeDirectory: IRemoveDirectoryUseCase;

    constructor(addDirectory: IAddDirectoryUseCase, removeDirectory: IRemoveDirectoryUseCase) {
        this.addDirectory = addDirectory;
        this.removeDirectory = removeDirectory;
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
}