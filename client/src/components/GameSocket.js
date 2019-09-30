import React from 'react';
import Game from './Game';

class GameSocket extends React.Component {
    componentDidMount() {
        this.props.initSocket()
    }

    render() {
        return this.props.socket && <Game 
            socket={this.props.socket}
            isMobile={this.props.isMobile}
        />
    }
}

export default GameSocket;