import { IPostTagsUseCase, PostTagsInputData, PostTagsOutputData } from "@/backend/usecase/Tag/postTags";

import fs from "fs";

const getUseDataPath = () => {
    return process.env.APPDATA + "\\photo-manager\\data"
}

export class PostTagsInteractor implements IPostTagsUseCase {
    public async postTags(input: PostTagsInputData) {
        const output: PostTagsOutputData = {

        }
        let jsonData = {
            "meta": {
                "save_format_version": "0.0.1"
            },
            "works": input.tags
        }
        const path = getUseDataPath() + "\\tags.json"
        if (!fs.existsSync(path)) {

        }
        await fs.promises.writeFile(path, JSON.stringify(jsonData), { encoding: 'utf8' })
        return output
    }

}