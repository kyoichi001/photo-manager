//https://zenn.dev/rakim_stayfresh/articles/2928ac74a153a5
import React, { useEffect, useState } from 'react';
import AppMenu from './components/window/app_menu';
import "./input.css"
import MainScene from './components/scenes/main_scene';
import SettingsScene from './components/scenes/settings_scene';
import TagManageScene from './components/scenes/tag_manage_scene';

function App() {
  const [_, setState] = useState('');
  const [dom, setDom] = useState(<MainScene />);
  const [currentScene, setCurrentScene] = useState('all_works');


  useEffect(() => {
    //非同期処理はuseEffect内で書くべき（useEffectが書かれているコンポーネントは２回実行されるらしい）
    console.log("rendering")
    console.log("app create finished")
    //window.myAPI.createDirectory(getSaveFileDirectory())

    // イベントリスナーを追加
    const removeListener = window.myAPI.onReceiveMessage(
      (message: string) => {
        setState(message);
      },
    );
    // コンポーネントのクリーンアップ処理でイベントリスナーを削除する
    return () => {
      removeListener();
    };
  }, []);
  function onClickMenu(menu: string) {
    switch (menu) {
      case "all_works":
        setCurrentScene("all_works")
        setDom(<MainScene />)
        break;
      case "tags":
        setCurrentScene("tags")
        setDom(<TagManageScene />)
        break;
      case "settings":
        setCurrentScene("settings")
        setDom(<SettingsScene />)
        break;
    }
  }

  return (
    <div className="app">
      <div className='grid grid-cols-12 gap-2 bg-gray-800' >
        <div className='col-span-2 h-screen'>
          <AppMenu onClickMenu={onClickMenu} currentScene={currentScene} />
        </div>
        <div className="col-span-10 h-screen">
          {dom}
        </div>
      </div>
    </div>
  );
}

export default App;