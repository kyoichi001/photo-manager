import { CreateWorkInputData, CreateWorkOutputData, ICreateWorkUseCase } from "@/backend/usecase/Work/createWork";

export class CreateWorkInteractor implements ICreateWorkUseCase {
    public async createWork(input: CreateWorkInputData) {

        const output: CreateWorkOutputData = {
            data: {path:"",tags:[]}
        }
        return output
    }
}