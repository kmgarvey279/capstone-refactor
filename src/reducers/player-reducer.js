import constants from './../constants';
const { initialState, types } = constants;

const playerReducer = (state = initialState.player, action) => {
  let newState;
  const { health, location, direction } = action;
  
  switch (action.type) {
    case types.UPDATE_PLAYER_HEALTH:
        newState = Object.assign({}, state, {
          health: health
        });
        return newState;
    case types.UPDATE_PLAYER_LOCATION:
        newState = Object.assign({}, state, {
          location: location
        });
        return newState;
    case types.UPDATE_PLAYER_DIRECTION:
        newState = Object.assign({}, state, {
          direction: direction
        });
        return newState;
    default:
        return state;
      }
    };
    
export default playerReducer;