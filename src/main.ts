import path from 'path';
import { BrowserWindow, app, session, protocol } from 'electron';
import { searchDevtools } from 'electron-search-devtools';

const isDev = process.env.NODE_ENV === 'development';

// 開発モードの場合はホットリロードする
if (isDev) {
  const execPath =
    process.platform === 'win32'
      ? '../node_modules/electron/dist/electron.exe'
      : '../node_modules/.bin/electron';

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('electron-reload')(__dirname, {
    electron: path.resolve(__dirname, execPath),
    forceHardReset: true,
    hardResetMethod: 'exit',
  });
}

// BrowserWindow インスタンスを作成する関数
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.resolve(__dirname, 'preload.js'),
    },
  });

  if (isDev) {
    // 開発モードの場合はデベロッパーツールを開く
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }

  // レンダラープロセスをロード
  mainWindow.loadFile('dist/index.html');
};

app.whenReady().then(async () => {
  if (isDev) {
    // 開発モードの場合は React Devtools をロード
    const devtools = await searchDevtools('REACT');
    if (devtools) {
      await session.defaultSession.loadExtension(devtools, {
        allowFileAccess: true,
      });
    }
  }
  //https://qiita.com/whitphx/items/4123784f1eb68a1d3925
  /*protocol.interceptFileProtocol('file', (req, callback) => {
    const requestedUrl = req.url.substr(7);

    if (path.isAbsolute(requestedUrl)) {
      callback(path.normalize(path.join(__dirname, requestedUrl)));
    } else {
      callback(requestedUrl);
    }
  });*/

  // BrowserWindow インスタンスを作成
  createWindow();
});

// すべてのウィンドウが閉じられたらアプリを終了する
app.once('window-all-closed', () => app.quit());