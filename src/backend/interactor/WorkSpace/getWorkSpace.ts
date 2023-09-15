import { GetWorkSpaceInputData, GetWorkSpaceOutputData, IGetWorkSpaceUseCase } from "@/backend/usecase/WorkSpace/getWorkSpace"

import fs from "fs";

const getUseDataPath = () => {
    return process.env.APPDATA + "\\photo-manager\\data"
}

export class GetWorkSpaceInteractor implements IGetWorkSpaceUseCase {
    public async getWorkSpace(input: GetWorkSpaceInputData) {
        const txt = await fs.promises.readFile(getUseDataPath() + "\\workspace.json", { encoding: 'utf8' })
        const output: GetWorkSpaceOutputData = {
            data:JSON.parse(txt)
        }
        return output
    }

}