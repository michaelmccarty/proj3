class NPC {
    constructor(script) {
        if (Array.isArray(script)) {
            this.type = 'event'
            this.script = script;
        } else {
            this.type = 'textOnly'
            this.dialog = script;
        }
    }

    async onPoke(user) {
        if (this.type === 'textOnly') {
            user.socket.emit('dialog', this.dialog);
        } else {
            for (let item of this.script) {
                switch (item.type) {
                    case 'dialog':
                        const next = new Promise(resolve => {
                            user.socket.once('end dialog', resolve)
                        });
                        user.socket.emit('dialog', item.message)
                        await next;
                        break;
                    case 'event':
                        item.event(user, ...(item.args || []));
                        break;
                }
            }
            // this.events && this.events.forEach(event => event.func(user, ...(event.args || [])));
        }
    }
}

module.exports = NPC;