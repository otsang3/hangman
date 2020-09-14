import React from 'react';
import GameWindow from './components/GameWindow';
import Header from './components/Header';

function App() {
  return (
    <div className="app">
      <div className="main-container">
        <Header/>
        <GameWindow/>
      </div>
    </div>
  );
}

export default App;
