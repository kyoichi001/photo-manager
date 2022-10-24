import { GetWorkInputData, GetWorkOutputData, IGetWorkUseCase } from "@/backend/usecase/Work/getWork";
import { IGetWorksUseCase } from "@/backend/usecase/Work/getWorks";

import fs from "fs";

const getUseDataPath = () => {
    return process.env.APPDATA + "\\photo-manager\\data"
}

export class GetWorkInteractor implements IGetWorkUseCase {
    readonly getWorks: IGetWorksUseCase

    constructor(getWorks: IGetWorksUseCase) {
        this.getWorks = getWorks;
    }
    public async getWork(input: GetWorkInputData) {
        const txt = await fs.promises.readFile(getUseDataPath() + "\\works.json", { encoding: 'utf8' })
        let worksData: any[] = JSON.parse(txt)["works"]
        for (let dat of worksData) {
            if (dat["path"] === input.path) {
                const output: GetWorkOutputData = {
                    data: {
                        path: dat["path"],
                        tags: dat["tags"]
                    }
                }
                return output
            }
        }
        throw Error()
    }

}