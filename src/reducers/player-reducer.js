import c from './../constants';

export default (state = {}, action) => {
  let newState;
  let newPlayer;
  const { currentSquare, health, isAlive } = action;

  switch (action.type) {
    case c.UPDATE_LOCATION:
      const newPlayer = Object.assign({}, state, {health});
      newState = Object.assign({}, state, {
        [1]: {
          
        }
      })

  }
}
