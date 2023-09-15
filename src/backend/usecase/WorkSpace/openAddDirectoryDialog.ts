
export interface OpenAddDirectoryDialogInputData {
}

export interface OpenAddDirectoryDialogOutputData {
    paths:string[]
}

export interface IOpenAddDirectoryDialogUseCase {
    openAddDirectoryDialog: (input: OpenAddDirectoryDialogInputData) => Promise<OpenAddDirectoryDialogOutputData>
}