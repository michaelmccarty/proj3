import React from "react";
import Game from "./components/Game";
import LoginPage from "./pages/authentication/LoginPage";
import OptionsWrapper from "./components/OptionsWrapper";
import ChatBox from "./components/Chat";
import "./App.css";
import socketIOClient from "socket.io-client";
import {BrowserRouter as Router, Route } from 'react-router-dom';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      socket: false,
      response: false,
      endpoint: "http://localhost:3001"
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("connect", data => this.setState({ response: data, socket: socket }));
    console.log(socket);
  }

  buttonClick() {
    
  }

  render() {
    
    return (
      <Router>
        <Route
          exact path="/game"
          component={() => 
            <main className="container">
              <div className="game">
                <Game />
              </div>
              <div className="options">
                <OptionsWrapper />
              </div>
              <div className="chat">
                <ChatBox />
              </div>
            </main>
            
          }
        />
        <Route exact path="/" component={LoginPage} />
      </Router>
    );
  }
}





export default App;
