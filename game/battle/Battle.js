const executeRound = require('./executeRound');
const EventEmitter = require('events');

class Battle extends EventEmitter {
    constructor(type, combatant1, combatant2) {
        super();
        // combatant 1 MUST be a trainer
        this.type = type; // used to determine what happens when a pokemon faints
        this.combatant1 = combatant1;
        this.combatant2 = combatant2;
    }

    async initialize() {
        // this.combatant1.send('battle start'); // Trainer will wait to send this to the client until it gets the intro
        // this.combatant2.send('battle start');

        console.log('running battle.initialize');
        this.combatant1.send('intro', this.combatant2.intro());
        this.combatant2.send('intro', this.combatant1.intro());

        const inBattle = true;

        let [pokemon1, pokemon2] = await Promise.all([
            this.combatant1.nextPokemon(),
            this.combatant2.nextPokemon()
        ]);

        // send pokemon species, name, level, %hp, and status
        this.combatant1.send('updateOpponent', pokemon2.publicStats());
        this.combatant2.send('updateOpponent', pokemon1.publicStats());

        while (inBattle) {

            let [action1, action2] = await Promise.all([
                this.combatant1.chooseAction(),
                this.combatant2.chooseAction()
            ]);

            // determine what happened during the round
            const results = executeRound(
                pokemon1,
                pokemon2,
                action1,
                action2,
                this.combatant1,
                this.combatant2
            );
            // This function can also do exp gain.

            pokemon1 = results.pokemon1;
            pokemon2 = results.pokemon2;

            const message1 = {
                type: 'turn results',
                pokemon1: pokemon1.privateStats(),
                pokemon2: pokemon2.publicStats(),
                script: results.script,
            };
            
            const message2 = {
                type: 'turn results',
                pokemon1: pokemon2.privateStats(),
                pokemon2: pokemon1.publicStats(),
                script: results.script,
            }

            this.combatant1.send('turn results', message1);
            this.combatant2.send('turn results', message2);

            // determine if either pokemon fainted
            // if so, determine if the battle is over
            // TIE needs to be determined first
            if (pokemon1.status == 'FNT') {
                if (this.combatant1.hasUsablePokemon()) {
                    pokemon1 = await this.combatant1.nextPokemon();
                    this.combatant2.send(pokemon1.publicStats());
                } else {
                    inBattle = false;
                    this.endBattle('ko');
                }
            } else if (pokemon2.status == 'FNT') {
                if (this.combatant2.hasUsablePokemon()) {
                    pokemon2 = await this.combatant2.nextPokemon();
                    this.combatant1.send(pokemon2.publicStats());
                } else {
                    inBattle = false;
                    this.endBattle('ko');
                }
            }
        }
    }

    // takes the condition ( ko, catch, run ) of the battle
    endBattle(condition) {
        // does cleanup, maybe emit an event back to the server.
    }
}

module.exports = Battle;
