import { GetTagsInputData, GetTagsOutputData, IGetTagsUseCase } from "@/backend/usecase/Tag/getTags";
import TagData from "@/entity/tag_data";

import fs from "fs";

const getUseDataPath = () => {
    return process.env.APPDATA + "\\photo-manager\\data"
}

export class GetTagsInteractor implements IGetTagsUseCase {
    public async getTags(input: GetTagsInputData) {
        const output: GetTagsOutputData = {
            tags: []
        }
        const txt = await fs.promises.readFile(getUseDataPath() + "\\tags.json", { encoding: 'utf8' })
        const json = JSON.parse(txt)
        console.log(json)
        let tags: any[] = json["tags"]
        let res: TagData[] = tags.map((v) => {
            return {
                id: v["id"],
                name: v["name"],
                color: v["color"],
                children: []
            }
        })
        return output
    }

}