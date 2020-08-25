import React from 'react';
import ReactDOM from 'react-dom';
import './RaspberryPacman/styles/index.scss';
import { HashRouter as Router, Switch, Route} from "react-router-dom";
import RaspberryPacman from './RaspberryPacman';

import * as serviceWorker from './serviceWorker';
import LandingPage from "./RaspberryPacman/LandingPage/LandingPage";

const props = {
    autoStart: true,
    gridSize: 17,
    animate: process.env.NODE_ENV !== 'development',
    locale: 'en',
    onEnd: () => {
        console.log('onEnd');
    }
};

const WithRouting = () => {
    return (
        <Router>
            <Switch>
                <Route exact path={"/"} component={LandingPage}/>
                <Route exact path={"/Pacman"} component={()=><RaspberryPacman {...props}/>}/>
            </Switch>
        </Router>
    )
}

function renderApp(App = RaspberryPacman) {
    ReactDOM.render(
        <React.StrictMode>
            <WithRouting/>
        </React.StrictMode>,
        document.getElementById('root')
    );
}

renderApp();

serviceWorker.register();
