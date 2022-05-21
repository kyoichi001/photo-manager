
export function getSaveFileDirectory() {
    return window.myAPI.getUseDataPath()
}

//===============================================================================
//initialize
//===============================================================================
export function createFile() {
    window.myAPI.createDirectory(getSaveFileDirectory())
}
