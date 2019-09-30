const maps = require('../maps');

function handlePoke(user, npcId) {
    const map = maps[user.map];
    // console.log(map);
    const npc = map.npcs[npcId];
    npc.onPoke(user);
}

module.exports = handlePoke;