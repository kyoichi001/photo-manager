import { GetFilesInDirectoryInputData, GetFilesInDirectoryOutputData, IGetFilesInDirectoryUseCase } from "@/backend/usecase/FileTree/getFilesInDirectory";
import FileData from "@/entity/filedata";
import fs from "fs";

export class GetFilesInDirectoryInteractor implements IGetFilesInDirectoryUseCase {
    public async getFilesInDirectory(input: GetFilesInDirectoryInputData) {
        const output: GetFilesInDirectoryOutputData = {
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
                const data: FileData = {
                    path: ""
                }
                output.data.push(data)
            }
        }
        return output
    }

}