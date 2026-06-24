import React from 'react';
import { createRoot } from 'react-dom/client';
import GameApp from './game/GameApp';
import './standalone.css';

const mountNode = document.getElementById('bboyarena-game-standalone');

if (!mountNode) {
  throw new Error('Missing #bboyarena-game-standalone mount node.');
}

createRoot(mountNode).render(
  <React.StrictMode>
    <GameApp locale="en-US" />
  </React.StrictMode>
);
