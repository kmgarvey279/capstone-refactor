import constants from './../constants';
const { types } = constants;

const enemyReducer = (state = {}, action) => {
  let newState;
  let newEnemy;
  const { enemyId, kind, sprites, location, direction, health, movePattern } = action;

  switch (action.type) {
    case types.CREATE_ENEMY:
      newState = Object.assign({}, state, {
        [enemyId]: {
          enemyId: enemyId,
          kind: kind,
          sprites: sprites,
          location: location,
          direction: direction,
          health: health,
          movePattern: movePattern
        }
      });
      return newState;
    case types.UPDATE_ENEMY_LOCATION:
      newEnemy = Object.assign({}, state[enemyId], {location});
      newState = Object.assign({}, state, {
        [enemyId]: newEnemy
      });
      return newState;
    case types.UPDATE_ENEMY_DIRECTION:
      newEnemy = Object.assign({}, state[enemyId], {direction});
      newState = Object.assign({}, state, {
        [enemyId]: newEnemy
      });
      return newState;
    case types.UPDATE_ENEMY_HEALTH:
      newEnemy = Object.assign({}, state[enemyId], {health});
      newState = Object.assign({}, state, {
        [enemyId]: newEnemy
      });
      return newState;
    case types.NULL_ENEMY:
      newState = Object.assign({}, state, {
        [enemyId]: {}
      })
      return newState;
  default:
    return state;
  }
};

export default enemyReducer;
