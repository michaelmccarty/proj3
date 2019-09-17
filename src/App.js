import React from 'react';
import Game from './components/Game'
import OptionsWrapper from './components/Options'
import ChatBox from './components/Chat'
import './App.css';

function App() {
  return (
    <main className="container">
      {/* <Game width={160 * 4} height={144 * 4}/> */}
      <div className="game">

      </div>
      <div className="options">
        <OptionsWrapper />
      </div>
      <div className="chat">
        <ChatBox />
      </div>
    </main>
  );
}

export default App;

