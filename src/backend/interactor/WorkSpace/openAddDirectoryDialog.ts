import { IOpenAddDirectoryDialogUseCase, OpenAddDirectoryDialogInputData, OpenAddDirectoryDialogOutputData } from "@/backend/usecase/WorkSpace/openAddDirectoryDialog";
import {dialog} from "electron"

export class OpenAddDirectoryDialogInteractor implements IOpenAddDirectoryDialogUseCase {
    public async openAddDirectoryDialog(input: OpenAddDirectoryDialogInputData) {
        const output: OpenAddDirectoryDialogOutputData = {
            paths:[]
        }
        var res=await dialog.showOpenDialog({
            properties:["openDirectory","showHiddenFiles"]
        })
        output.paths=res.filePaths
        return output
    }
}