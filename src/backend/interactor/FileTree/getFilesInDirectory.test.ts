import { GetFilesInDirectoryInteractor } from "./getFilesInDirectory"

test('get files', async () => {
    var interactor = new GetFilesInDirectoryInteractor()
    var data = await interactor.getFilesInDirectory({
        path: "./test_img"
    })
    var directories = data.data.map((d) => d.path)
    expect(directories).toEqual([
        './test_img\\1.png',
        './test_img\\2.png',
    ])
});

test('get files reqursive', async () => {
    var interactor = new GetFilesInDirectoryInteractor()
    var data = await interactor.getFilesInDirectory({
        path: "./test_img",
        recursive: true
    })
    var directories = data.data.map((d) => d.path)
    expect(directories).toEqual([
        './test_img\\1.png',
        './test_img\\2.png',
        './test_img\\folder\\child\\child_1.PNG',
        './test_img\\folder\\folder_1.PNG',
        './test_img\\folder\\folder_2.PNG',
        './test_img\\folder\\folder_3.PNG',
        './test_img\\folder\\folder_4.PNG'
    ])
});