import React from 'react';
import Game from './components/Game';
import LoginPage from './pages/authentication/LoginPage';
import RegisterPage from './pages/authentication/RegisterPage';
import OptionsWrapper from './components/OptionsWrapper';
import ChatBox from './components/Chat';
import './App.css';
import socketIOClient from 'socket.io-client';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function Button(props) {
    return (
        <button
            id="button"
            onClick={e => {
                e.preventDefault();
                props.onClick();
            }}
        >
            Click me
        </button>
    );
}

class App extends React.Component {
    constructor() {
        super();
    }

    state = {
        onlineUsers: [],
        socket: null,
        user: null,
        messages: [],
        endpoint: 'http://localhost:3001'
    };

    componentDidMount() {
        this.initSocket();
    }

    // socket connection established, and then socket listening events defined
    initSocket() {
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);

        // bread and butter connection confirmation
        socket.on('connect', data => console.log('Connected'));

        // asks for the online users
        socket.emit('connectedUserCheck');
        // then listens for online users from server
        socket.on('connectedUserCheck', data => {
            console.log(data);
            //set state with the online users
            this.setState({ onlineUsers: data.onlineUsers });

            const { onlineUsers } = this.state;
            console.log(onlineUsers);
        });

        // allows messages to be passed back and forth from client to server
        socket.on('chat', data => {
            console.log(data);
            this.setState({ messages: [...this.state.messages, data] });
            console.log(this.state.messages);
        });

        socket.on('chat2', data => {
            console.log(data);
            // this.setState({ messages: [...this.state.messages, data]})
            // console.log(this.state.messages)
        });

        socket.on('disconnection', disconnectedUser => {
            console.log(disconnectedUser + ' disconnected');
            const index = this.state.onlineUsers.find(user => {
                console.log(user);
                console.log(user === disconnectedUser);
            });
        });

        socket.on('poke', data => {});

        // socket.on('move', data => {
        //   console.log('user is moving ', data);
        // })
        // socket.on('', data => {
        // })

        socket.on('battle/fight', data => {
            console.log(data);
        });

        socket.on('battle/bag', data => {
            console.log(data);
        });

        socket.on('battle/run', data => {
            console.log(data);
        });

        socket.on('battle/switch', data => {
            console.log(data);
        });

        // state is set once all the events are defined
        this.setState({ socket });
        console.log(socket);
    }

    setUser = user => {
        const { socket } = this.state;
        socket.emit('user_connected', user);
        // this.setState
    };

    logout = () => {
        const { socket } = this.state;
        socket.emit('logout');
        this.setState({ user: null });
    };

    //eventually we wanna do this without a button
    buttonClick() {
        const { socket } = this.state;
        socket.emit('connectedUserCheck');
        //console.log(this.state.socket);
    }

    battleFightHandler() {
        const { socket } = this.state;
        socket.emit('battle/fight');
    }
    battleSwitchHandler() {
        const { socket } = this.state;
        socket.emit('battle/switch');
    }
    battleBagHandler() {
        const { socket } = this.state;
        socket.emit('battle/bag');
    }
    battleRunHandler() {
        const { socket } = this.state;
        socket.emit('battle/run');
    }

    render() {
        const { socket, messages, onlineUsers } = this.state;
        return (
            <Router>
                <Route
                    exact
                    path="/game"
                    render={() => (
                        <main className="container">
                            {/* button is for testing some sockets */}
                            <Button
                                onClick={() => {
                                    this.battleFightHandler();
                                }}
                            />
                            <Button
                                onClick={() => {
                                    this.battleSwitchHandler();
                                }}
                            />
                            <Button
                                onClick={() => {
                                    this.battleBagHandler();
                                }}
                            />
                            <Button
                                onClick={() => {
                                    this.battleRunHandler();
                                }}
                            />
                            <div className="game">
                                <Game socket={socket} />
                            </div>
                            <div className="options">
                                <OptionsWrapper
                                    socket={socket}
                                    pressLogout={this.logout}
                                />
                            </div>
                            <div className="chat">
                                <ChatBox
                                    socket={socket}
                                    messages={messages}
                                    onlineUsers={onlineUsers}
                                />
                            </div>
                        </main>
                    )}
                />
                <Route exact path="/" component={LoginPage} />
                <Route exact path="/register" component={RegisterPage} />
            </Router>
        );
    }
}

export default App;
