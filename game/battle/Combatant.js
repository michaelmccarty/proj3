class Combatant {

    intro() {
        // This is what will appear when fighting
        // A wild ${something} has appeared
        // ${class} ${name} wants to battle!
        // Will be overridden by descendents.
        // Returns an object :
        /* 
            {
                introText: string

                isTrainer: bool
                // These only exist if isTrainer is true
                trainerSprite: string
                trainerName: string
                numPokemon: string

                // if isTrainer is false
                species: number
            }
        */
    }

    nextPokemon() {
        // called by Battle
        // returns a promise of an object with the full data for the next pokemon
    }

    send() {
        // called by Battle to pass signals to the combatants
        // Will socket.emit if combatant is human.
        // Stored in state and used by the AI if not
    }
}