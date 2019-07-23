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
    this.enemyMove = this.enemyMove.bind(this);
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
      sprite = this.props.enemies[newEnemyId].sprites.move['south'];
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
      let knockBackDirection = this.reverseDirection(this.props.player.direction);
      this.knockBack(knockBackDirection);
      //exit level
    } else if (location.isYou && location.value == 'F') {
      let newLevel = this.props.game.levelId++
      dispatch(actions.levelIdUp(newLevel));
      this.handleUpdatePlayerLocation(id, false);
      this.generateLevelFromTemplate();
    } else {
      //move to next square
      return 'moved';
    }
  }

  reverseDirection(direction) {
    if (direction == 'north') {
      return 'south';
    } else if (direction == 'south') {
      return 'north';
    } else if (direction == 'east') {
      return 'west';
    } else {
      return 'east';
    }
  }

  knockBack(knockBackDirection) {
    const { dispatch } = this.props;
    //take damage
    let newHealth = this.props.player.health -= 10;
    dispatch(actions.updatePlayerHealth(newHealth));
    //handle knockback
    let location = this.props.player.location;
    let direction = this.props.player.direction;
    let newSprite = this.props.player.sprites.knockback[direction];
    dispatch(actions.updateSprite(location, newSprite));
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

  // handleUpdatePlayerSprite(squareId, newSquareId, spriteId) {
  //   const { dispatch } = this.props;
  //   dispatch(actions.updateSprite(squareId, ''));
  //   let newSprite = this.props.player.sprites[spriteId];
  //   dispatch(actions.updateSprite(newSquareId, newSprite));
  // }
  //
  // handleUpdateEnemySprite(squareId, newSquareId, enemyId, spriteId) {
  //   const { dispatch } = this.props;
  //   dispatch(actions.updateSprite(squareId, ''));
  //   let newSprite = this.props.enemies[enemyId].sprites[spriteId];
  //   dispatch(actions.updateSprite(newSquareId, newSprite));
  // }
  //
  // handleUpdateProjectileSprite(squareId, newSquareId, spriteId) {
  //   const { dispatch } = this.props;
  //   dispatch(actions.updateSprite(squareId, ''));
  //   let newSprite = this.player.weapon.sprites[spriteId];
  //   dispatch(actions.updateSprite(newSquareId, newSprite));
  // }

//Handle Enemies
  handleCreateNewEnemy(locationId, enemyListId) {
    let thisEnemy = this.props.game.enemyById[enemyListId];
    console.log(thisEnemy)
    let enemyId = v4();
    const { dispatch } = this.props;
    dispatch(actions.createEnemy(enemyId, thisEnemy.kind, thisEnemy.sprites, thisEnemy.health, locationId));
    let enemyTimer = setInterval(() =>
      this.enemyMove(enemyId),
      1000
    );
    return enemyId;
  }

  handleUpdatingEnemyLocation(enemyId, location, direction) {
    const { dispatch} = this.props;
    //update new square
    dispatch(actions.updateIsEnemy(location, enemyId));
    let newSprite = this.props.enemies[enemyId].sprites.move[direction];
    dispatch(actions.updateSprite(location, newSprite))
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

  enemyMove(enemyId) {
    if (this.props.game.gameState === 'active') {
      let enemy = this.props.enemies[enemyId];
      if (enemy.kind === 'Slime') {
        this.moveRandom(enemyId);
      } else if (enemy.kind === 'Robot') {
        this.moveVertical(enemyId);
      } else if (enemy.kind === 'Alien') {
        this.movePursue(enemyId);
      }
    }
  }

  moveRandom(enemyId) {
    let location = this.props.enemies[enemyId].location;
    let direction;
    //check if player is on neighboring square
    let playerNear = this.checkForPlayer(location)
    //otherwise, move at random
    if (playerNear !== false) {
      direction = playerNear;
    } else {
      let rng = Math.floor(Math.random() * 4);
      if (rng == 0) {
        direction = 'north';
      } else if (rng == 1) {
        direction = 'south';
      } else if (rng == 2) {
        direction = 'east';
      } else if (rng == 3) {
        direction = 'west'
      }
    }
    let canMove = this.attemptMove(direction, location);
    if (canMove !== location && this.props.currentLevel[canMove].isEnemy == '' && this.props.currentLevel[canMove].value !== 'L') {
      //damage player
      if (this.props.currentLevel[canMove].isYou) {
        this.knockBack(direction);
      }
      const { dispatch} = this.props;
      dispatch(actions.updateSprite(location, ''));
      dispatch(actions.updateIsEnemy(location, ''));
      this.handleUpdatingEnemyLocation(enemyId, canMove, direction);
    }
  }

  enemyKnockBack(knockBackDirection, enemyId) {
    const { dispatch } = this.props;
    //take damage
    let newHealth = this.props.enemies[enemyId].health -= 10;
    dispatch(actions.updateEnemyHealth(enemyId, newHealth));
    //handle knockback
    let location = this.props.enemies[enemyId].location;
    let direction = this.props.enemies[enemyId].direction;
    let newSprite = this.props.enemies[enemyId].sprites.knockback[direction];
    dispatch(actions.updateSprite(location, newSprite));
    let canMove = this.attemptMove(knockBackDirection, location)
    if (canMove !== location) {
      //null previous location
      dispatch(actions.updateSprite(location, ''));
      dispatch(actions.updateIsEnemy(location, ''));
      //update location
      this.handleUpdateEnemyLocation(enemyId, canMove, direction);
    } else {
      newSprite = this.props.enemies[enemyId].sprites.move[direction];
      dispatch(actions.updateSprite(location, newSprite));
    }
  }

  // moveVertical()
  //
  // movePursue()

  checkForPlayer(location) {
    //check if player is on neighboring square
    let playerLocation = this.props.player.location
    if (location - 1 === playerLocation) {
      return 'north'
    } else if (location + 10 == playerLocation) {
      return 'east';
    } else if (location + 1 == playerLocation) {
      return 'south';
    } else if (location -10 == playerLocation) {
      return 'west';
    } else {
      return false;
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
    dispatch(actions.updateIsProjectile(location, true));
    let newSprite = this.props.player.weapon.sprites[direction];
    dispatch(actions.updateSprite(location, newSprite));
  }

  handleProjectile() {
    if (this.props.game.gameState === 'active') {
      let location = this.props.projectile.location;
      let direction = this.props.projectile.direction;
      let newLocation = this.attemptMove(direction, location);
      const { dispatch } = this.props;
      //if projectile stops or reaches its max range
      let enemyCheck = this.props.currentLevel[newLocation].isEnemy;
      if (enemyCheck !=='') {
        this.enemyKnockBack(direction, enemyCheck);
      }
      if (newLocation === location || newLocation === this.props.projectile.target || enemyCheck !== '') {
        //null this projectile
        dispatch(actions.nullProjectile());
        //null projectile timer
        clearInterval(this.projectileTimer)
        //null projectile sprite on square
        dispatch(actions.updateSprite(location, ''));
        dispatch(actions.updateIsProjectile(location, false));
      } else {
        //update location property of projectile
        dispatch(actions.updateProjectileLocation(newLocation));
        //null projectile on previous square
        dispatch(actions.updateIsProjectile(location, false));
        dispatch(actions.updateSprite(location, ''));
        //update new one
        dispatch(actions.updateIsProjectile(newLocation, true));
        let newSprite = this.props.player.weapon.sprites[direction];
        dispatch(actions.updateSprite(newLocation, newSprite));
      }
    }
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
