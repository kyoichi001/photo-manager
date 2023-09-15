import { PostWorkSpaceInputData, IPostWorkSpaceUseCase, PostWorkSpaceOutputData } from "@/backend/usecase/WorkSpace/postWorkSpace"

import fs from "fs";

const getUseDataPath = () => {
    return process.env.APPDATA + "\\photo-manager\\data"
}

export class PostWorkSpaceInteractor implements IPostWorkSpaceUseCase {
    public async postWorkSpace(input: PostWorkSpaceInputData) {
        const output: PostWorkSpaceOutputData = {}
        const path = getUseDataPath() + "\\workspace.json"
        if (!fs.existsSync(path)) {

        }
        await fs.promises.writeFile(path, JSON.stringify(input.data), { encoding: 'utf8' })
        return output
    }

}