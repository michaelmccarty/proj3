const Combatant = require('../Combatant');
const Pokemon = require('../Pokemon');

class WildPokemon extends Combatant {
    constructor(species, level) {
        const ivs = {
            attack: Pokemon.generateIV(),
            defense: Pokemon.generateIV(),
            speed: Pokemon.generateIV(),
            special: Pokemon.generateIV()
        };
        ivs.hp = Pokemon.calculateHPIV(this.ivs);

        const evs = {
            attack: 0,
            defense: 0,
            speed: 0,
            special: 0,
            hp: 0
        };

        this.pokemon = new Pokemon(species, evs, ivs, level);
    }

    intro() {
        return {
            introText: `A wild ${this.pokemon.getSpecies().name} appeared!`,
            isTrainer: false,
            species: this.species
        };
    }

    async nextPokemon() {
        return this.pokemon;
    }

    hasUsablePokemon() {
        return this.pokemon.status !== 'FNT';
    }

    send(type, data) {
        switch (type) {
            case 'intro':
                // wild pokemon doesn't care
                break;
            case 'updateOpponent':
                this.opponent = data;
                break;
            case 'turn results':
                this.opponent = data.pokemon2;
                this.updatePokemon(data.pokemon1);
        }
    }

    updatePokemon(privateStats) {
        this.pokemon.stats = privateStats.stats;
        this.pokemon.status = privateStats.status;
    }

    async chooseAction() {
        return this.moves[Math.floor(Math.random() * this.moves.length)];
    }
}

module.exports = WildPokemon;
