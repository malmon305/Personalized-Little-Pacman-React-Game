import {orderPolarity} from './movement';
import {animatePlayer} from './player';

export function animate(state, { time = Date.now() } = {}) {

    const timeSeconds = (time - state.stepTime) / 1000;

    if (state.lost) {
        return state;
    }

    return animatePlayer({...state, stepTime: time}, timeSeconds);
}

export function changeDirection(state, { direction }) {
    const orderPolarityOld = orderPolarity(state.player.direction);
    const orderPolarityNew = orderPolarity(direction);

    if (orderPolarityOld.plane === orderPolarityNew.plane) {
        return {
            ...state,
            player: {
                ...state.player,
                direction,
                nextDirection: direction
            }
        };
    }

    return {
        ...state,
        player: {
            ...state.player,
            nextDirection: direction
        }
    };
}

