const Combatant = require('../Combatant');
const Pokemon = require('../Pokemon');

class WildPokemon extends Combatant {
    constructor(species, level) {
        super();
        // const ivs = {
        //     attack: Pokemon.generateIV(),
        //     defense: Pokemon.generateIV(),
        //     speed: Pokemon.generateIV(),
        //     special: Pokemon.generateIV()
        // };
        // ivs.hp = Pokemon.calculateHPIV(ivs);

        this.pokemon = new Pokemon(species, level);
    }

    intro() {
        console.log(this.pokemon);
        return {
            introText: `A wild ${this.pokemon.getSpecies().name} appeared!`,
            isTrainer: false,
            species: this.pokemon.species,
            level: this.pokemon.level,
            debug: 'debug'
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
