import { IGetFilesInDirectoryUseCase } from "@/backend/usecase/FileTree/getFilesInDirectory";
import { GetWorksInputData, GetWorksOutputData, IGetWorksUseCase } from "@/backend/usecase/Work/getWorks";
import WorkData from "@/entity/work_data";

import fs from "fs";

const getUseDataPath = () => {
    return process.env.APPDATA + "\\photo-manager\\data"
}

const pageFileCount = 50//1ページに含むファイル数

export class GetWorksInteractor implements IGetWorksUseCase {
    readonly getFilesInDirectory: IGetFilesInDirectoryUseCase
    constructor(getFilesInDirectory: IGetFilesInDirectoryUseCase) {
        this.getFilesInDirectory = getFilesInDirectory;
    }

    public async getWorks(input: GetWorksInputData) {
        const output: GetWorksOutputData = {
            works: []
        }
        let files = await this.getFilesInDirectory.getFilesInDirectory({ path: input.directoryPath, recursive: input.recursive })
        const txt = await fs.promises.readFile(getUseDataPath() + "\\works.json", { encoding: 'utf8' })
        let worksData: any[] = JSON.parse(txt)["works"]
        let works: { [index: string]: WorkData } = {}
        for (let dat of worksData) {
            works[dat["path"]] = {
                path: dat["path"],
                tags: dat["tags"]
            }
        }
        let f = files.data.map((file) => works[file.path])
        output.works = f.slice(pageFileCount * (input.page - 1), pageFileCount * input.page)
        return output
    }

}