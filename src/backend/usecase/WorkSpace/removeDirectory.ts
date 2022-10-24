export interface RemoveDirectoryInputData {
    path: string
}

export interface RemoveDirectoryOutputData {

}

export interface IRemoveDirectoryUseCase {
    removeDirectory: (input: RemoveDirectoryInputData) => RemoveDirectoryOutputData
}