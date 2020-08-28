import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { KEY_COMMANDS } from './constants';
import getInitialState from './state';
import { animate, changeDirection } from './game';
import Stage from './Stage';
import TopBar from './TopBar';
import AllFood from './Food/All';
import Monster from './Monster';
import Player from './Player';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

let $t = require('./locales/en.json');

const AppSwal = withReactContent(Swal);

function showDialogWinner() {
    const titles = $t.winner_titles;

    return Swal.fire({
        title: titles.random(),
    });
}

function showDialogLose() {
    const titles = $t.loser_titles;

    return AppSwal.fire({
        title: titles.random(),
        text: $t.gameOver,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: $t.restart_game,
        cancelButtonText: $t.cancel
    });
}

export default class RaspberryPacman extends Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
            ...getInitialState(),
            isRunning: props.autoStart
        };

        this.handleTheEnd = this.handleTheEnd.bind(this);

        this.onKey = evt => {
            // eslint-disable-next-line no-undefined
            if (KEY_COMMANDS[evt.key] !== undefined) {
                return this.changeDirection(KEY_COMMANDS[evt.key]);
            }

            return -1;
        };
    }


    componentDidMount() {

        this.timers = {
            start: null,
            animate: null
        };

        if (!this.props.autoStart && !this.state.isRunning) {
            return;
        }
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', this.onKey);

        this.timers.start = setTimeout(() => {
            this.setState({
                isRunning: true
            });

            this.setState({ stepTime: Date.now() });

            this.step();
        }, 3000);
    }

    componentWillUnmount() {

        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', this.onKey);

        clearTimeout(this.timers.start);
        clearTimeout(this.timers.animate);
    }

    step() {
        const result = animate(this.state);

        this.setState({
            ...result
        });

        clearTimeout(this.timers.animate);
        this.timers.animate = setTimeout(() => this.step(), 20);
    }

    changeDirection(direction) {
        this.setState(changeDirection(this.state, { direction }));
    }

    // eslint-disable-next-line react/no-deprecated
    componentWillReceiveProps() {
        console.log('App - componentWillReceiveProps');
    }

    handleTheEnd() {
        this.setState({
            isRunning: false
        });

        if (this.state.lost && !this.state.alertShow) {
            showDialogLose()
                .then(result => {
                    if (result.value) {
                        // Play Again
                        this.componentWillUnmount();
                        this.setState(getInitialState());
                        this.componentDidMount();
                    }
                });

        } else {
            showDialogWinner()
                .then(result => {
                    if (result.value) {
                        // Play Again
                        this.setState({
                            isRunning: true
                        });
                        this.componentWillUnmount();
                        this.setState(getInitialState());
                        this.componentDidMount();
                    }
                });
        }

        if (this.state.onEnd) {
            this.state.onEnd();
        }
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }

        const props = { gridSize: 12, ...this.props };

        const monsters = this.state.monsters.map(({ id, ...monster }) => (
            <Monster key={id} {...props} {...monster} />
        ));

        return (
            <div className="wrapper-container">
                <Stage {...props} />
                <TopBar $t={$t} score={this.state.score} lost={this.state.lost} />
                <AllFood {...props} food={this.state.food} />
                {monsters}
                <Player {...props} {...this.state.player} lost={this.state.lost} isRunning={this.state.isRunning} onEnd={this.handleTheEnd} />
            </div>
        );
    }
}

RaspberryPacman.propTypes = {
    autoStart: PropTypes.bool.isRequired,
    gridSize: PropTypes.number.isRequired,
    onEnd: PropTypes.func
};
