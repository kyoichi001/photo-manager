import { GetDirectoryInputData, GetDirectoryOutputData, IGetDirectoryUseCase } from "@/backend/usecase/FileTree/getDirectory"
import fs from "fs";

export class GetDirectoryInteractor implements IGetDirectoryUseCase {
    public async getDirectory(input: GetDirectoryInputData) {
        const output: GetDirectoryOutputData = {
            data: {
                path: input.path
            }
        }
        let stat = await fs.promises.stat(input.path)
        if (!stat.isDirectory()) {
            throw Error()
        }
        return output
    }
}