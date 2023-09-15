import { GetDirectoriesInDirectoryInteractor } from "../interactor/FileTree/getDirectoriesInDirectory";
import { GetFilesInDirectoryInteractor } from "../interactor/FileTree/getFilesInDirectory";
import { GetDirectoriesInDirectoryInputData, IGetDirectoriesInDirectoryUseCase } from "../usecase/FileTree/getDirectoriesInDirectory";
import { GetFilesInDirectoryInputData, IGetFilesInDirectoryUseCase } from "../usecase/FileTree/getFilesInDirectory";

export class FileTreeController {
    private readonly getDirectoriesInDirectory: IGetDirectoriesInDirectoryUseCase;
    private readonly getFilesInDirectory: IGetFilesInDirectoryUseCase;

    constructor() {
        this.getDirectoriesInDirectory = new GetDirectoriesInDirectoryInteractor();
        this.getFilesInDirectory = new GetFilesInDirectoryInteractor();
    }
    public GetDirectoriesInDirectory(path: string) {
        const inputData: GetDirectoriesInDirectoryInputData = {
            path: path
        }
        return this.getDirectoriesInDirectory.getDirectoriesInDirectory(inputData);
    }
    public GetFilesInDirectory(path: string) {
        const inputData: GetFilesInDirectoryInputData = {
            path: path
        }
        return this.getFilesInDirectory.getFilesInDirectory(inputData);
    }
}