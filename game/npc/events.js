module.exports = {
    'heal': function(user) {
        // console.log(user);
        user.pokemon.forEach(pokemon => {
            pokemon.stats.hp = pokemon.stats.maxHp
            pokemon.status = null;
            pokemon.moves.forEach(move => move.PP = move.maxPP);
        });

    },
    'setPokecenter': function(user, pokecenterId) {
        user.lastPokeCenter = pokecenterId;
    }
}