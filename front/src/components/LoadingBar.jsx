import React from 'react';
import { useGlobal } from '../contexts/GlobalContext';

const LoadingBar = () => {
    const { globalLoading } = useGlobal()
    return (
        <div className={`w-full bg-gray-200 rounded-full h-1 overflow-hidden block ${globalLoading ? 'opacity-100' : 'opacity-0'}`}>
            <div className="bg-red-300 h-9 rounded-full infinite-loading"></div>
        </div>
    );
}

export default LoadingBar;
