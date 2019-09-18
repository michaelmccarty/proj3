import React from "react";
import Game from "./components/Game";
import OptionsWrapper from "./components/Options";
import ChatBox from "./components/Chat";
import "./App.css";
import Socket from "./components/Socket";

function App() {
  return (
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
      <Socket />
    </main>
  );
}

export default App;
