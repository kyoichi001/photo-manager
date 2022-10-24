import { GetDirectoriesInDirectoryInputData, GetDirectoriesInDirectoryOutputData, IGetDirectoriesInDirectoryUseCase } from "@/backend/usecase/FileTree/getDirectoriesInDirectory";
import DirectoryData from "@/entity/directoryData";
import fs from "fs";

export class GetDirectoriesInDirectoryInteractor implements IGetDirectoriesInDirectoryUseCase {
    public async getDirectoriesInDirectory(input: GetDirectoriesInDirectoryInputData) {
        const output: GetDirectoriesInDirectoryOutputData = {
            data: []
        }
        let stat = await fs.promises.stat(input.path)
        if (!stat.isDirectory()) {
            throw Error()
        }
        let f = await fs.promises.readdir(input.path)//ディレクトリ内のファイルを列挙
        for (let j of f) {
            let stat = await fs.promises.stat(input.path + "\\" + j)
            if (stat.isDirectory()) {
                const data: DirectoryData = {
                    path: ""
                }
                output.data.push(data)
            }
        }
        return output
    }
}