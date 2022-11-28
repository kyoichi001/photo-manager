import { GetFilesInDirectoryInputData, GetFilesInDirectoryOutputData, IGetFilesInDirectoryUseCase } from "@/backend/usecase/FileTree/getFilesInDirectory";
import FileData from "@/entity/filedata";
import fs from "fs";

const image_extentions = [
    "png",
    "jpg",
    "jpeg",
    "tiff",
    "gif",
    "webp"
]

export class GetFilesInDirectoryInteractor implements IGetFilesInDirectoryUseCase {
    async _getFilesInDirectory(path: string, imageOnly: boolean) {
        var res: string[] = []
        let f = await fs.promises.readdir(path)//ディレクトリ内のファイルを列挙
        for (let j of f) {
            let stat = await fs.promises.stat(path + "\\" + j)
            if (stat.isDirectory()) {
                var files = await this._getFilesInDirectory(path + "\\" + j, imageOnly)
                res = [...res, ...files]
            } else {
                if (imageOnly && !image_extentions.includes(j.split(".").at(-1)?.toLowerCase() ?? "")) continue
                res.push(path + "\\" + j)
            }
        }
        return res
    }

    public async getFilesInDirectory(input: GetFilesInDirectoryInputData) {
        if (input.imageOnly === undefined) input.imageOnly = true
        const output: GetFilesInDirectoryOutputData = {
            data: []
        }
        let stat = await fs.promises.stat(input.path)
        if (!stat.isDirectory()) {
            throw Error()
        }
        let f = await fs.promises.readdir(input.path)//ディレクトリ内のファイルを列挙
        if (input.recursive) {
            var files = await this._getFilesInDirectory(input.path, input.imageOnly)
            output.data = files.map((f) => {
                return {
                    path: f
                }
            })
        } else {
            for (let j of f) {
                let stat = await fs.promises.stat(input.path + "\\" + j)
                if (stat.isDirectory()) continue
                if (input.imageOnly && !image_extentions.includes(j.split(".").at(-1)?.toLowerCase() ?? "")) continue
                const data: FileData = {
                    path: input.path + "\\" + j
                }
                output.data.push(data)
            }
        }
        return output
    }

}