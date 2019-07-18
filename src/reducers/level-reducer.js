import c from './../constants';

export default (state = {}, action) => {
  let newState;
  const { value, id } = action;

  switch (action.type) {
    case 'ADD_SQUARE':
        const { value, isYou, isEnemy, id } = action;
        let newState = Object.assign({}, state, {
          [id]: {
            value: value,
            isYou: isYou,
            isEnemy: isEnemy,
            id: id
          }
        });
        return newState;
    case 'NEXT_LEVEL':
      return action.newLevelId    
  default:
    return state;
  }
};
