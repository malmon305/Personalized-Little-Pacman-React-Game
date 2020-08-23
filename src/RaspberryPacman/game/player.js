import { PLAYER_SPEED } from '../constants';
import { getChangedVector, getNewPosition, orderPolarity } from './movement';

function getEatenFood(food, player, newPosition) {
    const { plane, polarity } = orderPolarity(player.direction);

    return food.findIndex(({ position, eaten }) => !eaten &&
        position[1 - plane] === player.position[1 - plane] &&
        polarity * position[plane] >= polarity * player.position[plane] &&
        polarity * position[plane] <= polarity * newPosition[plane]
    );
}

function getNewPlayerVector(player, time) {
    try {
        const { newPosition, movedDistance } = getNewPosition(player.position, player.direction,
            PLAYER_SPEED, time);

        if (player.nextDirection !== player.direction) {
            const changedVector = getChangedVector(player.position, newPosition,
                player.direction, player.nextDirection, movedDistance);

            if (changedVector) {
                return { position: changedVector, direction: player.nextDirection };
            }
        }

        return { position: newPosition };
    }
    catch (err) {
        return {};
    }
}

export function animatePlayer(state, time) {
    const newVector = getNewPlayerVector(state.player, time);
    const eatenFoodIndex = getEatenFood(state.food, state.player, newVector.position);
    const food = state.food.slice();
    let scoreDelta = 0;
    if (eatenFoodIndex > -1) {
        food[eatenFoodIndex].eaten = true;

        scoreDelta = 1 + (food[eatenFoodIndex] >> 0);
    }

    return {
        ...state,
        score: state.score + scoreDelta,
        player: {
            ...state.player,
            ...newVector
        },
        food
    };
}

