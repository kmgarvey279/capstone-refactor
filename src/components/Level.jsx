import React from 'react';
import PropTypes from 'prop-types';
import Square from './Square';

function Level(props){
  return (
    <div id="outer">
      <style jsx>{`
        div#outer {
          columns: 6 auto;
          column-gap: 0px;
          max-width: 900px;
          min-width: 900px;
        }
        div#inner {
          background-color: green;
          border: solid black 3px;
          width: 150px;
          max-width: 150px;
          min-width: 150px;
          height: 150px;
          max-height: 150px;
          min-width: 150px;
          display: inline-block;
        }
      `}</style>
      {Object.keys(props.level).map(function(squareId) {
        var square = props.level[squareId];
        return <div id="inner"><Square value={square.value}
          key={squareId}
          onSquareSelection={props.onSquareSelection}/>
        </div>
      })}
    </div>
  );
}

Level.propTypes = {
  level: PropTypes.object
};

export default Level;
