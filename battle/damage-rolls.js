const attackPhase = (sel1, sel2) => {
    if (sel1 === "attack" && sel2 === "attack") {
        
    }
    console.log("helloworld")
}

//damage function takes in two pokemon objects
damage = (attack, defense, level) => {
    const power = 50;
    return Math.floor((((2*level/5)*(power)*(attack/defense))/50)+2)
}

damageMod = () => {}


module.exports = {damage, damageMod};