const {damage, damageMod} = require('./damage-rolls')

const charmander = {
    name: 'charmander',
    level: 5,
    hp: 39,
    attack: 52,
    defense: 43,
    special: 50,
    speed: 65
};
const bulbasaur = {
    name: 'bulbasaur',
    level: 5,
    hp: 45,
    attack: 49,
    defense: 49,
    special: 65,
    speed: 45
};

const attackPhase = (yourPokemon, theirPokemon) => {
    let doesYourPokemonFaint = false;
    let doesTheirPokemonFaint = false;
    let yourAttackRoll, theirAttackRoll;

    yourAttackRoll = damage(
        yourPokemon.attack,
        theirPokemon.defense,
        yourPokemon.level
    );
    theirPokemon.hp -= yourAttackRoll;
    if (theirPokemon.hp <= 0) {
        doesTheirPokemonFaint = true;
    }
    theirAttackRoll = damage(
        theirPokemon.attack,
        yourPokemon.defense,
        theirPokemon.level
    );
    yourPokemon.hp -= theirAttackRoll;
    if (yourPokemon.hp <= 0) {
        doesYourPokemonFaint = true;
    }
    return ({
        yourAttackRoll,
        theirAttackRoll,
        doesYourPokemonFaint,
        doesTheirPokemonFaint,
        yourPokemon,
        theirPokemon
    });
};

attackPhase(charmander, bulbasaur);

module.exports = attackPhase;
