import React from "react";
import CurrentLevel from "./CurrentLevel";
import GameUI from "./GameUI";
import Title from "./Title";
import End from "./End";
import Game from "./Game";
import { Switch, Route, withRouter, Redirect, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';
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
  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyPress, false);
  }

  handleKeyPress(event){
    //move up
    if(event.keyCode === 38){
      this.move("north")
    //move down
    } else if(event.keyCode === 40){
      this.move("south")
    //move right
    } else if (event.keyCode === 39){
      this.move("east")
    //move left
    } else if (event.keyCode === 37){
      this.move("west")
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
    const { dispatch } = this.props;
    let squareImage;
    let squareIsYou = false;
    let squareIsEnemy = '';
    let squareIsProjectile = false;
    let sprite = null;
    //Set tile image
    if (squareValue == 'F') {
      squareImage = <img id="tile" src={stairs} weight="50" height="50" />;
    } else if (squareValue == 'L') {
      squareImage = <img id="tile" src={lava} weight="50" height="50" />;
    } else if (squareValue == 'W') {
      squareImage = <img id="tile" src={wall} weight="50" height="50" />;
    } else {
      squareImage = <img id="tile" src={empty} weight="50" height="50" />;
    }
    if (squareValue == 'S') {
      sprite = this.props.player.sprites.stand[this.props.player.direction];
      squareIsYou = true;
      dispatch(actions.updatePlayerLocation(thisSquareId));
    }
    if (parseInt(squareValue) > 0) {
      let newEnemyId = this.handleCreateNewEnemy(thisSquareId, parseInt(squareValue));
      sprite = this.props.enemies[newEnemyId].sprites['south'];
      squareIsEnemy = newEnemyId;
    }
    dispatch(actions.addSquare(thisSquareId, squareValue, squareIsYou, squareIsEnemy, squareIsProjectile, squareImage, sprite));
  }

//Handle Movement
  move(direction){
    if (this.props.game.gameState === 'active') {
      let originalLocation = this.props.player.location
      const { dispatch } = this.props;
      //update direction
      dispatch(actions.updatePlayerDirection(direction));
      let newSprite = this.props.player.sprites.walk[direction];
      dispatch(actions.updateSprite(this.props.player.location, newSprite));
      //check if move is legal, if not return original location
      let canMove = this.attemptMove(direction, originalLocation);
      let result = this.squareCheck(canMove);
      //if move is legal...
      if (result === 'moved'){
        //null previous location
        dispatch(actions.updateSprite(originalLocation, ''));
        dispatch(actions.updateIsYou(originalLocation, false));
        //update location
        this.handleUpdatePlayerLocation(canMove, direction);
      }
    }
  }

  attemptMove(direction, originalLocation) {
    let newLocation;
    if(direction == "north") {
      newLocation = originalLocation - 1;
      if(newLocation >= 0 && newLocation % 10 !== 0 && this.props.currentLevel[newLocation].value !== 'W') {
        return newLocation;
      } else {
        return originalLocation;
      }
    } else if (direction == "east") {
      newLocation = originalLocation + 10;
      if(newLocation <= 100 && this.props.currentLevel[newLocation].value !== 'W') {
        return newLocation;
      } else {
        return originalLocation;
      }
    } else if (direction == "south") {
      newLocation = originalLocation + 1;
      if(newLocation > 0 && newLocation <= 100 && originalLocation % 10 !== 0 && this.props.currentLevel[newLocation].value !== 'W') {
        return newLocation;
      } else {
        return originalLocation;
      }
    } else if (direction == "west") {
      newLocation = originalLocation - 10;
      if(newLocation >= 0 && this.props.currentLevel[newLocation].value !== 'W') {
        return newLocation;
      } else {
        return originalLocation;
      }
    }
  }

  handleUpdatePlayerLocation(location, direction) {
    const { dispatch } = this.props;
    //check props of new square
    let result = this.squareCheck(location);
    if (result == 'moved') {
      //update new square
      dispatch(actions.updateIsYou(location, true));
      let newSprite = this.props.player.sprites.stand[direction];
      dispatch(actions.updateSprite(location, newSprite));
      //update player location to match
      dispatch(actions.updatePlayerLocation(location));
    }
  }

  squareCheck(squareId) {
    let location = this.props.currentLevel[squareId];
    const { dispatch } = this.props;
    if (location.isEnemy !== '' || location.isProjectile) {
      //take damage + knockback
      alert("damage!")
      let newHealth = this.props.player.health -= 10;
      dispatch(actions.updatePlayerHealth(newHealth));
      this.knockBack();
    } else if (location.isYou && location.value == 'F') {
      let newLevel = this.props.game.levelId++
      dispatch(actions.levelIdUp(newLevel));
      this.handleUpdatePlayerLocation(id, false);
      this.generateLevelFromTemplate();
    } else {
      return 'moved';
    }
  }

  knockBack() {
    alert("knockback!")
    const { dispatch } = this.props;
    let location = this.props.player.location;
    let direction = this.props.player.direction;
    let knockBackDirection;
    let newSprite = this.props.player.sprites.knockback[direction];
    dispatch(actions.updateSprite(location, newSprite));
    if (direction == 'north') {
      knockBackDirection = 'south';
    } else if (direction == 'south') {
      knockBackDirection = 'north';
    } else if (direction == 'east') {
      knockBackDirection = 'west';
    } else {
      knockBackDirection = 'east';
    }
    let canMove = this.attemptMove(knockBackDirection, location)
    if (canMove !== location) {
      //null previous location
      dispatch(actions.updateSprite(location, ''));
      dispatch(actions.updateIsYou(location, false));
      //update location
      this.handleUpdatePlayerLocation(canMove, direction);
    } else {
      newSprite = this.props.player.sprites.stand[direction];
      dispatch(actions.updateSprite(location, newSprite));
    }
  }

  handleUpdatePlayerSprite(squareId, newSquareId, spriteId) {
    const { dispatch } = this.props;
    dispatch(actions.updateSprite(squareId, ''));
    let newSprite = this.props.player.sprites[spriteId];
    dispatch(actions.updateSprite(newSquareId, newSprite));
  }

  handleUpdateEnemySprite(squareId, newSquareId, enemyId, spriteId) {
    const { dispatch } = this.props;
    dispatch(actions.updateSprite(squareId, ''));
    let newSprite = this.props.enemies[enemyId].sprites[spriteId];
    dispatch(actions.updateSprite(newSquareId, newSprite));
  }

  handleUpdateProjectileSprite(squareId, newSquareId, spriteId) {
    const { dispatch } = this.props;
    dispatch(actions.updateSprite(squareId, ''));
    let newSprite = this.player.weapon.sprites[spriteId];
    dispatch(actions.updateSprite(newSquareId, newSprite));
  }

//Handle Enemies
  handleCreateNewEnemy(locationId, enemyListId) {
    let thisEnemy = this.props.game.enemyById[enemyListId];
    console.log(thisEnemy)
    let enemyId = v4();
    const { dispatch } = this.props;
    dispatch(actions.createEnemy(enemyId, thisEnemy.kind, thisEnemy.sprites, thisEnemy.health, location));
    return enemyId;
  }

  handleUpdatingEnemyLocation(enemyId, location, direction) {
    const { dispatch} = this.props;
    //update new square
    dispatch(actions.updateIsEnemy(location, enemyId));
    let newSprite = this.props.enemies[enemyId].sprites[direction];
    dispatch(actions.updateSprite(location, newSprite))
    console.log("squares state: " + this.props.currentLevel[location].isEnemy)
    //update enemy location property to match
    dispatch(actions.updateEnemyLocation(enemyId, location));
  }

  handleUpdatingEnemyDirection(enemyId, newDirection) {
    const { dispatch} = this.props;
    dispatch(actions.updateEnemyDirection(enemyId, newDirection));
  }

  handleUpdatingEnemyHealth(enemyId, newHealth) {
    const { dispatch} = this.props;
    dispatch(actions.updateEnemyLocation(enemyId, newHealth));
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
    if (direction == 'north') {
      location -= 1;
      target = location - (1 * range);
    } else if (direction == 'east') {
      location += 10;
      target = location + (10 * range);
    } else if (direction == 'south') {
      location += 1;
      target = location + (1 * range);
    } else if (direction == 'west') {
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
    dispatch(actions.updateIsProjectile(squareIdToUpdate, newBool));
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
  projectile: PropTypes.object,
  enemies: PropTypes.object
};

const mapStateToProps = state => {
  return {
    currentLevel: state.currentLevel,
    game: state.game,
    player: state.player,
    projectile: state.projectile,
    enemies: state.enemies
  }
};

export default withRouter(connect(mapStateToProps)(App));
