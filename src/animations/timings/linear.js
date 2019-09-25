function linear(duration) {
    let start= Date.now();
    const inverseDuration = 1 / duration;
    return function() {
        const elapsed = Date.now() - start;
        if (elapsed <= duration) {
            return (Date.now() - start) * inverseDuration;
        } else {
            return NaN;
        }
    }
}

export default linear;