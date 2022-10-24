export interface AddDirectoryInputData {
    path: string
}

export interface AddDirectoryOutputData {

}

export interface IAddDirectoryUseCase {
    addDirectory: (input: AddDirectoryInputData) => AddDirectoryOutputData
}