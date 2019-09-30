import React from 'react';
import Game from './components/Game';
import NoMatch from './pages/NoMatch';
import LoginPage from './pages/authentication/LoginPage';
import RegisterPage from './pages/authentication/RegisterPage';
import OptionsWrapper from './components/OptionsWrapper';
import ChatBox from './components/Chat';
import Battle from './components/Battle';
import GameSocket from './components/GameSocket';
import './App.css';
import socketIOClient from 'socket.io-client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import pokedex from '../src/pokedex';
import API from './utils/API';
import { UserProvider } from './context/UserContext';
import ProtectedRoute from './ProtectedRoute';

class App extends React.Component {
    state = {
        onlineUsers: [],
        socket: null,
        user: null,
        messages: [],
        // isMobile: true,
        endpoint: '/', //change to /socket when it is time
        party: [
            {
                image: 'https://www.serebii.net/pokearth/sprites/green/001.png',
                name: 'Bulbasaur'
            },
            {
                image: 'https://www.serebii.net/pokearth/sprites/green/002.png',
                name: 'Ivysaur'
            },
            {
                image: 'https://www.serebii.net/pokearth/sprites/green/003.png',
                name: 'Venusaur'
            },
            {
                image: 'https://www.serebii.net/pokearth/sprites/green/004.png',
                name: 'Charmander'
            },
            {
                image: 'https://www.serebii.net/pokearth/sprites/green/005.png',
                name: 'Charmeleon'
            },
            {
                image: 'https://www.serebii.net/pokearth/sprites/green/006.png',
                name: 'Charizard'
            }
        ],
        pokedex: pokedex
    };

    componentDidMount() {

    }

    // socket connection established, and then socket listening events defined
    initSocket = () => {
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
            this.setState({ messages: [...this.state.messages, data] }, () => {
                document
                    .querySelector('#chat-box')
                    .scrollTo(
                        0,
                        document.querySelector('#chat-box').scrollHeight
                    );
            });
        });

        socket.on('disconnection', disconnectedUser => {
            console.log(disconnectedUser + ' disconnected');
            const index = this.state.onlineUsers.find(user => {
                //eslint-disable-line
                console.log(user);
                console.log(user === disconnectedUser);
            });
        });

        // state is set once all the events are defined
        this.setState({ socket });
        console.log(socket);
    }

    setUser = user => {
        // const { socket } = this.state;
        // socket.emit('user_connected', user);
        this.setState({ user });
    };

    logout = () => {
        const { socket } = this.state;
        socket.emit('logout');
        API.logout().then(function (data) {
            window.location.href = '/';
        });
        this.setState({ user: null });
        API.logout();
        window.location.href = '/';
    };

    render() {
        const {
            socket,
            messages,
            onlineUsers,
            party,
            pokedex,
            user
        } = this.state;
        console.log('render App');
        console.log(API.isLoggedIn());
        return (
            <Router>
                <UserProvider
                    value={{
                        user,
                        setUser: this.setUser
                    }}
                >
                    <Switch>
                        <ProtectedRoute
                            path="/game"
                            render={() => (
                                <main className="container">
                                    <div className="game">
                                       
                                            <GameSocket
                                                initSocket={this.initSocket}
                                                socket={socket}
                                                isMobile={this.state.isMobile}
                                            />
                                        
                                    </div>
                                    <Route
                                        path="/game/battle"
                                        render={() => (
                                            <div className="game">
                                                <Battle socket={socket} />
                                            </div>
                                        )}
                                    />
                                    <div className="options">
                                        <OptionsWrapper
                                            socket={socket}
                                            pressLogout={this.logout}
                                            party={party}
                                            pokedex={pokedex}
                                            logout={this.logout}
                                        />
                                    </div>
                                    <div className="chat">
                                        <ChatBox
                                            socket={socket}
                                            messages={messages}
                                            onlineUsers={onlineUsers}
                                            logout={this.logout}
                                        />
                                    </div>
                                </main>
                            )}
                        />
                        <Route exact path="/" component={LoginPage} />
                        <Route
                            exact
                            path="/register"
                            component={RegisterPage}
                        />
                        <Route component={NoMatch} />
                    </Switch>
                </UserProvider>
            </Router>
        );
    }
}

export default App;
