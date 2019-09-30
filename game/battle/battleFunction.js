const Pokemon = require('./Pokemon');
const moves = require('../data/moves');

const damage = (yourAttack, yourLevel, yourMovePower, theirDefense, isCrit) => {
    return Math.ceil(
        (((2 * yourLevel * (1 + isCrit ? 1 : 0)) / 5) *
            yourMovePower *
            (yourAttack / theirDefense)) /
            50 +
            2
    );
};

const battle = (pokemon1, pokemon2, move1, move2, combatant1, combatant2) => {
    // check the players' choices for move types
    let script;

    let whoFirst = 0;

    if (move1.type === 'switch') {
        // player 1 switches
    }
    if (move2.type === 'switch') {
        // player 2 switches
    }

    if (move1.type === 'fight' && move2.type === 'fight') {
        // check speed
        if (pokemon1.stats.speed > pokemon2.stats.speed) {
            whoFirst = 0;
        } else if (pokemon1.stats.speed < pokemon2.stats.speed) {
            whoFirst = 1;
        } else if (pokemon1.stats.speed === pokemon2.stats.speed) {
            const roll = Math.floor(2 * Math.random());
            whoFirst = roll;
        }

        if (whoFirst) {
            script = fight(
                pokemon2,
                pokemon1,
                move2,
                move1,
                combatant2,
                combatant1
            );
        } else {
            script = fight(
                pokemon1,
                pokemon2,
                move1,
                move2,
                combatant1,
                combatant2
            );
        }
    }

    // Battle ends in a draw if both run.
    if (move1.type === 'run') {
        // outcome.combatant1Forfeit = true;
        if (tryRun(pokemon1, pokemon2)) {
            whoFirst = 0;
            script = [{
                type: 'run',
                pokemon1: pokemon1,
                pokemon2: pokemon2
            }];
        }
    }

    if (move2.type === 'run') {
        if (tryRun(pokemon2, pokemon1)) {
            whoFirst = 1;
            script = [{
                type: 'run',
                pokemon1: pokemon1,
                pokemon2: pokemon2
            }];
        }
        // outcome.combatant2Forfeit = true;
    }

    if (move1.type === 'bag') {
        // player 1 uses an item
    }
    if (move2.type === 'bag') {
        // player 2 uses an item
    }

    return { script, pokemon1, pokemon2, whoFirst };
};

// pokemon 1 is the faster of the two
function fight(pokemon1, pokemon2, move1, move2, combatant1, combatant2) {
    const script = [];
    const firstAttack = halfRound(pokemon1, pokemon2, move1);

    script.push(firstAttack);

    if (firstAttack.effect === 'FNT') {
        return script;
    }

    const secondAttack = halfRound(pokemon2, pokemon1, move2);

    script.push(secondAttack);

    return script;
}

function halfRound(attacker, defender, move) {
    // console.log(move);
    if (Math.random() > moves[move.movename.toLowerCase()].accuracy) {
        return {
            type: 'fight',
            miss: true,
            move: move.movename,
            crit: false,
            effectiveness: 0,
            effect: null
        };
    }

    // bitwise AND to round down to the nearest even number
    const critRate =
        ((attacker.getSpecies().baseStats.speed & 0xfe) * 100) / 512;

    let effect = null;
    let crit = false;

    if (Math.random() * 512 < critRate) {
        crit = true;
    }

    // TODO: determine if move is physical or special, use atk/def or spc accordingly

    // ignore stat changes on a crit
    const attackMod = crit
        ? 1
        : attacker.statChanges.attack > 0
        ? 1 + attacker.statChanges.attack * 0.5
        : 2 / (2 - attacker.statChanges.attack);

    const defenseMod = crit
        ? 1
        : defender.statChanges.defense > 0
        ? 1 + defender.statChanges.defense * 0.5
        : 2 / (2 - defender.statChanges.defense);

    console.log(attackMod, defenseMod);

    const attack = attacker.stats.attack * attackMod;
    const defense = defender.stats.defense * defenseMod;

    let dmg = damage(
        attack,
        attacker.level,
        moves[move.movename.toLowerCase()].power,
        defense,
        crit
    );

    // Determine additional effects
    const extraEffect = moves[move.movename.toLowerCase()].effect;
    if (extraEffect) {
        // check accuracy
        if (Math.random() < extraEffect.accuracy) {
            const target = extraEffect.target === 'enemy' ? defender : attacker;
            switch (extraEffect.type) {
                case 'stat change':
                    target.statChanges[extraEffect.stat] += extraEffect.value;
                    effect = extraEffect;
            }
        }
    }

    // calculate effectiveness based on move type and defender type
    let effectiveness = 1;

    dmg *= effectiveness;

    if (moves[move.movename.toLowerCase()].power) {
        defender.stats.hp -= dmg;
    }

    if (defender.stats.hp <= 0) {
        defender.status = 'FNT';
        defender.stats.hp = 0;
        effect = 'FNT';
    }

    return {
        type: 'fight',
        move: move.movename,
        crit,
        effectiveness,
        effect
    };
}

function tryRun(pokemon1, pokemon2) {
    const speedMod1 =
        pokemon1.statChanges.speed > 0
            ? 1 + pokemon1.statChanges.speed * 0.5
            : 2 / (2 - pokemon1.statChanges.speed);
    const speedMod2 =
        pokemon2.statChanges.speed > 0
            ? 1 + pokemon2.statChanges.speed * 0.5
            : 2 / (2 - pokemon2.statChanges.speed);
    const a = pokemon1.stats.speed * speedMod1;
    const b = ((pokemon2.stats.speed * speedMod2) / 4) % 256;

    const c = 1; // number of escape attempts
    const f = (a * 32) / b + 30 * c;

    // return Math.random() * 256 < f;
    return true;
}

module.exports = battle;
