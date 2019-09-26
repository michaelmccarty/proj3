const damage = (yourAttack, yourLevel, yourMovePower, theirDefense) => {
  yourMovePower = yourMovePower || 50;
  return Math.ceil(
    (((2 * yourLevel) / 5) * yourMovePower * (yourAttack / theirDefense)) / 50 +
      2
  );
};

const battle = (pokemon1, pokemon2, move1, move2, combatant1, combatant2) => {
  // check the players' choices for move types

  let outcome = {
    doesPokemon1Faint: false,
    doesPokemon2Faint: false,
    combatant1Forfeit: false,
    combatant2Forfeit: false,
    pokemon1damage: 0,
    pokemon2damage: 0,
    resultPkm1HP: pokemon1.stats.hp,
    resultPkm2HP: pokemon2.stats.hp
    // resultPP1: pokemon1.moves[]currentPP,
    // resultPP2: pokemon2.moves[]currentPP,
  };

  const script = [];
  let pkm1Dmg = 0;
  let pkm2Dmg = 0;

  if (move1.type === "fight" && move2.type === "fight") {
    // check speed
    if (pokemon1.stats.speed > pokemon2.stats.speed) {
      // pokemon 2 takes the damage first

      pkm1Dmg = damage(
        pokemon1.stats.attack,
        pokemon1.level,
        50,
        pokemon2.stats.defense
      );
      outcome.pokemon1damage = pkm1Dmg;
      pokemon2.stats.hp -= pkm1Dmg;
      outcome.resultPkm2HP = pokemon2.stats.hp;

      if (pokemon2.stats.hp <= 0) {
        outcome.doesPokemon2Faint = true;
        pokemon2.stats.status = "FNT";
        pokemon2.stats.hp = 0;
      }

      if (!outcome.doesPokemon2Faint) {
        pkm2Dmg = damage(
          pokemon2.stats.attack,
          pokemon2.level,
          50,
          pokemon1.stats.defense
        );
        outcome.pokemon2damage = pkm2Dmg;
        pokemon1.stats.hp -= pkm2Dmg;
        outcome.resultPkm1HP = pokemon1.stats.hp;

        if (pokemon1.stats.hp <= 0) {
          outcome.doesPokemon1Faint = true;
          pokemon1.stats.status = "FNT";
          pokemon1.stats.hp = 0;
        }
      }
    } else if (pokemon1.stats.speed < pokemon2.stats.speed) {
      pkm2Dmg = damage(
        pokemon2.stats.attack,
        pokemon2.level,
        50,
        pokemon1.stats.defense
      );
      outcome.pokemon2damage = pkm2Dmg;
      pokemon1.stats.hp -= pkm2Dmg;
      outcome.resultPkm1HP = pokemon1.stats.hp;
      if (pokemon1.stats.hp <= 0) {
        outcome.doesPokemon1Faint = true;
        pokemon1.stats.status = "FNT";
        pokemon1.stats.hp = 0;
      }

      if (!doesPokemon1Faint) {
        pkm1Dmg = damage(
          pokemon1.stats.attack,
          pokemon1.level,
          50,
          pokemon2.stats.defense
        );
        outcome.pokemon1damage = pkm1Dmg;
        pokemon2.stats.hp -= pkm1Dmg;
        outcome.resultPkm2HP = pokemon2.stats.hp;

        if (pokemon2.stats.hp <= 0) {
          outcome.doesPokemon2Faint = true;
          pokemon2.stats.status = "FNT";
          pokemon2.stats.hp = 0;
        }
      }
    } else if (pokemon1.stats.speed === pokemon2.stats.speed) {
      const roll = Math.floor(2 * Math.random());
      if (roll) {
        pkm1Dmg = damage(
          pokemon1.stats.attack,
          pokemon1.level,
          50,
          pokemon2.stats.defense
        );
        outcome.pokemon1damage = pkm1Dmg;
        pokemon2.stats.hp -= pkm1Dmg;
        outcome.resultPkm2HP = pokemon2.stats.hp;

        if (pokemon2.stats.hp <= 0) {
          outcome.doesPokemon2Faint = true;
          pokemon2.stats.status = "FNT";
          pokemon2.stats.hp = 0;
        }

        if (!outcome.doesPokemon2Faint) {
          pkm2Dmg = damage(
            pokemon2.stats.attack,
            pokemon2.level,
            50,
            pokemon1.stats.defense
          );
          outcome.pokemon2damage = pkm2Dmg;
          pokemon1.stats.hp -= pkm2Dmg;
          outcome.resultPkm1HP = pokemon1.stats.hp;

          if (pokemon1.stats.hp <= 0) {
            outcome.doesPokemon1Faint = true;
            pokemon1.stats.status = "FNT";
            pokemon1.stats.hp = 0;
          }
        }
      } else {
        pkm2Dmg = damage(
          pokemon2.stats.attack,
          pokemon2.level,
          50,
          pokemon1.stats.defense
        );
        outcome.pokemon2damage = pkm2Dmg;
        pokemon1.stats.hp -= pkm2Dmg;
        outcome.resultPkm1HP = pokemon1.stats.hp;

        if (pokemon1.stats.hp <= 0) {
          outcome.doesPokemon1Faint = true;
          pokemon1.stats.status = "FNT";
          pokemon1.stats.hp = 0;
        }

        if (!outcome.doesPokemon1Faint) {
          pkm1Dmg = damage(
            pokemon1.stats.attack,
            pokemon1.level,
            50,
            pokemon2.stats.defense
          );
          outcome.pokemon1damage = pkm1Dmg;
          pokemon2.stats.hp -= pkm1Dmg;
          outcome.resultPkm2HP = pokemon2.stats.hp;

          if (pokemon2.stats.hp <= 0) {
            outcome.doesPokemon1Faint = true;
            pokemon1.stats.status = "FNT";
            pokemon1.stats.hp = 0;
          }
        }
      }
    }
  }

  // not sure what should happen if both people run
  // ask Will
  if (move1.type === "run") {
    outcome.combatant1Forfeit = true;
  }
  if (move2.type === "run") {
    outcome.combatant2Forfeit = true;
  }

  if (move1.type === "bag") {
    // player 1 uses an item
  }
  if (move2.type === "bag") {
    // player 2 uses an item
  }

  if (move1.type === "switch") {
    // player 1 switches
  }
  if (move2.type === "switch") {
    // player 2 switches
  }

  return { outcome, script, pokemon1, pokemon2 };
};

class Pokemon {
  constructor(species, stats, evs, ivs, level, moves, nickname) {
    this.species = species;
    this.stats = stats;
    this.evs = evs;
    this.ivs = ivs;
    this.level = level;
    this.moves = moves || [{ name: "Struggle", currentPP: 10, totalPP: 10 }];
    this.nickname = nickname || species.name;
  }
}

const pokemonLearnsetArr = {
  1: {
    name: "Bulbasaur",
    baseStats: {
      hp: 45,
      attack: 49,
      defense: 49,
      special: 65,
      speed: 45
    },
    learnset: [
      {
        level: 0,
        name: "Tackle"
      },
      {
        level: 0,
        name: "Growl"
      },
      {
        level: 7,
        name: "Leech Seed"
      },
      {
        level: 13,
        name: "Vine Whip"
      },
      {
        level: 20,
        name: "Poison Powder"
      },
      {
        level: 27,
        name: "Razor Leaf"
      },
      {
        level: 34,
        name: "Growth"
      },
      {
        level: 41,
        name: "Sleep Powder"
      },
      {
        level: 48,
        name: "Solar Beam"
      }
    ]
  },
  4: {
    name: "Charmander",
    baseStats: {
      hp: 45,
      attack: 49,
      defense: 49,
      special: 65,
      speed: 45
    },
    learnset: [
      {
        level: 0,
        name: "Scratch"
      },
      {
        level: 0,
        name: "Growl"
      },
      {
        level: 9,
        name: "Ember"
      },
      {
        level: 15,
        name: "Leer"
      },
      {
        level: 22,
        name: "Rage"
      },
      {
        level: 30,
        name: "Slash"
      },
      {
        level: 38,
        name: "Flamethrower"
      },
      {
        level: 46,
        name: "Fire Spin"
      }
    ]
  },
  7: {
    name: "Squirtle",
    baseStats: {
      hp: 45,
      attack: 49,
      defense: 49,
      special: 65,
      speed: 45
    },
    learnset: [
      {
        level: 0,
        name: "Tackle"
      },
      {
        level: 0,
        name: "Tail Whip"
      },
      {
        level: 8,
        name: "Bubble"
      },
      {
        level: 15,
        name: "Water Gun"
      },
      {
        level: 22,
        name: "Bite"
      },
      {
        level: 28,
        name: "Withdraw"
      },
      {
        level: 35,
        name: "Skull Bash"
      },
      {
        level: 42,
        name: "Hydro Pump"
      }
    ]
  },
  16: {
    name: "Pidgey",
    baseStats: {
      hp: 45,
      attack: 49,
      defense: 49,
      special: 65,
      speed: 45
    },
    learnset: [
      {
        level: 0,
        name: "Gust"
      },
      {
        level: 5,
        name: "Sand-Attack"
      },
      {
        level: 12,
        name: "Quick Attack"
      },
      {
        level: 19,
        name: "Whirlwind"
      },
      {
        level: 28,
        name: "Wing Attack"
      },
      {
        level: 36,
        name: "Agility"
      },
      {
        level: 44,
        name: "Mirror Move"
      }
    ]
  },
  19: {
    name: "Rattata",
    baseStats: {
      hp: 45,
      attack: 49,
      defense: 49,
      special: 65,
      speed: 45
    },
    learnset: [
      {
        level: 0,
        name: "Tackle"
      },
      {
        level: 0,
        name: "Tail Whip"
      },
      {
        level: 7,
        name: "Quick Attack"
      },
      {
        level: 14,
        name: "Hyper Fang"
      },
      {
        level: 23,
        name: "Focus Energy"
      },
      {
        level: 34,
        name: "Super Fang"
      }
    ]
  }
};

const charmanderStats = {
  status: "NOR",
  confused: false,
  hp: 1,
  maxHp: 18,
  attack: 10,
  defense: 9,
  special: 10,
  speed: 11
};
const charmanderMoves = [
  { name: "Scratch", currentPP: 10, totalPP: 10 },
  { name: "Growl", currentPP: 10, totalPP: 10 }
];
const charmander = new Pokemon(
  pokemonLearnsetArr[4],
  charmanderStats,
  null,
  null,
  5,
  charmanderMoves,
  null
);

const bulbasaurStats = {
  status: "NOR",
  confused: false,
  hp: 19,
  maxHp: 19,
  attack: 9,
  defense: 9,
  special: 11,
  speed: 9
};
const bulbasaurMoves = [
  { name: "Tackle", currentPP: 10, totalPP: 10 },
  { name: "Growl", currentPP: 10, totalPP: 10 }
];
const bulbasaur = new Pokemon(
  pokemonLearnsetArr[1],
  bulbasaurStats,
  null,
  null,
  5,
  bulbasaurMoves,
  null
);

/* 
  type: "fight" || "switch" || "run" || "bag",
  movename: "Tackle"
*/

move1 = {
  type: "fight",
  movename: "Scratch"
};

move2 = {
  type: "fight",
  movename: "Tackle"
};

console.log(battle(charmander, bulbasaur, move1, move2));

// const apply = (A, D, damageFn) => {
//   damage = damageFn(A.stats.attack, A.level, 50, D.stats.defense);
//   return damage;
// };

module.exports = battle;