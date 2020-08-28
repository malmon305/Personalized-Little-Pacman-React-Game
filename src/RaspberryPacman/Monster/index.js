import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { cssPosition } from '../helpers';
import './style.scss';

function getColor(eating, color) {
    if (eating) {

        return '#06c';
    }

    return color;
}

function MonsterIcon({ ...props }) {
    const { gridSize, eating, position, color } = props;
    const radius = gridSize * 0.75;
    const monsterSize = gridSize + 10;
    const pathProps = {
        stroke: 'none',
        fill: getColor(eating, color)
    };

    const style = {
        ...cssPosition(position, gridSize),
        width: monsterSize,
        height: monsterSize,
        marginLeft: -radius,
        marginTop: -radius
    };

    return (
        <svg className="raspberrypacman-monster" style={style} viewBox="0 0 512 512">
        <path {...pathProps} d="m256 264a50.4 50.4 0 0 1 -27.757-8.45c-12.054 6.915-22.081 18.2-28.509 32.249a87.425 87.425 0 0 0 -7.734 36.201c0 41.906 28.71 76 64 76s64-34.094 64-76a87.415 87.415 0 0 0 -7.732-36.2c-6.43-14.051-16.457-25.339-28.511-32.254a50.4 50.4 0 0 1 -27.757 8.454z"/>
        <ellipse {...pathProps} cx="256" cy="200" rx="40" ry="48"/>
        <path {...pathProps} d="m380.411 342.583c-17.939-33.017-39.256-52.611-54.576-63.473.329.676.665 1.345.979 2.031a101.315 101.315 0 0 1 7.881 26.307c28.062 27.786 60.982 81.305 65.313 180.9a8 8 0 0 0 7.986 7.652c.117 0 .235 0 .354-.008a8 8 0 0 0 7.644-8.34c-2.492-57.399-14.467-106.208-35.581-145.069z"/>
        <path {...pathProps} d="m459.578 72.845a8 8 0 0 0 -10.733 3.577l-46.519 93.036-90.336 30.109c0 .145.01.288.01.433a72.41 72.41 0 0 1 -2.049 17.113l100.578-33.523a8 8 0 0 0 4.626-4.012l48-96a8 8 0 0 0 -3.577-10.733z"/>
        <path {...pathProps} d="m464 272h-84l-21.6-28.8a8 8 0 0 0 -3.871-2.79l-46.9-15.63a66.668 66.668 0 0 1 -7.4 14.4l46.871 15.62 22.5 30a8 8 0 0 0 6.4 3.2h88a8 8 0 0 0 0-16z"/>
        <path {...pathProps} d="m177.305 307.448a101.339 101.339 0 0 1 7.883-26.312c.313-.684.649-1.352.976-2.025-15.32 10.862-36.636 30.456-54.575 63.472-21.114 38.861-33.085 87.67-35.581 145.069a8 8 0 0 0 7.644 8.34c.119.006.237.008.354.008a8 8 0 0 0 7.986-7.652c4.331-99.595 37.251-153.115 65.313-180.9z"/>
        <path {...pathProps} d="m361.058 16.07a8 8 0 0 0 -8.988 6.872l-15.542 116.564-34.267 24.476a67.686 67.686 0 0 1 6.6 14.945l39.789-28.417a8 8 0 0 0 3.28-5.452l16-120a8 8 0 0 0 -6.872-8.988z"/>
        <path {...pathProps} d="m275.036 139.812a54.048 54.048 0 0 1 13.85 8.432c4.676-11.044 8.083-28.195-1.731-47.822a8 8 0 0 0 -14.31 7.156c6.317 12.634 5.279 23.77 2.191 32.234z"/>
        <path {...pathProps} d="m236.964 139.812c-3.088-8.464-4.126-19.6 2.191-32.234a8 8 0 1 0 -14.31-7.156c-9.814 19.627-6.407 36.778-1.731 47.822a54.048 54.048 0 0 1 13.85-8.432z"/>
        <path {...pathProps} d="m209.739 163.982-34.267-24.476-15.542-116.564a8 8 0 0 0 -15.86 2.116l16 120a8 8 0 0 0 3.28 5.452l39.784 28.417a67.686 67.686 0 0 1 6.605-14.945z"/>
        <path {...pathProps} d="m200 200c0-.145.009-.288.01-.433l-90.336-30.109-46.519-93.036a8 8 0 1 0 -14.31 7.156l48 96a8 8 0 0 0 4.626 4.012l100.578 33.523a72.41 72.41 0 0 1 -2.049-17.113z"/>
        <path {...pathProps} d="m204.37 224.78-46.9 15.63a8 8 0 0 0 -3.871 2.79l-21.599 28.8h-84a8 8 0 0 0 0 16h88a8 8 0 0 0 6.4-3.2l22.5-30 46.867-15.62a66.668 66.668 0 0 1 -7.397-14.4z"/>
        </svg>
    );
}

MonsterIcon.propTypes = {
    eating: PropTypes.bool.isRequired,
    gridSize: PropTypes.number.isRequired,
    position: PropTypes.array.isRequired,
    color: PropTypes.string.isRequired,
    direction: PropTypes.number.isRequired
};

export default class Monster extends Component {
    constructor(props) {
        super(props);

        this.state = {
            timerFlash: this.getTimerFlash()
        };
    }
    getTimerFlash() {
        if (this.state) {
            clearInterval(this.state.timerFlash);
        }

        if (!this.props.eatingTime) {
            return null;
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.timerFlash);
    }
    static propTypes = {
        gridSize: PropTypes.number.isRequired,
        position: PropTypes.array.isRequired,
        direction: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
        eatingTime: PropTypes.number.isRequired,
        deadTime: PropTypes.number.isRequired
    };
    render() {
        if (this.props.deadTime > 0) {
            return null;
        }

        const { eatingTime, ...props } = this.props;
        const eating = eatingTime > 0;

        return (
            <MonsterIcon eating={eating} {...props} {...this.state} />
        );
    }
}
