import { IPostWorksUseCase, PostWorksInputData, PostWorksOutputData } from "@/backend/usecase/Work/postWorks";

import fs from "fs";

const getUseDataPath = () => {
    return process.env.APPDATA + "\\photo-manager\\data"
}

export class PostWorksInteractor implements IPostWorksUseCase {
    public async postWorks(input: PostWorksInputData) {
        const output: PostWorksOutputData = {

        }
        let jsonData = {
            "meta": {
                "save_format_version": "0.0.1"
            },
            "works": input.works
        }
        const path = getUseDataPath() + "\\tags.json"
        if (!fs.existsSync(path)) {

        }
        await fs.promises.writeFile(path, JSON.stringify(jsonData), { encoding: 'utf8' })
        return output
    }

}