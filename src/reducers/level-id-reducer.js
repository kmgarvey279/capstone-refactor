import constants from './../constants';
const { initialState, types } = constants;

const levelIdReducer = (state = initialState.levelId, action) => {
  let newState;
  switch (action.type) {
    case types.LEVELID_UP:
      newState = state + 1
      return newState;
    return state;
  default:
    return state;
  }
};

export default levelIdReducer;