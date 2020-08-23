import { WEST } from './constants';

function generateFood() {
    const genRow = (startX, posY, num) => new Array(num).fill(0)
        .map((item, index) => ([startX + index, posY]));

    const genDisparateRow = (xPoints, posY) => xPoints
        .map(posX => ([posX, posY]));

    const genContinuousRow = (ranges, posY) => ranges
        .reduce((items, [startX, num]) => ([
            ...items, ...genRow(startX, posY, num)
        ]), []);

    const genCol = (posX, startY, num) => new Array(num).fill(0)
        .map((item, index) => ([posX, startY + index]));

    return [
        ...genRow(0, 0, 26),
        ...genDisparateRow([0, 11, 14, 25], 1),
        ...genDisparateRow([0, 11, 14, 25], 2),
        ...genContinuousRow([[0, 6], [8, 4], [14, 4], [20, 6]], 3),
        ...genDisparateRow([2, 5, 8, 17, 20, 23], 4),
        ...genDisparateRow([2, 5, 8, 17, 20, 23], 5),
        ...genContinuousRow([[0, 3], [5, 7], [14, 7], [23, 3]], 6),
        ...genDisparateRow([0, 5, 11, 14, 20, 25], 7),
        ...genDisparateRow([0, 5, 11, 14, 20, 25], 8),
        ...genContinuousRow([[0, 12], [14, 12]], 9),
        ...genContinuousRow([[8], [17]], 10),
        ...genContinuousRow([[8], [17]], 11),
        ...genContinuousRow([[8, 10]], 12),
        ...genDisparateRow([8, 17], 13),
        ...genDisparateRow([8, 17], 14),
        ...genContinuousRow([[0, 5], [6, 3], [17, 3], [21, 5]], 15),
        ...genDisparateRow([8, 17], 16),
        ...genDisparateRow([8, 17], 17),
        ...genContinuousRow([[8, 10]], 18),
        ...genDisparateRow([11, 14], 19),
        ...genDisparateRow([11, 14], 20),
        ...genCol(5, 10, 11),
        ...genCol(20, 10, 11),
        ...genContinuousRow([[0, 6], [8, 4], [14, 4], [20, 6]], 21),
        ...genDisparateRow([0, 5, 8, 17, 20, 25], 22),
        ...genDisparateRow([0, 5, 8, 17, 20, 25], 23),
        ...genRow(0, 24, 26),
        ...genDisparateRow([0, 5, 11, 14, 20, 25], 25),
        ...genDisparateRow([0, 5, 11, 14, 20, 25], 26),
        ...genDisparateRow([0, 5, 11, 14, 20, 25], 27),
        ...genContinuousRow([[0, 12], [14, 12]], 28)
    ]
        .map((position, index) => ({
            key: index,
            position,
            eaten: false
        }));
}

export default function getInitialState() {
    return {
        isRunning: false,
        hasError: false,
        stepTime: Date.now(),
        score: 0,
        player: {
            position: [12.5, 6],
            direction: WEST,
            nextDirection: WEST,
            lives: 3
        },
        alertShow: false,
        lost: false,

        food: generateFood()
    };
}
