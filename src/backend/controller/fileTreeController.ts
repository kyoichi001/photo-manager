import { GetDirectoriesInDirectoryInputData, IGetDirectoriesInDirectoryUseCase } from "../usecase/FileTree/getDirectoriesInDirectory";
import { GetFilesInDirectoryInputData, IGetFilesInDirectoryUseCase } from "../usecase/FileTree/getFilesInDirectory";

export class FileTreeController {
    private readonly getDirectoriesInDirectory: IGetDirectoriesInDirectoryUseCase;
    private readonly getFilesInDirectory: IGetFilesInDirectoryUseCase;

    constructor(getDirectoriesInDirectory: IGetDirectoriesInDirectoryUseCase, getFilesInDirectory: IGetFilesInDirectoryUseCase) {
        this.getDirectoriesInDirectory = getDirectoriesInDirectory;
        this.getFilesInDirectory = getFilesInDirectory;
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