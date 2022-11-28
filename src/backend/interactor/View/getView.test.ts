import { GetFilesInDirectoryInteractor } from "../FileTree/getFilesInDirectory"
import { GetWorksInteractor } from "../Work/getWorks"
import { GetViewInteractor } from "./getView"

test("test", async () => {
    var getFiles = new GetFilesInDirectoryInteractor()
    var getWorks = new GetWorksInteractor(getFiles)
    var interactor = new GetViewInteractor(getWorks)
    var view = await interactor.getView({
        directoryPath: "./test_img",
        page: 1,
        workspacePath: "./test_img"
    })
    expect(view.works).toEqual([
        { path: './test_img\\1.png', tags: [] },
        { path: './test_img\\2.png', tags: [] }
    ])
})