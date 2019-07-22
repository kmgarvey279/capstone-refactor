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
import * as actions from './../actions';
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
    this.handleChangeGameState('active')
    this.generateLevelFromTemplate();
    this.props.history.push("/game");
  }

  pauseGame(){
    if (this.props.game.gameState == 'active') {
      this.handleChangeGameState('paused');
    } else if (this.props.game.gameState == 'paused') {
      this.handleChangeGameState('active');
    }
  }

  handleChangeGameState(newGameState){
    const { dispatch } = this.props;
    dispatch(actions.changeGameState(newGameState));
  }

//Create Levels
  generateLevelFromTemplate(){
    const { dispatch } = this.props;
    dispatch(actions.nullLevel());
    let levelTemplate = this.props.game.levelById[this.props.game.levelId];
    for(let i = 0; i < levelTemplate.length; i++){
      this.handleAddingSquareToLevel(i+1, levelTemplate[i]);
    }
  }

  handleAddingSquareToLevel(thisSquareId, squareValue) {
    let squareImage;
    let squareIsYou = false;
    let squareIsEnemy = false;
    let squareIsProjectile = false
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
      this.handleUpdatePlayerLocation(thisSquareId);
      squareIsYou = true;
    }
    const { dispatch } = this.props;
    dispatch(actions.addSquare(thisSquareId, squareValue, squareIsYou, squareIsEnemy, squareIsProjectile, squareImage));
  }

//Handle Movement
  move(direction){
    if (this.props.game.gameState === 'active') {
      const { dispatch } = this.props;
      dispatch(actions.updatePlayerDirection(direction));
      let originalLocation = this.props.player.location
      let canMove = this.attemptMove(direction, originalLocation)
      if (canMove !== originalLocation){
        this.handleUpdateSquareIsYou(originalLocation, false);
        this.handleUpdateSquareIsYou(canMove, true);
        this.handleUpdatePlayerLocation(canMove);
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

  handleUpdatePlayerLocation(location) {
    const { dispatch } = this.props;
    dispatch(actions.updatePlayerLocation(location));
  }

  handleUpdateSquareIsYou(squareIdToUpdate, newBool) {
    const { dispatch } = this.props;
    dispatch(actions.updateIsYou(squareIdToUpdate, newBool));
  }

  squareCheck(id) {
    let location = this.props.currentLevel[id];
    const { dispatch } = this.props;
    if (location.isYou && location.isEnemy || location.isYou && location.value === 'L' || location.isYou && location.isProjectile === true) {
      let newHealth = this.props.player.health -= 10;
      dispatch(actions.updatePlayerHealth(newHealth));
    } else if (location.isYou && location.value == 'F') {
      let newLevel = this.props.game.levelId++
      dispatch(actions.levelIdUp(newLevel));
      this.handleUpdatePlayerLocation(id, false);
      this.generateLevelFromTemplate();
    }
  }

//Handle Projectiles
  attack() {
    if (this.props.game.gameState === 'active' && this.props.projectile.location === undefined) {
      this.handleCreateProjectile();
      this.projectileTimer = setInterval(() =>
        this.handleProjectile(),
        200
      );
    }
  }

  handleCreateProjectile() {
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
    dispatch(actions.createProjectile(direction, location, target));
    this.handleUpdateSquareIsProjectile(location, true);
  }

  handleProjectile() {
    let location = this.props.projectile.location;
    let direction = this.props.projectile.direction;
    let newLocation = this.attemptMove(direction, location);
    if (newLocation === location || newLocation === this.props.projectile.target) {
      const { dispatch } = this.props;
      dispatch(actions.nullProjectile());
      clearInterval(this.projectileTimer)
      this.handleUpdateSquareIsProjectile(location, false);
    } else {
      this.handleUpdateProjectileLocation(newLocation);
      this.handleUpdateSquareIsProjectile(location, false);
      this.handleUpdateSquareIsProjectile(newLocation, true);
    }
  }

  handleUpdateProjectileLocation(location) {
    const { dispatch } = this.props;
    dispatch(actions.updateProjectileLocation(location));
  }

  handleUpdateSquareIsProjectile(squareIdToUpdate, newBool) {
    const { dispatch } = this.props;
    dispatch(actions.updateteIsProjectile(squareIdToUpdate, newBool));
  }

  render(){
    return (
      <div>
          <Route exact path='/' render={()=><Title onStartClick={() => this.handleStartButtonClick()}/>} />
          <Route exact path='/end' render={()=><End />} />
          <Route exact path='/game' render={()=><Game
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
  game: PropTypes.object,
  player: PropTypes.object,
  projectile: PropTypes.object
};

const mapStateToProps = state => {
  return {
    currentLevel: state.currentLevel,
    game: state.game,
    player: state.player,
    projectile: state.projectile
  }
};

export default withRouter(connect(mapStateToProps)(App));
