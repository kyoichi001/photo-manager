import React, { useMemo } from 'react';
import { SceneName } from '../../common/context';


interface AppMenuProps {
    onClickMenu: (menu: SceneName) => void
}

export default function AppMenu(props: AppMenuProps) {

    return (
        <div className='app-menu'>
            <div className='window'>
                <p>App Menu</p>
                <ul>
                    <li onClick={() => props.onClickMenu("all_works")}>すべての作品</li>
                    <li onClick={() => props.onClickMenu("tags")}>タグ管理</li>
                    <li onClick={() => props.onClickMenu("settings")}>設定</li>
                </ul>
            </div>
        </div>
    )
}
