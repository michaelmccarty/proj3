import React from 'react';
import Game from './components/Game'
import './App.css';

function App() {
  return (
    <div className="App">
      <Game width={160 * 4} height={144 * 4}/>
    </div>
  );
}

export default App;

