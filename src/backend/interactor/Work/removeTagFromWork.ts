import { IRemoveTagFromWorkUseCase, RemoveTagFromWorkInputData, RemoveTagFromWorkOutputData } from "@/backend/usecase/Work/removeTagFromWork";

export class RemoveTagFromWork implements IRemoveTagFromWorkUseCase {
    public async removeTagFromWork(input: RemoveTagFromWorkInputData) {
        const output: RemoveTagFromWorkOutputData = {

        }
        return output
    }

}