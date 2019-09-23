class Combatant {

    intro() {
        // This is what will appear when fighting
        // A wild ${something} has appeared
        // ${class} ${name} wants to battle!
        // Will be overridden by descendents.
        // Returns a string.
    }

    send() {
        // called by Battle to pass signals to the combatants
        // Will socket.emit if combatant is human.
        // Stored in state and used by the AI if not
    }
}