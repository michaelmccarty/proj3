import Base64 from './utils/Base64';
function b64(n) {
    return Base64.fromNumber(n);
}

let i = 0;

const STEP = b64(i++);
const DIRECTION = b64(i++);
const X = b64(i++);
const Y = b64(i++);
const TRAINER_ID = b64(i++);
const SKIN = b64(i++);
const MOVE_TYPE = b64(i++);
const TARGET = b64(i++);
const REJECTED = b64(i++);
const MAP = b64(i++);

const BONK = b64(i++);
const WALK = b64(i++);
const HOP = b64(i++);

const south = b64(i++);
const north = b64(i++);
const east = b64(i++);
const west = b64(i++);

const directions = {
    [south]: 'south',
    [north]: 'north',
    [east]: 'east',
    [west]: 'west'
}

export default {
    STEP,
    DIRECTION,
    X,
    Y,
    TRAINER_ID,
    SKIN,
    MOVE_TYPE,
    TARGET,
    REJECTED,
    MAP,
    WALK,
    BONK,
    HOP,
    south,
    north,
    east,
    west,
    directions
}