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

// const pokemonLearnsetArr = {
//   1: {
//     name: "Bulbasaur",
//     baseStats: {
//       hp: 45,
//       attack: 49,
//       defense: 49,
//       special: 65,
//       speed: 45
//     },
//     learnset: [
//       {
//         level: 0,
//         name: "Tackle"
//       },
//       {
//         level: 0,
//         name: "Growl"
//       },
//       {
//         level: 7,
//         name: "Leech Seed"
//       },
//       {
//         level: 13,
//         name: "Vine Whip"
//       },
//       {
//         level: 20,
//         name: "Poison Powder"
//       },
//       {
//         level: 27,
//         name: "Razor Leaf"
//       },
//       {
//         level: 34,
//         name: "Growth"
//       },
//       {
//         level: 41,
//         name: "Sleep Powder"
//       },
//       {
//         level: 48,
//         name: "Solar Beam"
//       }
//     ]
//   },
//   4: {
//     name: "Charmander",
//     baseStats: {
//       hp: 45,
//       attack: 49,
//       defense: 49,
//       special: 65,
//       speed: 45
//     },
//     learnset: [
//       {
//         level: 0,
//         name: "Scratch"
//       },
//       {
//         level: 0,
//         name: "Growl"
//       },
//       {
//         level: 9,
//         name: "Ember"
//       },
//       {
//         level: 15,
//         name: "Leer"
//       },
//       {
//         level: 22,
//         name: "Rage"
//       },
//       {
//         level: 30,
//         name: "Slash"
//       },
//       {
//         level: 38,
//         name: "Flamethrower"
//       },
//       {
//         level: 46,
//         name: "Fire Spin"
//       }
//     ]
//   },
//   7: {
//     name: "Squirtle",
//     baseStats: {
//       hp: 45,
//       attack: 49,
//       defense: 49,
//       special: 65,
//       speed: 45
//     },
//     learnset: [
//       {
//         level: 0,
//         name: "Tackle"
//       },
//       {
//         level: 0,
//         name: "Tail Whip"
//       },
//       {
//         level: 8,
//         name: "Bubble"
//       },
//       {
//         level: 15,
//         name: "Water Gun"
//       },
//       {
//         level: 22,
//         name: "Bite"
//       },
//       {
//         level: 28,
//         name: "Withdraw"
//       },
//       {
//         level: 35,
//         name: "Skull Bash"
//       },
//       {
//         level: 42,
//         name: "Hydro Pump"
//       }
//     ]
//   },
//   16: {
//     name: "Pidgey",
//     baseStats: {
//       hp: 45,
//       attack: 49,
//       defense: 49,
//       special: 65,
//       speed: 45
//     },
//     learnset: [
//       {
//         level: 0,
//         name: "Gust"
//       },
//       {
//         level: 5,
//         name: "Sand-Attack"
//       },
//       {
//         level: 12,
//         name: "Quick Attack"
//       },
//       {
//         level: 19,
//         name: "Whirlwind"
//       },
//       {
//         level: 28,
//         name: "Wing Attack"
//       },
//       {
//         level: 36,
//         name: "Agility"
//       },
//       {
//         level: 44,
//         name: "Mirror Move"
//       }
//     ]
//   },
//   19: {
//     name: "Rattata",
//     baseStats: {
//       hp: 45,
//       attack: 49,
//       defense: 49,
//       special: 65,
//       speed: 45
//     },
//     learnset: [
//       {
//         level: 0,
//         name: "Tackle"
//       },
//       {
//         level: 0,
//         name: "Tail Whip"
//       },
//       {
//         level: 7,
//         name: "Quick Attack"
//       },
//       {
//         level: 14,
//         name: "Hyper Fang"
//       },
//       {
//         level: 23,
//         name: "Focus Energy"
//       },
//       {
//         level: 34,
//         name: "Super Fang"
//       }
//     ]
//   }
// };

// const charmanderStats = {
//   status: "NOR",
//   confused: false,
//   hp: 1,
//   maxHp: 18,
//   attack: 10,
//   defense: 9,
//   special: 10,
//   speed: 11
// };
// const charmanderMoves = [
//   { name: "Scratch", currentPP: 10, totalPP: 10 },
//   { name: "Growl", currentPP: 10, totalPP: 10 }
// ];
// const charmander = new Pokemon(
//   4,
//   5
// );

// const bulbasaurStats = {
//   status: "NOR",
//   confused: false,
//   hp: 19,
//   maxHp: 19,
//   attack: 9,
//   defense: 9,
//   special: 11,
//   speed: 9
// };
// const bulbasaurMoves = [
//   { name: "Tackle", currentPP: 10, totalPP: 10 },
//   { name: "Growl", currentPP: 10, totalPP: 10 }
// ];
// const bulbasaur = new Pokemon(
//   1, 5
// );

// /*
//   type: "fight" || "switch" || "run" || "bag",
//   movename: "Tackle"
// */

// move1 = {
//   type: "fight",
//   movename: "Scratch"
// };

// move2 = {
//   type: "fight",
//   movename: "Tackle"
// };

// console.log(battle(charmander, bulbasaur, move1, move2));

// const apply = (A, D, damageFn) => {
//   damage = damageFn(A.stats.attack, A.level, 50, D.stats.defense);
//   return damage;
// };

module.exports = battle;
