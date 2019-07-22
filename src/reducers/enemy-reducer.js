import constants from './../constants';
const { types } = constants;

const enemyReducer = {state = {}, action} => {
  let newState;
  let newEnemy;
  const { enemyId, location, kind, sprites, location, health, movePattern }

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
  default:
    return state;
  }
};

export default enemyReducer;
