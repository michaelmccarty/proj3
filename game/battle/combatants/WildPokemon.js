const Combatant = require('../Combatant');
const Pokemon = require('../Pokemon');

class WildPokemon extends Combatant {
    constructor(species, level) {
        const ivs = {
            attack: Pokemon.generateIV(),
            defense: Pokemon.generateIV(),
            speed: Pokemon.generateIV(),
            special: Pokemon.generateIV(),
        }
        ivs.hp = Pokemon.calculateHPIV(this.ivs);

        const evs = {
            attack: 0,
            defense: 0,
            speed: 0,
            special: 0,
            hp: 0
        }

        this.pokemon = new Pokemon(species, evs, ivs, level);
    }

    nextPokemon() {
        return new Promise(resolve => resolve(this.pokemon));;
    }

    hasUsablePokemon() {
        return this.pokemon.status !== 'FNT';
    }

    send(data) {
        switch (data.type) {
            case 'intro':
                // wild pokemon doesn't care
                break;
            case 'updateOpponent':
                this.opponent = data.stats;
                break
            case 'turn results': 
                this.opponent = data.pokemon2;
                this.updatePokemon(data.pokemon1);
        }
    }

    updatePokemon(privateStats) {
        this.pokemon.stats = privateStats.stats;
        this.pokemon.status = privateStats.status;
    }

    chooseAction() {
        return new Promise(resolve => resolve(this.moves[Math.floor(Math.random() * this.moves.length)]));
    }



}

module.exports = WildPokemon;