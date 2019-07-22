import React from 'react';
import PropTypes from 'prop-types';

function Title(props){
  return (
    <div>
      <h1>Title!</h1>
      <button type="button" onClick={() => {props.onStartClick();}}>Start Game</button>
    </div>
  );
}

Title.propTypes = {
  onStartClick: PropTypes.func,
}

export default Title;
