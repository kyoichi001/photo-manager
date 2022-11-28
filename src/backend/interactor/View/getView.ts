
import { IGetViewUseCase, GetViewInputData, GetViewOutputData } from "@/backend/usecase/View/getView";
import { IGetWorksUseCase } from "@/backend/usecase/Work/getWorks";

const pageFileCount = 50//1ページに含むファイル数

export class GetViewInteractor implements IGetViewUseCase {
    readonly getWorks: IGetWorksUseCase
    constructor(getWorks: IGetWorksUseCase) {
        this.getWorks = getWorks;
    }

    public async getView(input: GetViewInputData) {
        const output: GetViewOutputData = {
            works: [],
            hasNextPage: false
        }
        let files = await this.getWorks.getWorks({
            directoryPath: input.directoryPath,
            recursive: input.recursive,
            workspacePath: input.workspacePath
        })
        output.hasNextPage = files.works.length > input.page * pageFileCount
        output.works = files.works.slice(pageFileCount * (input.page - 1), pageFileCount * input.page)
        return output
    }

}