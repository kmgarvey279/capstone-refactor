import React from "react";
import CurrentLevel from "./CurrentLevel";
import GameUI from "./GameUI";
import Title from "./Title";
import End from "./End";
import Game from "./Game";
import { Switch, Route, withRouter, Redirect, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as types from './../constants/ActionTypes';

import lava from '../assets/images/lava.png';
import stairs from '../assets/images/stairs.png';
import wall from '../assets/images/wall.jpeg';
import empty from '../assets/images/tile.png';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
//Handle Input
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress, false);
  }
  
  handleKeyPress(event){
    //move up
    if(event.keyCode === 38){
      this.move("N")
    //move down
    } else if(event.keyCode === 40){
      this.move("S")
    //move right
    } else if (event.keyCode === 39){
      this.move("E")
    //move left
    } else if (event.keyCode === 37){
      this.move("W")
    //attack!
    } else if (event.keyCode === 32) {
      if(this.props.game.gameState == 'title') {
        this.startGame();
        this.props.history.push("/game");
      } else if (this.props.game.gameState == 'active') {
        this.attack();
      }
    //pause/unpause
    } else if (event.keyCode === 13) {
      if(this.props.game.gameState == 'title') {
        this.startGame();
      } else if (this.props.game.gameState == 'active' || this.props.game.gameState == 'paused') {
        this.pauseGame();
      }
    }
  }
  
//Change Level State
  startGame(){
    this.changeGameState('active')
    this.generateLevelFromTemplate();
    this.props.history.push("/game");  
  }
  
  pauseGame(){
    if (this.props.game.gameState == 'active') {
      this.changeGameState('paused');
    } else if (this.props.game.gameState == 'paused') {
      this.changeGameState('active');
    }
  }
  
  changeGameState(newState){
    const { dispatch } = this.props;
    const action = {
      type: types.CHANGE_GAMESTATE,
      gameState: newState
    };
    dispatch(action);
  }
  
//Create Levels
  generateLevelFromTemplate(){
    const { dispatch } = this.props; 
    const action = {
      type: types.NULL_LEVEL
    };
    dispatch(action);
    let levelTemplate = this.props.game.levelById[this.props.levelId];
    for(let i = 0; i < levelTemplate.length; i++){
      this.handleAddingSquareToLevel(i+1, levelTemplate[i]);
    }
  }
  
  handleAddingSquareToLevel(thisSquareId, squareValue) {
    let squareImage;
    let squareIsYou = false;
    let squareIsEnemy = false;
    //Set tile image
    if (squareValue == 'F' || squareValue == 'S') {
      squareImage = <img src={stairs} weight="50" height="50" />;
    } else if (squareValue == 'L') {
      squareImage = <img src={lava} weight="50" height="50" />;
    } else if (squareValue == 'W') {
      squareImage = <img src={wall} weight="50" height="50" />;
    } else if (squareValue == 'E') {
      squareImage = <img src={empty} weight="50" height="50" />;
      squareIsEnemy = true;
    } else {
      squareImage = <img src={empty} weight="50" height="50" />;
    }
    if (squareValue == 'S') {
      this.updatePlayerLocation(thisSquareId);
      squareIsYou = true;
    }
    const { dispatch } = this.props; 
    const action = {
      type: types.ADD_SQUARE,
      squareId: thisSquareId,
      value: squareValue,
      isYou: squareIsYou,
      isEnemy: squareIsEnemy,
      isProjectile: false, 
      image: squareImage
    };
    dispatch(action);
  }

//Handle Movement
  move(direction){
    if (this.props.game.gameState === 'active') {
      const { dispatch } = this.props;
      const action = {
        type: types.UPDATE_PLAYER_DIRECTION,
        direction: direction
      };
      dispatch(action);
      let originalLocation = this.props.player.location
      let canMove = this.attemptMove(direction, originalLocation)
      if (canMove !== originalLocation){
        this.updateSquareIsYou(originalLocation, false);
        this.updateSquareIsYou(canMove, true);
        this.updatePlayerLocation(canMove);
        this.squareCheck(canMove);
      }
    }
  }
  
  attemptMove(direction, originalLocation) {
    let newLocation; 
    if(direction == "N") {
      newLocation = originalLocation - 1;
      if(newLocation >= 0 && newLocation % 10 !== 0 && this.props.currentLevel[newLocation].value !== 'W') {
        return newLocation;
      } else {
        return originalLocation;
      }
    } else if (direction == "E") {
      newLocation = originalLocation + 10;
      if(newLocation <= 100 && this.props.currentLevel[newLocation].value !== 'W') {
        return newLocation;
      } else {
        return originalLocation;
      }
    } else if (direction == "S") {
      newLocation = originalLocation + 1;
      if(newLocation > 0 && newLocation <= 100 && originalLocation % 10 !== 0 && this.props.currentLevel[newLocation].value !== 'W') {
        return newLocation;
      } else {
        return originalLocation;
      }
    } else if (direction == "W") {
      newLocation = originalLocation - 10;
      if(newLocation >= 0 && this.props.currentLevel[newLocation].value !== 'W') {
        return newLocation;
      } else {
        return originalLocation;
      }
    }
  }
  
  updatePlayerLocation(location) {
    const { dispatch } = this.props;
    const action = {
      type: types.UPDATE_PLAYER_LOCATION,
      location: location
    };
    dispatch(action);
  }
  
  updateSquareIsYou(squareIdToUpdate, newBool) {
    const { dispatch } = this.props;
    const action = {
      type: types.UPDATE_ISYOU,
      squareId: squareIdToUpdate,
      isYou: newBool
    };
    dispatch(action);
  }
  
  squareCheck(id) {
    let location = this.props.currentLevel[id]; 
    if (location.isYou && location.isEnemy || location.isYou && location.value === 'L' || location.isYou && location.isProjectile === true) {
      const action = {
        type: types.UPDATE_PLAYER_HEALTH,
        health: this.props.player.health -= 10
      };
    } else if (location.isYou && location.value == 'F') {
      const { dispatch } = this.props;
      const action = {
        type: types.LEVELID_UP,
      };
      dispatch(action);
      this.updatePlayerLocation(id, false);
      this.generateLevelFromTemplate();
    }
  }
  
//Handle Projectiles
  attack() {
    if (this.props.game.gameState === 'active' && this.props.projectile.location === undefined) {
      this.createProjectile();
      this.projectileTimer = setInterval(() =>
        this.handleProjectile(),
        200
      );
    }
  }
  
  createProjectile() {
    let direction = this.props.player.direction;
    let location = this.props.player.location;
    let range = this.props.player.weapon.range;
    let target;
    if (direction == 'N') {
      location -= 1;
      target = location - (1 * range);
    } else if (direction == 'E') {
      location += 10;
      target = location + (10 * range);
    } else if (direction == 'S') {
      location += 1;
      target = location + (1 * range);
    } else if (direction == 'W') {
      location -= 10;
      target = location - (10 * range);
    }
    const { dispatch } = this.props; 
    const action = {
      type: types.CREATE_PROJECTILE,
      direction: direction,
      location: location,
      target: target
    };
    dispatch(action);
    this.updateSquareIsProjectile(location, true);
  }
  
  handleProjectile() {
    let location = this.props.projectile.location;
    let direction = this.props.projectile.direction;
    let newLocation = this.attemptMove(direction, location);
    if (newLocation === location || newLocation === this.props.projectile.target) {
      const { dispatch } = this.props;
      const action = {
        type: types.NULL_PROJECTILE,
      };
      dispatch(action);
      clearInterval(this.projectileTimer)
      this.updateSquareIsProjectile(location, false);
    } else {
      this.updateProjectileLocation(newLocation);
      this.updateSquareIsProjectile(location, false);
      this.updateSquareIsProjectile(newLocation, true);
    }
  }
  
  updateProjectileLocation(location) {
    const { dispatch } = this.props;
    const action = {
      type: types.UPDATE_PROJECTILE_LOCATION,
      location: location
    };
    dispatch(action);
  }
  
  updateSquareIsProjectile(squareIdToUpdate, newBool) {
    const { dispatch } = this.props;
    const action = {
      type: types.UPDATE_ISPROJECTILE,
      squareId: squareIdToUpdate,
      isProjectile: newBool
    };
    dispatch(action);
  }

  render(){
    return (
      <div>
          <Route exact path='/' render={()=><Title onStartClick={() => this.handleStartButtonClick()}/>} />
          <Route exact path='/end' render={()=><End />} />
          <Route exact path='/game' render={()=><Game
            levelId={this.props.levelId} 
            currentLevel={this.props.currentLevel}
            player={this.props.player}
            projectile={this.props.projectile}
            game={this.props.game} />} />
      </div>
    );
  }
}

App.propTypes = {
  currentLevel: PropTypes.object,
  levelId: PropTypes.number,
  game: PropTypes.object,
  player: PropTypes.object,
  projectile: PropTypes.object
};

const mapStateToProps = state => {
  return {
    currentLevel: state.currentLevel,
    levelId: state.levelId,
    game: state.game,
    player: state.player,
    projectile: state.projectile
  }
};

export default withRouter(connect(mapStateToProps)(App));