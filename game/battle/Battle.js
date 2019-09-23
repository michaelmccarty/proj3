class Battle {
    constructor(type, combatant1, combatant2) { // combatant 1 MUST be a trainer
        this.type = type; // used to determine what happens when a pokemon faints
        this.combatant1 = combatant1;
        this.combatant2 = combatant2;
    }

    async initialize() {
        this.combatant1.send('battle start'); // Trainer will wait to send this to the client until it gets the intro
        this.combatant2.send('battle start');

        this.combatant1.send(combatant2.intro());
        this.combatant2.send(combatant1.intro());

        let [pokemon1, pokemon2] = await Promise.all([
            combatant1.nextPokemon(),
            combatant2.nextPokemon()
        ]);


    }
}