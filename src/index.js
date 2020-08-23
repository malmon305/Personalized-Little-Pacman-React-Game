import React from 'react';
import ReactDOM from 'react-dom';
import './RaspberryPacman/styles/index.scss';

import RaspberryPacman from './RaspberryPacman';

import * as serviceWorker from './serviceWorker';

const props = {
    autoStart: true,
    gridSize: 25,
    animate: process.env.NODE_ENV !== 'development',
    locale: 'en',
    onEnd: () => {
        console.log('onEnd');
    }
};

function renderApp(App = RaspberryPacman) {
    ReactDOM.render(
        <React.StrictMode>
            <App {...props}/>,
        </React.StrictMode>,
        document.getElementById('root')
    );
}

renderApp();

serviceWorker.register();
