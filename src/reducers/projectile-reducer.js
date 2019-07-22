import constants from './../constants';
const { initialState, types } = constants;

const projectileReducer = (state = {}, action) => {
  let newState;
  const { location, direction, target } = action;
  
  switch (action.type) {
    case types.CREATE_PROJECTILE:
        newState = Object.assign({}, state, {
          location: location,
          direction: direction,
          target: target
        });
        return newState;
    case types.UPDATE_PROJECTILE_LOCATION:
        newState = Object.assign({}, state, {
          location: location
        });
        return newState;
    case types.NULL_PROJECTILE:
        newState = {}
        return newState;
  default:
    return state;
  }
};

export default projectileReducer;