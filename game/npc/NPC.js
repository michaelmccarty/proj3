class NPC {
    constructor(dialog) {
        this.dialog = dialog;
    }

    onPoke (user)  {
        console.log(this.dialog);
        user.socket.emit('dialog', this.dialog);
    }
}

module.exports = NPC;