import c from './../constants';

export default (state = {}, action) => {
  let newState;
  const { playerHealth, playerWeapon, playerDirection, playerScore } = action;

  switch (action.type) {
    case c.UPDATE_HEALTH:
        return newState;
  default:
    return state;
  }
};