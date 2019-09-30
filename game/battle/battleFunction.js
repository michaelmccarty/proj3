const Pokemon = require('./Pokemon');

const damage = (yourAttack, yourLevel, yourMovePower, theirDefense, isCrit) => {
  yourMovePower = yourMovePower || 50;
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
  }
  if (move2.type === 'run') {
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
  // bitwise and to round down to the nearest even number
  const critRate =
    ((attacker.getSpecies().baseStats.speed & 0xfe) * 100) / 512;

  let effect = null;
  let crit = false;

  if (Math.random() * 512 < critRate) {
    crit = true;
  }

  let dmg = damage(
    attacker.stats.attack,
    attacker.level,
    50,
    defender.stats.defense,
    crit
  );

  // calculate effectiveness based on move type and defender type
  let effectiveness = 1;

  dmg *= effectiveness;

  defender.stats.hp -= dmg;

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

module.exports = battle;
