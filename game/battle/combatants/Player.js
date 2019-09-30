const Combatant = require('../Combatant');
const Pokemon = require('../Pokemon');
const pokecenters = require('../../data/pokecenters');
const events = require('../../npc/events');

class Player extends Combatant {
    constructor(player) {
        super();
        // takes the player object from the database
        this.trainer = player;
        this.currentPokemonIndex = 0;
        this.firstTurn = true;
    }

    intro() {
        return {
            type: 'intro',
            introText: `${this.trainer.name} wants to fight!`,
            isTrainer: true,
            trainerSprite: this.trainer.skin,
            trainerName: this.trainer.name,
            numPokemon: this.trainer.pokemon.length,
            species: this.species
        };
    }

    async nextPokemon() {
        if (this.firstTurn) {
            return this.trainer.pokemon[this.currentPokemonIndex];
        }
        const selectionPromise = new Promise(resolve =>
            this.trainer.socket.once('battle next pokemon', data => {
                resolve(data);
            })
        );
        this.trainer.socket.emit('battle choose next pokemon');
        const nextPokemonIndex = (await selectionPromise).index;

        return this.trainer.pokemon[nextPokemonIndex];
    }

    hasUsablePokemon() {
        return this.trainer.pokemon.find(pokemon => pokemon.status !== 'FNT');
    }

    send(type, data) {
        switch (type) {
            case 'intro':
                // wild pokemon doesn't care
                this.trainer.socket.emit('battle intro', {...data, myPokemon: this.trainer.pokemon[0]});
                console.log('emitted battle intro');
                break;
            case 'updateOpponent':
                this.trainer.socket.emit('battle update opponent', data);
                break;
            case 'turn results':
                this.trainer.socket.emit('battle turn results', data);
                break;
            case 'battle end':
                if (data.winner !== 'me') {
                    this.onLose();
                }
                this.trainer.socket.emit('battle end', data);
                break;

        }
    }

    async chooseAction() {
        const actionPromise = new Promise(resolve =>
            this.trainer.socket.once('battle action', data => {
                resolve(data);
            })
        );
        this.trainer.socket.emit('battle choose action');
        const action = await actionPromise;

        // TODO: validate if user is allowed to take the action.  don't resolve until valid
        return action;
    }

    onLose() {
        this.trainer.socket.emit('black out', pokecenters[this.trainer.lastPokeCenter]);
        this.trainer.previousMove = { ...this.trainer.previousMove, ...pokecenters[this.trainer.lastPokeCenter] }
        // console.log(this.trainer.previousMove);
        events.heal(this.trainer);
    }
}

module.exports = Player;
