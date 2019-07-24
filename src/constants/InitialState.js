import React from 'react';
import playerNorth from '../assets/images/north.png';
import playerEast from '../assets/images/East.png';
import playerSouth from '../assets/images/South.png';
import playerWest from '../assets/images/West.png';
import enemyStand from '../assets/images/enemyplaceholder.png';
import flare from '../assets/images/flare.png';

// const playerSpriteList = {
//   stand: {
//     north: <img id="player" src={playerNorth} weight="50" height="50"/>,
//     east: <img id="player" src={playerEast} weight="50" height="50"/>,
//     south: <img id="player" src={playerSouth} weight="50" height="50"/>,
//     west: <img id="player" src={playerWest} weight="50" height="50"/>,
//   },
//   walk: {
//     north: <img id="player" src={playerNorth} weight="50" height="50"/>,
//     east: <img id="player" src={playerEast} weight="50" height="50"/>,
//     south: <img id="player" src={playerSouth} weight="50" height="50"/>,
//     west: <img id="player" src={playerWest} weight="50" height="50"/>,
//   },
//   knockback: {
//     north: <img id="player" src={playerNorth} weight="50" height="50"/>,
//     east: <img id="player" src={playerEast} weight="50" height="50"/>,
//     south: <img id="player" src={playerSouth} weight="50" height="50"/>,
//     west: <img id="player" src={playerWest} weight="50" height="50"/>,
//   },
//   attack: {
//     north: <img id="player" src={playerNorth} weight="50" height="50"/>,
//     east: <img id="player" src={playerEast} weight="50" height="50"/>,
//     south: <img id="player" src={playerSouth} weight="50" height="50"/>,
//     west: <img id="player" src={playerWest} weight="50" height="50"/>,
//   },
//   fall: <img id="player" src={playerEast} weight="50" height="50"/>,
//   victory: <img id="player" src={playerEast} weight="50" height="50"/>
// };
//
// const enemySpriteList = {
//   1: {
//     move: {
//       north: <img id="player" src={enemyStand} weight="50" height="50"/>,
//       east: <img id="player" src={enemyStand} weight="50" height="50"/>,
//       south: <img id="player" src={enemyStand} weight="50" height="50"/>,
//       west: <img id="player" src={enemyStand} weight="50" height="50"/>
//     },
//     knockback: {
//       north: <img id="player" src={enemyStand} weight="50" height="50"/>,
//       east: <img id="player" src={enemyStand} weight="50" height="50"/>,
//       south: <img id="player" src={enemyStand} weight="50" height="50"/>,
//       west: <img id="player" src={enemyStand} weight="50" height="50"/>
//     }
//   }
// }
//
// const weaponSpriteList = {
//   1: {
//     north: <img id="player" src={flare} weight="50" height="50"/>,
//     west: <img id="player" src={flare} weight="50" height="50"/>,
//     east: <img id="player" src={flare} weight="50" height="50"/>,
//     south: <img id="player" src={flare} weight="50" height="50"/>,
//     burst: <img id="player" src={flare} weight="70" height="70"/>,
//     icon: <img id="player" src={flare} weight="70" height="70"/>
//   },
//   2: {
//     vertical: <img id="player" src={flare} weight="50" height="50"/>,
//     horizontal: <img id="player" src={flare} weight="50" height="50"/>,
//     burst: <img id="player" src={flare} weight="70" height="70"/>,
//     icon: <img id="player" src={flare} weight="70" height="70"/>
//   },
//   3: {
//     vertical: <img id="player" src={flare} weight="50" height="50"/>,
//     horizontal: <img id="player" src={flare} weight="50" height="50"/>,
//     burst: <img id="player" src={flare} weight="70" height="70"/>,
//     icon: <img id="player" src={flare} weight="70" height="70"/>
//   }
// }

export const initialState = {
  game: {
    levelId: 1,
    gameState: 'title',
    score: 0
  },
  player: {
    health: 100,
    weapon: {
      id: 1,
      name: 'Taser Gun',
      range: 2
    },
    direction: 'north',
    location: null
  }
};
