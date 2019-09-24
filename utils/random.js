function random(seed, socket, offset = 0) {
    let memo = {'0': seed};
    let stepOffset = 0;
    let highest = 0;

    const generator = function(step) {
        seed = memo[step - stepOffset] || ((generator(step - 1) + offset) * 9301 + 49297) % 233280;
        memo[step - stepOffset] = seed;
        highest = step;
        return seed;
    }

    const coefficient = 256 / 233280;
    const generator256 = function(step) {
        return Math.floor(generator(step) * coefficient);
    }

    if (socket) {
        socket.on('reseed', function(data) {
            seed = data.seed || seed;
            offset = data.offset;
            memo = {'0': seed};
            stepOffset = highest;
        });
        socket.emit('seed me');
    }

    return generator256;
}

module.exports = random;