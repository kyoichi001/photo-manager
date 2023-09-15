import { IGetWorkSpaceUseCase } from "@/backend/usecase/WorkSpace/getWorkSpace";
import { IPostWorkSpaceUseCase } from "@/backend/usecase/WorkSpace/postWorkSpace";
import { IRemoveDirectoryUseCase, RemoveDirectoryInputData, RemoveDirectoryOutputData } from "@/backend/usecase/WorkSpace/removeDirectory";

export class RemoveDirectoryInteractor implements IRemoveDirectoryUseCase {
    getWorkspace:IGetWorkSpaceUseCase
    postWorkspace:IPostWorkSpaceUseCase

    constructor(getWorkspace: IGetWorkSpaceUseCase, postWorkspace: IPostWorkSpaceUseCase) {
        this.getWorkspace = getWorkspace;
        this.postWorkspace = postWorkspace;
    }
    
    public async removeDirectory(input: RemoveDirectoryInputData) {
        const output: RemoveDirectoryOutputData = {}
        var dat=await this.getWorkspace.getWorkSpace({})
        var data=dat.data
        data.views=data.views.filter((view)=>{
            view.rootDirectory!=input.path
        })
        await this.postWorkspace.postWorkSpace({data})
        return output
    }

}