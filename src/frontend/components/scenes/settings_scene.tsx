import React, { useCallback, useMemo, useState } from 'react';

interface SettingsProps {

}

export default function SettingsScene(props: SettingsProps) {
    return (
        <div className="settings-scene">
            <footer className="app-footer">
                <p>制作 Kyoichi</p>
                <a href='https://github.com/kyoichi001/' className='App-link'>Github : https://github.com/kyoichi001/</a>
                <p>協力 笠井@eulious</p>
            </footer>
        </div>
    )
}
