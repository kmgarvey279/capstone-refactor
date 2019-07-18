import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Square(props){

  return (
    <div>
      <p>{props.value},{props.squareId}</p>
    </div>
  );
}

Square.propTypes = {
  value: PropTypes.string.isRequired,
  isYou: PropTypes.bool.isRequired,
  isEnemy: PropTypes.bool.isRequired,
  squareId: PropTypes.number.isRequired
};

export default connect()(Square);
