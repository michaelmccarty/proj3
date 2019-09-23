class Battle {
    constructor(type, combatant1, combatant2) { // combatant 1 MUST be a trainer
        this.type = type; // used to determine what happens when a pokemon faints
        this.combatant1 = combatant1;
        this.combatant2 = combatant2;
    }

    initialize() {
        this.combatant1.send()

        this.combatant1.send(combatant2.intro());
        this.combatant2.send(combatant1.intro());


    }
}