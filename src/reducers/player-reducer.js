import constants from './../constants';
const { initialState, types } = constants;

const playerReducer = (state = initialState.playerStats, action) => {
  let newState;
  const { newHealth, location} = action;
  
  switch (action.type) {
    case types.UPDATE_HEALTH:
        newState = Object.assign({}, state, {
          health: newHealth
        });
        return newState;
    case types.UPDATE_LOCATION:
        newState = Object.assign({}, state, {
          location: location
        });
        return newState;
  default:
    return state;
  }
};

export default playerReducer;