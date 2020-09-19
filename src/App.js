import express from 'express';
import path from 'path';
import React from 'react';
import GameWindow from './components/GameWindow';
import Header from './components/Header';

const app = express();
const port = process.env.PORT || 3000;

app.use('/', express.static(path.join(__dirname, 'public')))
app.listen(port, () => console.log('Listening on Port'), port)

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
