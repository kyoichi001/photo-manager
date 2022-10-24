import { DeleteWorkInputData, DeleteWorkOutputData, IDeleteWorkUseCase } from "@/backend/usecase/Work/deleteWork";

export class DeleteWorkInteractor implements IDeleteWorkUseCase {
    public async deleteWork(input: DeleteWorkInputData) {
        const output: DeleteWorkOutputData = {

        }
        return output
    }

}