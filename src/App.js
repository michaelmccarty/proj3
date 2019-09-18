import React from "react";
import Game from "./components/Game";
import OptionsWrapper from "./components/Options";
import ChatBox from "./components/Chat";
import "./App.css";
import Socket from "./components/Socket";

function App() {
  return (
    <main className="container">
      {/* <Game width={160 * 4} height={144 * 4}/> */}
      <div className="game">
        <img className="game-content" src="http://via.placeholder.com/200" alt="test" /> {/*Replace this line with the canvas*/}
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
