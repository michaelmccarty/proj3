const species = {
    1: {
      name: "Bulbasaur",
      backSprite: {
        x: 32,
        y: 0,
      },
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
      backSprite: {
        x: 64,
        y: 0,
      },
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
      backSprite: {
        x: 96,
        y: 0,
      },
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
      x: 56,
      y: 64,
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
      x: 0,
      y: 64,
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

const getSpecies = (dexNumber) => {
    return species[dexNumber];
}
 
// console.log(getSpecies(1).name)
// console.log(getSpecies(1).learnset)
// console.log(getSpecies(1).baseStats)

module.exports = getSpecies;