import constants from './../constants';
const { initialState, types } = constants;

const projectileReducer = (state = {}, action) => {
  let newState;
  const { projectileId, location, direction, target } = action;

  switch (action.type) {
    case types.CREATE_PROJECTILE:
        newState = Object.assign({}, state, {
          projectileId: projectileId,
          location: location,
          direction: direction,
          target: target
        });
        return newState;
    case types.UPDATE_PROJECTILE_LOCATION:
        newProjectile = Object.assign({}, state[projectileId], {location});
        newState = Object.assign({}, state, {
          [projectileId]: newProjectile
        });
        return newState;
    case types.NULL_PROJECTILE:
      newState = Object.assign({}, state, {
        [projectileId]: {}
      });
      return newState;
    case types.NULL_ALL_PROJECTILES:
        newState = {}
        return newState;
  default:
    return state;
  }
};
