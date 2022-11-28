import { IGetFilesInDirectoryUseCase } from "@/backend/usecase/FileTree/getFilesInDirectory";
import { GetWorksInputData, GetWorksOutputData, IGetWorksUseCase } from "@/backend/usecase/Work/getWorks";
import WorkData from "@/entity/work_data";

import fs from "fs";

const getUseDataPath = () => {
    return process.env.APPDATA + "\\photo-manager\\data"
}


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
        const txt = await fs.promises.readFile(input.workspacePath + "\\works.json", { encoding: 'utf8' })
        let worksData: any[] = JSON.parse(txt)["works"]
        let works: { [index: string]: WorkData } = {}
        for (let dat of worksData) {
            works[dat["path"]] = dat
        }
        output.works = files.data.map((file) => {
            return {
                path: file.path,
                tags: works[file.path]?.tags ?? []
            }
        })
        return output
    }

}