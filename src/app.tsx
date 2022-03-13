//https://zenn.dev/rakim_stayfresh/articles/2928ac74a153a5
import React, { useEffect, useState } from 'react';
import AppMenu from './components/window/app_menu';
import './css/App.css';
import './css/common.css';
import MainScene from './components/scenes/main_scene';
import SettingsScene from './components/scenes/settings_scene';
import TagManageScene from './components/scenes/tag_manage_scene';
import { SceneName } from './common/context';
import DataLoader from './dataloader';

const { myAPI } = window;

function App() {
  const [_, setState] = useState('');
  const [dom, setDom] = useState(<></>);

  console.log("rendering")
  DataLoader.SetupDirectory()
  useEffect(() => {
    // イベントリスナーを追加
    const removeListener = myAPI.onReceiveMessage(
      (message: string) => {
        setState(message);
      },
    );
    // コンポーネントのクリーンアップ処理でイベントリスナーを削除する
    return () => {
      removeListener();
    };
  }, []);

  function onClickMenu(menu: SceneName) {
    switch (menu) {
      case "all_works":
        setDom(<MainScene />)
        break;
      case "tags":
        setDom(<TagManageScene />)
        break;
      case "settings":
        setDom(<SettingsScene />)
        break;
    }
  }

  return (
    <div className="app">
      <div className='view row' >
        <div className='app-file-inspector m-2 col-2'>
          <AppMenu onClickMenu={onClickMenu} />
        </div>
        <div className="col-10">
          {dom}
        </div>
      </div>
    </div>
  );
}

export default App;