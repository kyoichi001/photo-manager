import { GetDirectoriesInDirectoryInteractor } from "./getDirectoriesInDirectory"

test('test', async () => {
    var interactor = new GetDirectoriesInDirectoryInteractor()
    var data = await interactor.getDirectoriesInDirectory({
        path: "./test_img"
    })
    var directories = data.data.map((d) => d.path)
    expect(directories).toEqual(["empty", "folder"])
});