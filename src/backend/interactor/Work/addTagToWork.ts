import { AddTagToWorkInputData, AddTagToWorkOutputData, IAddTagToWorkUseCase } from "@/backend/usecase/Work/addTagToWork";
import { IGetWorkUseCase } from "@/backend/usecase/Work/getWork";
import { IGetWorksUseCase } from "@/backend/usecase/Work/getWorks";
import { IPostWorksUseCase } from "@/backend/usecase/Work/postWorks";
export class AddTagToWorkInteractor implements IAddTagToWorkUseCase {
    readonly getWorks: IGetWorksUseCase
    readonly postWorks: IPostWorksUseCase

    constructor(getWorks: IGetWorksUseCase, postWorks: IPostWorksUseCase) {
        this.getWorks = getWorks;
        this.postWorks = postWorks;
    }

    public async addTagToWork(input: AddTagToWorkInputData) {
        let worksData = await this.getWorks.getWorks({})
        let works = worksData.works
        for (let work of works) {
            if (work.path === input.workID.uuid) {
                work.tags.push(input.tagID.uuid)
            }
        }
        this.postWorks.postWorks({ works: works })
        const output: AddTagToWorkOutputData = {

        }
        return output
    }

}