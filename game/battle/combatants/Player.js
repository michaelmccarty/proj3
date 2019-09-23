const Combatant = require('../Combatant');
const Pokemon = require('../Pokemon');

class Player extends Combatant {
    constructor(player) {
        // takes the player object from the database
        this.trainer = player;
        this.currentPokemonIndex = 0;
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

    send(data) {
        switch (data.type) {
            case 'intro':
                // wild pokemon doesn't care
                this.trainer.socket.emit('battle intro', data);
                break;
            case 'updateOpponent':
                this.trainer.socket.emit('battle update opponent', data);
                break;
            case 'turn results':
                this.trainer.socket.emit('battle turn results', data);
        }
    }

    chooseAction() {
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
}

module.exports = Player;
