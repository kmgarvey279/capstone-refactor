import React from 'react';
import PropTypes from 'prop-types';
import CurrentLevel from './CurrentLevel';
import GameUI from './GameUI';

function Game(props){
  
  if (props.game.gameState === 'paused') {
    return (
      <div id="game">
      <style jsx>{`
        div#game {
          text-align: center;
          background-color: black;
          filter: gray;
          -webkit-filter: grayscale(1);
          filter: grayscale(1);
        }
        `}</style>
        <div>
        <CurrentLevel currentLevel={props.currentLevel} player={props.player}/>
        </div>
        <div>
        <GameUI game={props.game} player={props.player} levelId={props.game.levelId}/>
        </div>
      </div>
    );
  } else {
    return (
      <div id="game">
      <style jsx>{`
        div#game {
          text-align: center;
          background-color: black;
        }
        `}</style>
        <div>
        <CurrentLevel player={props.player} currentLevel={props.currentLevel}/>
        </div>
        <div>
        <GameUI game={props.game} player={props.player} levelId={props.game.levelId}/>
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  currentLevel: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired
};

export default Game;
