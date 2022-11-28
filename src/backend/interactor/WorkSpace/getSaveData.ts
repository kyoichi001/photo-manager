import { GetSaveDataInputData, GetSaveDataOutputData, IGetSaveDataUseCase } from "@/backend/usecase/WorkSpace/getsaveData"
import fs from "fs";

export class GetSaveDataInteractor implements IGetSaveDataUseCase {
    public async getSaveData(input: GetSaveDataInputData) {
        const worksFile = await fs.promises.readFile(input.saveFilePath + "\\works.json", { encoding: 'utf8' })
        const worksData: any[] = JSON.parse(worksFile)["works"]
        const tagsFile = await fs.promises.readFile(input.saveFilePath + "\\tags.json", { encoding: 'utf8' })
        const tagsData: any[] = JSON.parse(tagsFile)["tags"]
        const output: GetSaveDataOutputData = {
            data: {
                works: worksData,
                tags: tagsData
            }
        }
        return output
    }

}