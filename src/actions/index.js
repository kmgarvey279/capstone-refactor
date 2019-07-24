import React from "react";
// import enemyById from "./enemyById.js"
import * as types from "./../constants/ActionTypes";
import { v4 } from 'uuid';
//tiles
import lava from '../assets/images/lava.png';
import stairs from '../assets/images/stairs.png';
import wall from '../assets/images/wall.jpeg';
import empty from '../assets/images/tile.png';
//enemies
import slimeNorth from '../assets/images/enemy/blob-back.png';
import slimeWest from '../assets/images/enemy/blob-back2.png';
import slimeEast from '../assets/images/enemy/blob.png';
import slimeSouth from '../assets/images/enemy/blob-front2.png';
//player
import playerStandNorth from '../assets/images/player/playerStandNorth.png';
import playerStandEast from '../assets/images/player/playerStandEast.png';
import playerStandSouth from '../assets/images/player/playerStandSouth.png';
import playerStandWest from '../assets/images/player/playerStandWest.png';
import playerMoveNorth from '../assets/images/player/playerWalkNorth.png';
import playerMoveEast from '../assets/images/player/playerWalkEast.png';
import playerMoveSouth from '../assets/images/player/playerWalkSouth.png';
import playerMoveWest from '../assets/images/player/playerWalkWest.png';
import playerKnockNorth from '../assets/images/player/playerStandNorth.png';
import playerKnockEast from '../assets/images/player/playerStandEast.png';
import playerKnockSouth from '../assets/images/player/playerStandSouth.png';
import playerKnockWest from '../assets/images/player/playerStandWest.png';
import playerAttackNorth from '../assets/images/player/playerAttackNorth.png';
import playerAttackEast from '../assets/images/player/playerAttackEast.png';
import playerAttackSouth from '../assets/images/player/playerAttackSouth.png';
import playerAttackWest from '../assets/images/player/playerAttackWest.png';
//weapons
import taserNorth from '../assets/images/projectiles/taser.png';
import taserEast from '../assets/images/projectiles/taser.png';
import taserSouth from '../assets/images/projectiles/taser.png';
import taserWest from '../assets/images/projectiles/taser.png';


//////////////////////////////LEVEL////////////////////////////
export function nullLevel() {
  return {
    type: types.NULL_LEVEL,
  };
}

export function buildLevel(levelId, playerDirection) {
  return function(dispatch) {
    dispatch(nullLevel());
    dispatch(nullAllEnemies());
    dispatch(nullAllProjectiles());
    dispatch(levelIdUp(levelId));
    let levelTemplate = levelById[levelId];
    for(let i = 0; i < levelTemplate.length; i++){
      let thisSquareId = i+1;
      let squareValue = levelTemplate[i];
      let squareImage;
      let squareIsYou = false;
      let squareIsEnemy = '';
      let squareIsProjectile = false;
      let sprite = null;
      //Set tile image
      if (squareValue == 'F') {
        squareImage = <img id="tile" src={stairs} weight="50" height="50" />;
      } else if (squareValue == 'L') {
        squareImage = <img id="tile" src={lava} weight="50" height="50" />;
      } else if (squareValue == 'W') {
        squareImage = <img id="tile" src={wall} weight="50" height="50" />;
      } else {
        squareImage = <img id="tile" src={empty} weight="50" height="50" />;
      }
      if (squareValue == 'S') {
        sprite = sprites.player.stand[playerDirection];
        squareIsYou = true;
        dispatch(updatePlayerLocation(thisSquareId));
      }
      if (parseInt(squareValue) > 0) {
        let newEnemyId = v4();
        squareIsEnemy = newEnemyId;
        let enemyTemplate = enemyById[parseInt(squareValue)];
        let sprite = sprites.enemies[enemyTemplate.kind + 'MoveSouth'];
        dispatch(createEnemy(newEnemyId, enemyTemplate.kind, enemyTemplate.health, thisSquareId));
      }
      dispatch(addSquare(thisSquareId, squareValue, squareIsYou, squareIsEnemy, squareIsProjectile, squareImage, sprite));
    }
  }
}

export function addSquare(newSquareId, newValue, newIsYou, newIsEnemy, newIsProjectile, newImage, newSprite) {
  return {
    type: types.ADD_SQUARE,
    squareId: newSquareId,
    value: newValue,
    isYou: newIsYou,
    isEnemy: newIsEnemy,
    isProjectile: newIsProjectile,
    tileImage: newImage,
    sprite: newSprite
  };
}
export function updateIsYou(squareId, newBool) {
  return {
    type: types.UPDATE_ISYOU,
    squareId: squareId,
    isYou: newBool
  };
}

export function updateIsEnemy(squareIdToUpdate, enemyId) {
    return {
      type: types.UPDATE_ISENEMY,
      squareId: squareIdToUpdate,
      isEnemy: enemyId
    }
}

export function updateIsProjectile(squareIdToUpdate, newBool) {
  return {
    type: types.UPDATE_ISPROJECTILE,
    squareId: squareIdToUpdate,
    isProjectile: newBool
  };
}
export function updateSprite(squareIdToUpdate, newSprite) {
  return {
    type: types.UPDATE_SPRITE,
    squareId: squareIdToUpdate,
    sprite: newSprite
  };
}

////////////////////////////////GAME////////////////////////////////////
export function changeGameState(newGameState) {
  return {
    type: types.CHANGE_GAMESTATE,
    gameState: newGameState
  };
}
export function levelIdUp(newLevelId) {
  return {
    type: types.LEVELID_UP,
    levelId: newLevelId
  };
}

///////////////////////////PROJECTILE/////////////////////////////////

export function newProjectile(id, weaponName, direction, location, target) {
  return function(dispatch) {
    //add new projectile to state
    dispatch(createProjectile(id, direction, location, target));
    //update is projectile and sprite on square
    dispatch(updateIsProjectile(location, id));
    dispatch(updateSprite(location, sprites.weapons[weaponName][direction]));
  }
}
export function destroyProjectile(projectileId, location) {
  return function(dispatch) {
    //clear projectile from state
    dispatch(nullProjectile(projectileId));
    dispatch(updateSprite(location, ''));
    dispatch(updateIsProjectile(location, ''));
  }
}
export function moveProjectile (projectileId, weaponName, currentLocation, newLocation){
  return function(dispatch) {
    dispatch(updateIsProjectile(currentLocation, ''));
    dispatch(updateSprite(currentLocation, ''));
    dispatch(updateProjectileLocation(projectileId, newLocation));
    dispatch(updateIsProjectile(newLocation, projectileId));
    dispatch(updateSprite(newLocation, sprites.weapons[weaponName][direction]))
  }
}

export function createProjectile(projectileId, newDirection, newLocation, newTarget) {
  return {
    type: types.CREATE_PROJECTILE,
    projectileId: projectileId,
    direction: newDirection,
    location: newLocation,
    target: newTarget
  };
}
export function updateProjectileLocation(projectileId, newLocation) {
  return {
    type: types.UPDATE_PROJECTILE_LOCATION,
    projectileId: projectileId,
    location: newLocation
  };
}
export function nullProjectile(projectileId) {
  return {
    type: types.NULL_PROJECTILE,
    projectileId: projectileId
  };
}

export function nullAllProjectiles() {
  return {
    type: types.NULL_ALL_PROJECTILES
  }
}

//////////////////////////////PLAYER/////////////////////////
// change player direction/sprite prior to move
export function playerAttemptMove(currentLocation, direction) {
  return function(dispatch) {
    dispatch(updatePlayerDirection(direction));
    dispatch(updateSprite(currentLocation, sprites.player.move[direction]));
  }
}
//if move is successfull...
export function playerMove(currentLocation, newLocation, direction) {
  return function(dispatch) {
    //null isYou/sprite on previous square

    dispatch(updateIsYou(currentLocation, false));
    dispatch(updateSprite(currentLocation, ''));
    //update player's location prop to new id
    dispatch(updatePlayerLocation(newLocation));
    //update isYou/sprite on new square
    dispatch(updateIsYou(newLocation, true))
    let newSprite = sprites.player.stand[direction];
    dispatch(updateSprite(newLocation, newSprite));
  }
}
export function playerTakeDamage(location, direction, newHealth) {
  dispatch(updatePlayerHealth(newHealth));
  let newSprite = sprites.player.knockback[direction];
  dispatch(updateSprite(location, newSprite));
}

export function playerKnockBack(currentLocation, newLocation, direction) {
  return function(dispatch) {
    //null isYou/sprite on previous square
    dispatch(updateIsYou(currentLocation, false));
    dispatch(updateSprite(currentLocation, ''));
    //update player's location prop to new id
    dispatch(updatePlayerLocation(newLocation));
    //update isYou/sprite on new square
    dispatch(updateIsYou(newLocation, true))
    let newSprite = sprites.player.stand[direction];
    dispatch(updateSprite(newLocation, newSprite));
  }
}

export function resetPlayerSprite(currentLocation, currentDirection) {
  return function(dispatch) {
    dispatch(updateSprite(currentLocation, sprites.player.stand[currentDirection]));
  }
}

export function updatePlayerHealth(newHealth) {
  return {
    type: types.UPDATE_PLAYER_HEALTH,
    health: newHealth
  };
}
export function updatePlayerLocation(newLocation) {
  return {
    type: types.UPDATE_PLAYER_LOCATION,
    location: newLocation
  };
}
export function updatePlayerDirection(newDirection) {
  return {
    type: types.UPDATE_PLAYER_DIRECTION,
    direction: newDirection
  };
}

//ENEMY
export function enemyAttemptMove(currentLocation, direction, kind) {
  return function(dispatch) {
    dispatch(updateEnemyDirection(direction));
    dispatch(updateSprite(currentLocation, sprites.enemies[kind].move[direction]));
  }
}

export function enemyMove(currentLocation, newLocation, direction, enemyId, kind) {
  return function(dispatch) {
    //null isEnemy/sprite on previous square
    dispatch(updateIsEnemy(currentLocation, ''));
    dispatch(updateSprite(currentLocation, ''));
    //update enemy's location prop to new id
    dispatch(updateEnemyLocation(enemyId, newLocation));
    //update isEnemy/sprite on new square
    dispatch(updateIsEnemy(newLocation, enemyId))
    let newSprite = sprites.enemies[kind].move[direction];
    dispatch(updateSprite(currentLocation, newSprite));
  }
}

export function enemyKnockBack(currentLocation, newLocation, direction, enemyId, kind) {
  return function(dispatch) {
    //null isEnemy/sprite on previous square
    dispatch(updateIsEnemy(currentLocation, ''));
    dispatch(updateSprite(currentLocation, ''));
    //update player's location prop to new id
    dispatch(updateEnemyLocation(enemyId, newLocation));
    //update isYou/sprite on new square
    dispatch(updateIsEnemy(newLocation, enemyId));
    let newSprite = sprites.enemies[kind].move[direction];
    dispatch(updateSprite(currentLocation, newSprite));
  }
}

export function resetEnemySprite() {
  return function(dispatch) {
    dispatch(updateSprite(currentLocation, sprites.enemies[kind].move[currentDirection]));
  }
}

export function updateEnemyLocation(enemyIdToUpdate, newLocation) {
  return {
    type: types.UPDATE_ENEMY_LOCATION,
    enemyId: enemyIdToUpdate,
    location: newLocation
  }
}

export function updateEnemyDirection(enemyIdToUpdate, newDirection) {
  return {
    type: types.UPDATE_ENEMY_DIRECTION,
    enemyId: enemyIdToUpdate,
    direction: newDirection
  }
}

export function updateEnemyHealth(enemyIdToUpdate, newHealth) {
  return {
    type: types.UPDATE_ENEMY_HEALTH,
    enemyId: enemyIdToUpdate,
    health: newHealth
  }
}

export function nullEnemy(enemyIdToUpdate) {
  return {
    type: types.NULL_ENEMY,
    enemyId: enemyIdToUpdate
  }
}

export function nullAllEnemies() {
  return {
    type: types.NULL_ALL_ENEMIES
  }
}

export function createEnemy(enemyId, newKind, newHealth, newLocation) {
  return {
    type: types.CREATE_ENEMY,
    enemyId: enemyId,
    kind: newKind,
    health: newHealth,
    location: newLocation,
    direction: 'south'
  }
}

////////////Sprites, etc.//////////////////////////////
const levelById = {
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

const enemyById = {
  1: {
    kind: 'Slime',
    health: 40
  },
  2: {
    kind: 'Robot',
    health: 60
  },
  3: {
    kind: 'Alien',
    health: 80
  }
};

const weapons = {
  1: {
    id: 1,
    name: 'Taser Gun',
    range: 2
  },
  2: {
    id: 2,
    name: 'Flamethrower',
    range: 3
  },
  3: {
    id: 3,
    name: 'Laser',
    range: 6
    }
};

const sprites = {
  player: {
    stand: {
      north: <img id="player" src={playerStandNorth} weight="50" height="50"/>,
      east: <img id="player" src={playerStandEast} weight="50" height="50"/>,
      south: <img id="player" src={playerStandSouth} weight="50" height="50"/>,
      west: <img id="player" src={playerStandWest} weight="50" height="50"/>,
    },
    move: {
      north: <img id="player" src={playerMoveNorth} weight="50" height="50"/>,
      east: <img id="player" src={playerMoveEast} weight="50" height="50"/>,
      south: <img id="player" src={playerMoveSouth} weight="50" height="50"/>,
      west: <img id="player" src={playerMoveWest} weight="50" height="50"/>,
    },
    knockback: {
      north: <img id="player" src={playerKnockNorth} weight="50" height="50"/>,
      east: <img id="player" src={playerKnockEast} weight="50" height="50"/>,
      south: <img id="player" src={playerKnockSouth} weight="50" height="50"/>,
      west: <img id="player" src={playerKnockWest} weight="50" height="50"/>,
    },
    attack: {
      north: <img id="player" src={playerAttackNorth} weight="50" height="50"/>,
      east: <img id="player" src={playerAttackEast} weight="50" height="50"/>,
      south: <img id="player" src={playerAttackSouth} weight="50" height="50"/>,
      west: <img id="player" src={playerAttackWest} weight="50" height="50"/>,
    }
  },
  enemies: {
    slimeMoveNorth: <img id="player" src={slimeNorth} weight="50" height="50"/>,
    slimeMoveEast: <img id="player" src={slimeEast} weight="50" height="50"/>,
    slimeMoveSouth: <img id="player" src={slimeSouth} weight="50" height="50"/>,
    slimeMoveWest: <img id="player" src={slimeWest} weight="50" height="50"/>,
  },
  weapons: {
    taser: {
      north: <img id="player" src={taserNorth} weight="50" height="50"/>,
      east: <img id="player" src={taserEast} weight="50" height="50"/>,
      south: <img id="player" src={taserSouth} weight="50" height="50"/>,
      west: <img id="player" src={taserWest} weight="50" height="50"/>,
    }
  },
  squares: {
    lava: <img id="tile" src={lava} weight="50" height="50" />,
    stairs: <img id="tile" src={stairs} weight="50" height="50" />,
    wall: <img id="tile" src={wall} weight="50" height="50" />,
    empty: <img id="tile" src={empty} weight="50" height="50" />
  }
}
