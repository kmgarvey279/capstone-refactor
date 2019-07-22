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
// export function updateIsEnemy()
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
export function clearSprite(squareIdToUpdate) {
  return {
    type: types.NULL_SPRITE,
    squareId: squareIdToUpdate
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
    direction: newdirection,
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
export function createEnemy(newKind, newSprites, newHealth, newMovePattern, newLocation) {
  return {
    type: types.CREATE_ENEMY,
    enemyId: v4(),
    kind: newKind,
    sprites: newSprites,
    health: newHealth,
    location: newLocation,
    direction: 'south'
  }
}
