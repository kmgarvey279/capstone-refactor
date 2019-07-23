import React from 'react';
import playerNorth from '../assets/images/north.png';
import playerEast from '../assets/images/East.png';
import playerSouth from '../assets/images/South.png';
import playerWest from '../assets/images/West.png';
import enemyStand from '../assets/images/enemyplaceholder.png';
import flare from '../assets/images/flare.png';

const levels = {
  1:['0', '0', '0', '0', '0', '0', '0', 'L', '0', '0',
     'W', '0', '0', '0', '0', '0', '0', 'L', '0', '0',
     'F', '0', '0', '0', 'E', '0', '0', 'L', 'L', '0',
     'W', 'W', 'W', '0', '0', '0', '0', '0', 'L', '0',
     '0', '0', 'W', '1', '0', '1', '0', '0', 'L', 'L',
     '0', '0', 'W', '0', '0', '0', '0', '0', 'E', '0',
     '0', '0', 'W', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', 'W', 'W', 'W', 'W', 'W', 'W', '0', '0',
     '0', '0', 'E', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', '0', '0', 'W', '0', 'S'],
     /////////////////////////////////////////////////
  2:['0', 'E', '0', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', '0', '0', 'L', 'L', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', 'L', '0', '0', '0', '0',
     '0', '0', 'F', '0', '0', 'L', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', 'L', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', 'L', '0', '0', '0', '0',
     '0', '0', '0', '0', 'L', 'L', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', '0', '0', 'S', '0', '0', '0', '0', '0'],
     /////////////////////////////////////////////////
  3:['0', 'E', '0', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', '0', '0', '0', 'F', '0',
     '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', '0', 'W', 'W', 'W', 'W', 'W', 'W', 'W',
     '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', 'S', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
};

const playerSpriteList = {
  stand: {
    north: <img id="player" src={playerNorth} weight="50" height="50"/>,
    east: <img id="player" src={playerEast} weight="50" height="50"/>,
    south: <img id="player" src={playerSouth} weight="50" height="50"/>,
    west: <img id="player" src={playerWest} weight="50" height="50"/>,
  },
  walk: {
    north: <img id="player" src={playerNorth} weight="50" height="50"/>,
    east: <img id="player" src={playerEast} weight="50" height="50"/>,
    south: <img id="player" src={playerSouth} weight="50" height="50"/>,
    west: <img id="player" src={playerWest} weight="50" height="50"/>,
  },
  knockback: {
    north: <img id="player" src={playerNorth} weight="50" height="50"/>,
    east: <img id="player" src={playerEast} weight="50" height="50"/>,
    south: <img id="player" src={playerSouth} weight="50" height="50"/>,
    west: <img id="player" src={playerWest} weight="50" height="50"/>,
  },
  attack: {
    north: <img id="player" src={playerNorth} weight="50" height="50"/>,
    east: <img id="player" src={playerEast} weight="50" height="50"/>,
    south: <img id="player" src={playerSouth} weight="50" height="50"/>,
    west: <img id="player" src={playerWest} weight="50" height="50"/>,
  },
  fall: <img id="player" src={playerEast} weight="50" height="50"/>,
  victory: <img id="player" src={playerEast} weight="50" height="50"/>
};

const enemySpriteList = {
  1: {
    north: <img id="player" src={enemyStand} weight="50" height="50"/>,
    east: <img id="player" src={enemyStand} weight="50" height="50"/>,
    south: <img id="player" src={enemyStand} weight="50" height="50"/>,
    west: <img id="player" src={enemyStand} weight="50" height="50"/>
  }
}

const weaponSpriteList = {
  1: {
    vertical: <img id="player" src={flare} weight="50" height="50"/>,
    horizontal: <img id="player" src={flare} weight="50" height="50"/>,
    burst: <img id="player" src={flare} weight="70" height="70"/>,
    icon: <img id="player" src={flare} weight="70" height="70"/>
  },
  2: {
    vertical: <img id="player" src={flare} weight="50" height="50"/>,
    horizontal: <img id="player" src={flare} weight="50" height="50"/>,
    burst: <img id="player" src={flare} weight="70" height="70"/>,
    icon: <img id="player" src={flare} weight="70" height="70"/>
  },
  3: {
    vertical: <img id="player" src={flare} weight="50" height="50"/>,
    horizontal: <img id="player" src={flare} weight="50" height="50"/>,
    burst: <img id="player" src={flare} weight="70" height="70"/>,
    icon: <img id="player" src={flare} weight="70" height="70"/>
  }
}

const weapons = {
  1: {
    id: 1,
    name: 'Taser Gun',
    range: 2,
    sprites: weaponSpriteList[1]
  },
  2: {
    id: 2,
    name: 'Flamethrower',
    range: 3,
    sprites: weaponSpriteList[2]
  },
  3: {
    id: 3,
    name: 'Laser',
    range: 6,
    sprites: weaponSpriteList[3]
    }
};

const enemies = {
  1: {
    kind: 'Slime',
    sprites: enemySpriteList[1],
    health: 40,
    movePattern: 'random'
  },
  2: {
    kind: 'Robot',
    sprites: enemySpriteList[2],
    health: 60,
    movePattern: 'vertical'
  },
  3: {
    kind: 'Alien',
    sprites: enemySpriteList[3],
    health: 80,
    movePattern: 'pursue'
  }
};


export const initialState = {
  game: {
    levelId: 1,
    gameState: 'title',
    score: 0,
    weaponById: weapons,
    levelById: levels,
    enemyById: enemies
  },
  player: {
    health: 100,
    weapon: weapons[1],
    direction: 'north',
    location: null,
    sprites: playerSpriteList
  }
};
