import { AddDirectoryInputData, AddDirectoryOutputData, IAddDirectoryUseCase } from "@/backend/usecase/WorkSpace/addDirectory";
import { IGetWorkSpaceUseCase } from "@/backend/usecase/WorkSpace/getWorkSpace";
import { IPostWorkSpaceUseCase } from "@/backend/usecase/WorkSpace/postWorkSpace";
import Library from "@/common/library";

export class AddDirectoryInteractor implements IAddDirectoryUseCase {

    getWorkspace:IGetWorkSpaceUseCase
    postWorkspace:IPostWorkSpaceUseCase

    constructor(getWorkspace: IGetWorkSpaceUseCase, postWorkspace: IPostWorkSpaceUseCase) {
        this.getWorkspace = getWorkspace;
        this.postWorkspace = postWorkspace;
    }

    public async addDirectory(input: AddDirectoryInputData) {
        const output: AddDirectoryOutputData = {}
        var dat=await this.getWorkspace.getWorkSpace({})
        var data=dat.data
        data.views.push({
            id: Library.generateUuid(),
            name: input.path,
            rootDirectory: input.path,
            reqursive: true,
            filters: [],
            sorts: []
        })
        await this.postWorkspace.postWorkSpace({data})
        return output
    }

}