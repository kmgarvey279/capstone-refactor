import * as types from "./../constants/ActionTypes";
//LEVEL
export function nullLevel() {
  return {
    type: types.NULL_LEVEL,
  };
}
export function addSquare(newSquareId, newValue, newIsYou, newIsEnemy, newIsProjectile, newImage) {
  return {
    type: types.ADD_SQUARE,
    squareId: newSquareId,
    value: newValue,
    isYou: newIsYou,
    isEnemy: newIsEnemy,
    isProjectile: newIsProjectile,
    image: newImage
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
export function updateteIsProjectile(squareIdToUpdate, newBool) {
  return {
    type: types.UPDATE_ISPROJECTILE,
    squareId: squareIdToUpdate,
    isProjectile: newBool
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
