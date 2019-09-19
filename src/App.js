import React from "react";
import Game from "./components/Game";
import OptionsWrapper from "./components/OptionsWrapper";
import ChatBox from "./components/Chat";
import "./App.css";
import socketIOClient from "socket.io-client";

function Button() {
  return <button id="button">Click me</button>;
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      onlineUsers: [],
      socket: null,
      user: null,
      endpoint: "http://localhost:3001"
    };
  }

  componentWillMount() {
    this.initSocket();
  }
  // socket connection established, and then socket listening events defined
  initSocket() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);

    socket.on("connect", data => console.log("Connected", data));

    socket.on("chat", data => console.log("message received", data));

    socket.on("disconnection", disconnectedUser => {
      console.log(disconnectedUser + " disconnected");
    });

    socket.on('poke', data => {
      
    })

    socket.on('move', data => {
      console.log('user is moving ', data);
    })

    socket.on('', data => {

    })
    // state is set once all the events are defined
    this.setState({ socket });
    console.log(socket);
  }

  setUser = user => {
    const { socket } = this.state;
    socket.emit("user_connected", user);
    // this.setState
  };

  logout = () => {
    const { socket } = this.state;
    socket.emit("logout");
    this.setState({ user: null });
  };

  buttonClick() {
    this.setState({ socket: "hello world" });
    console.log(this.state.socket);
  }

  render() {
    const { socket } = this.state;
    return (
      <main className="container">
        <Button
          onClick={() => {
            this.buttonClick();
          }}
        ></Button>
        <div className="game">
          <Game socket={socket} />
        </div>
        <div className="options">
          <OptionsWrapper socket={socket} />
        </div>
        <div className="chat">
          <ChatBox socket={socket} />
        </div>
      </main>
    );
  }
}

export default App;
