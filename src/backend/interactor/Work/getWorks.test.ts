import { GetFilesInDirectoryInteractor } from "../FileTree/getFilesInDirectory";
import { GetWorksInteractor } from "./getWorks";

test("test", async () => {
    var getFiles = new GetFilesInDirectoryInteractor()
    var interactor = new GetWorksInteractor(getFiles)
    var works = await interactor.getWorks({ directoryPath: "./test_img", workspacePath: "./test_img" })
    expect(works.works).toEqual([
        { path: './test_img\\1.png', tags: [] },
        { path: './test_img\\2.png', tags: [] }
    ])
})