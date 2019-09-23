import React from 'react';

class Battle extends React.PureComponent {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    startBattle() {
        const socket = { props };
        socket.once('battle intro', )
    }

    render() {
        return (
            <canvas
                key="battle-canvas"
                className={styles['game-screen']}
                tabIndex="0"
                width="160"
                height="144"
                ref={this.canvasRef}
            />
        );
    }
}

export default Battle;
