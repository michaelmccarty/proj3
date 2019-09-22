import React from 'react';
import Game from './components/Game';
import LoginPage from './pages/authentication/LoginPage';
import RegisterPage from './pages/authentication/RegisterPage';
import OptionsWrapper from './components/OptionsWrapper';
import ChatBox from './components/Chat';
import './App.css';
import socketIOClient from 'socket.io-client';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TestButton from './components/TestButton';
import TestPokemon from './components/TestPokemon';

class App extends React.Component {
    // constructor() {
    //     super();
    // }

    state = {
        ready: false,
        onlineUsers: [],
        socket: null,
        user: null,
        messages: [],
        endpoint: 'http://localhost:3001',
        yourPokemon: {
            name: 'charmander',
            level: 5,
            hp: 39,
            attack: 52,
            defense: 43,
            special: 50,
            speed: 65
        },
        theirPokemon: {
            name: 'bulbasaur',
            level: 5,
            hp: 45,
            attack: 49,
            defense: 49,
            special: 65,
            speed: 45
        }
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
            // const index = this.state.onlineUsers.find(user => {
            //     console.log(user);
            //     console.log(user === disconnectedUser);
            // });
        });

        socket.on('poke', data => {});

        // socket.on('move', data => {
        //   console.log('user is moving ', data);
        // })
        // socket.on('', data => {
        // })

        socket.on('battle/fight', data => {
            const { yourPokemon, theirPokemon } = data;
            this.setState({
                yourPokemon: yourPokemon,
                theirPokemon: theirPokemon
            });
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

        socket.on('battleplayer', data => {
            console.log(data);
        });

        socket.on('askotherplayers', data => {
            console.log(data);
            socket.emit('creategameroom', data);
            if (data.room) {
                socket.emit('formalinvite', data);
            }
        });

        socket.on('assign room', room => {
            console.log('room number is:', room);
            this.setState({ room: room, ready: true });
            socket.emit('start battle', room);
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
        const { socket, yourPokemon, theirPokemon } = this.state;
        const data = {
            yourPokemon: yourPokemon,
            theirPokemon: theirPokemon
        };
        socket.emit('battle/fight', data);
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

    battleRoomOnly() {
        const { socket, room } = this.state;
        socket.emit('which room am i in', room);
    }

    render() {
        const {
            socket,
            messages,
            onlineUsers,
            ready,
            yourPokemon,
            theirPokemon
        } = this.state;
        return (
            <Router>
                <Route
                    exact
                    path="/game"
                    render={() => (
<>
                        <main className="container">
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
                        <main className="container">
                          {/* button is for testing some sockets */}
                          <TestButton
                                ready={ready}
                                text="Fight"
                                onClick={() => {
                                    this.battleFightHandler();
                                }}
                            />
                            <TestButton
                                ready={ready}
                                text="Switch"
                                onClick={() => {
                                    this.battleSwitchHandler();
                                }}
                            />
                            <TestButton
                                ready={ready}
                                text="Bag"
                                onClick={() => {
                                    this.battleBagHandler();
                                }}
                            />
                            <TestButton
                                ready={ready}
                                text="Run"
                                onClick={() => {
                                    this.battleRunHandler();
                                }}
                            />
                            <TestPokemon
                                ready={ready}
                                name={yourPokemon.name}
                                alt={yourPokemon.name}
                                src={'http://via.placeholder.com/200'}
                                hp={yourPokemon.hp}
                                attack={yourPokemon.attack}
                                defense={yourPokemon.defense}
                                special={yourPokemon.special}
                                speed={yourPokemon.speed}
                            />
                            <TestPokemon
                                ready={ready}
                                name={theirPokemon.name}
                                alt={theirPokemon.name}
                                src={'http://via.placeholder.com/200'}
                                hp={theirPokemon.hp}
                                attack={theirPokemon.attack}
                                defense={theirPokemon.defense}
                                special={theirPokemon.special}
                                speed={theirPokemon.speed}
                            />
                            <TestButton
                                ready={ready}
                                text="Send to room"
                                onClick={() => {
                                    this.battleRoomOnly();
                                }}
                            />
                        </main>
                        </>
                    )}
                />
                <Route exact path="/" component={LoginPage} />
                <Route exact path="/register" component={RegisterPage} />
            </Router>
        );
    }
}

export default App;
