import React from 'react';
import Game from './components/Game';
import Chat from './components/Chat';
import './App.css';

function App() {
  return (
    <div className="App">
      <Game width={160 * 4} height={144 * 4}/>
      <Chat />
    </div>
  );
}

export default App;

