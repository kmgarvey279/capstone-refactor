import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Square(props){

  function handleSavingSelectedSquare(squareId){
    const { dispatch } = props;
    const action = {
      type: c.SELECT_SQUARE,
      squareId: squareId
    };
    dispatch(action);
  }

  return (
    <div onClick={() => {handleSavingSelectedSquare(props.squareId);}}>
      <style jsx>{`
      `}</style>
      <h3>{props.value}</h3>
    </div>
  );
}

Square.propTypes = {
  value: PropTypes.string.isRequired,
  squareId: PropTypes.string.isRequired
};

export default connect()(Square);
