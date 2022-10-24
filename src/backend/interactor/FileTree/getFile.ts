import { GetFileInputData, GetFileOutputData, IGetFileUseCase } from "@/backend/usecase/FileTree/getFile";

export class GetFileInteractor implements IGetFileUseCase {
    public async getFile(input: GetFileInputData) {
        const output: GetFileOutputData = {
            data: {
                path: input.path
            }
        }
        return output
    }
}