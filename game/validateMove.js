const maps = require('./maps');

function validate(user, pendingMove, previousMove) {
    // Needs the move
    // Needs the user's last good move
    // Needs user flags and progress, probably just take the user

    // TODO: check if player is able to move.  It should be a flag on the user.  disabled when they have triggered a battle
    
    const dMove = pendingMove.stepNumber = previousMove.stepNumber 

    // Moves are consecutive
    if (dMove === 1) {
        // Normalize coordinates
        // convert pending move coords to the map of previous move
        const {x: newx, y: newy} = maps[previousMove.map].transformCoordinates(pendingMove.map, pendingMove.x, pendingMove.y);
        const [dx, dy] = [newx - previousMove, newy - previousMove];

        const collision = maps[pendingMove.map].getTile(pendingMove.x, pendingMove.y).collision;

        switch (collision) {
            case true:
                return false;
            case 'ledge':
                if (pendingMove.direction !== 'south') return false;
                break;
            case 'water':
                if (!user.flags.surfing) return false;
                break;
        }

        if (pendingMove.type !== 'hop') {
            const diff = Math.abs(dx) + Math.abs(dy);
            return diff <= 1;
        } else {
            return pendingMove.x === previousMove.x && pendingMove.y + 2 === pendingMove.y;
        }
    } else if (dMove === 2) {
        // Single interpolation
    } else {
        // Automatically reject
        return false;
    }
}

module.exports = validate;