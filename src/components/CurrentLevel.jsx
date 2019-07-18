import React from 'react';
import PropTypes from 'prop-types';
import Square from './Square';

function CurrentLevel(props){
  return (
    <div id="outer">
      <style jsx>{`
        div#outer {
          columns: 10 auto;
          column-gap: 0px;
          width: 500px;
          height: 700px;
          max-width: 500px;
          min-width: 500px;
          max-height: 700px;
          min-height: 700px;
        }
        div#inner {
          background-color: green;
          border: solid black 3px;
          width: 50px;
          max-width: 50px;
          min-width: 50px;
          height: 50px;
          max-height: 50px;
          min-width: 50px;
          display: inline-block;
        }
      `}</style>
      {Object.keys(props.currentLevel).map(function(squareId) {
        var square = props.currentLevel[squareId];
        console.log(square)
        return <div id="inner"><Square value={square.value}
            isYou={square.isYou}
            isEnemy={square.isEnemy}
            key={squareId}
            squareId={squareId}/>
        </div>;
      })}
    </div>
  );
}

CurrentLevel.propTypes = {
  currentLevel: PropTypes.object
};

export default CurrentLevel;
