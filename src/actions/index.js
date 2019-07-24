import * as types from "./../constants/ActionTypes";
import { v4 } from 'uuid';
//LEVEL
export function nullLevel() {
  return {
    type: types.NULL_LEVEL,
  };
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
// //GAME
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

// //PROJECTILE
export function createProjectile(newDirection, newLocation, newTarget) {
  return {
    type: types.CREATE_PROJECTILE,
    direction: newDirection,
    location: newLocation,
    target: newTarget
  };
}
export function updateProjectileLocation(newLocation) {
  return {
    type: types.UPDATE_PROJECTILE_LOCATION,
    location: newLocation
  };
}
export function nullProjectile() {
  return {
    type: types.NULL_PROJECTILE
  };
}
// //PLAYER
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
export function createEnemy(enemyId, newKind, newSprites, newHealth, newLocation) {
  return {
    type: types.CREATE_ENEMY,
    enemyId: enemyId,
    kind: newKind,
    sprites: newSprites,
    health: newHealth,
    location: newLocation,
    direction: 'south'
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
