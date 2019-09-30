module.exports = {
    'heal': function(user) {
        // console.log(user);
        user.pokemon.forEach(pokemon => {
            pokemon.stats.hp = pokemon.stats.maxHp
            pokemon.status = null;
        });

    },
    'setPokecenter': function(user, pokecenterId) {
        user.lastPokeCenter = pokecenterId;
    }
}