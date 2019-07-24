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

//Change Level State
  startGame(){
    this.handleChangeGameState('active')
    this.generateLevelFromTemplate(1);
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
  generateLevelFromTemplate(levelId){
    const { dispatch } = this.props;
    let direction = this.props.player.direction
    dispatch(actions.buildLevel(levelId, direction));
    // Object.keys(this.props.enemies(function(enemyId) {
    //   let enemyTimer = setInterval(() =>
    //     this.enemyTurn(enemyId),
    //     1000
    //   );
    // }))
  }

//Handle Input
  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyPress, false);
  }

  handleKeyPress(event){
    const { dispatch } = this.props;
    //move up
    if(event.keyCode === 38){
      dispatch(actions.playerAttemptMove(this.props.player.location, "north"));
      let canMove = this.moveCheck('north', this.props.player.location);
      if(canMove === !false) {
        dispatch(actions.playerMove(this.props.player.location, canMove, "north"));
        this.squareCheck();
      }
    //move down
    } else if(event.keyCode === 40){
      dispatch(actions.playerAttemptMove(this.props.player.location, "south"));
      let canMove = this.moveCheck('south', this.props.player.location);
      if(canMove !== false) {
        dispatch(actions.playerMove(this.props.player.location, canMove, "south"));
        this.squareCheck();
      }
    //move right
    } else if (event.keyCode === 39){
      dispatch(actions.playerAttemptMove(this.props.player.location, "east"));
      let canMove = this.moveCheck('east', this.props.player.location);
      if(canMove !== false) {
        dispatch(actions.playerMove(this.props.player.location, canMove, "east"));
        this.squareCheck();
      }
    //move left
    } else if (event.keyCode === 37){
      dispatch(actions.playerAttemptMove(this.props.player.location, "west"));
      let canMove = this.moveCheck('west', this.props.player.location);
      if(canMove !== false) {
        dispatch(actions.playerMove(this.props.player.location, canMove, "west"));
        this.squareCheck();
      }
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
  //recalculate location if player knocked back
  knockBack(knockBackDirection) {
    const { dispatch } = this.props;
    dispatch(actions.playerTakeDamage(currentLocation, this.props.player.direction, this.props.player.health - 10));
    let canMove = this.moveCheck(knockBackDirection, currentLocation);
    if(canMove !== false) {
      dispatch(actions.playerKnockBack(currentLocation, canMove, this.props.player.direction));
      this.squareCheck();
    } else {
      dispatch(actions.resetPlayerSprite(currentLocation, currentDirection));
    }
  }

  //check if move is possible
  moveCheck(direction, originalLocation) {
    const { dispatch } = this.props;
    let newLocationId;
    let newLocation;
    if(direction == "north") {
      newLocationId = originalLocation - 1;
      newLocation = this.props.currentLevel[newLocationId];
      if(newLocationId >= 0 && newLocation.value !== 'W') {
        return newLocationId;
      } else if (newLocation.isEnemy !== '' || newLocation.isProjectile || newLocation.value === 'L') {
        let knockBackDirection = this.reverseDirection(direction);
        dispatch(actions.knockBack(originalLocation, knockBackDirection));
        return false;
      } else {
        return false;
      }
    } else if (direction == "east") {
      newLocationId = originalLocation + 10;
      newLocation = this.props.currentLevel[newLocationId];
      if(newLocationId <= 100 && newLocation.value !== 'W') {
        return newLocationId;
      } else if (newLocation.isEnemy !== '' || newLocation.isProjectile || newLocation.value === 'L') {
        let knockBackDirection = this.reverseDirection(direction);
        dispatch(actions.knockBack(originalLocation, knockBackDirection));
        return false;
      } else {
        return false;
      }
    } else if (direction == "south") {
      newLocationId = originalLocation + 1;
      newLocation = this.props.currentLevel[newLocationId];
      if(newLocationId > 0 && newLocationId <= 100 && originalLocation % 10 !== 0 && newLocation.value !== 'W') {
        return newLocationId;
      } else if (newLocation.isEnemy !== '' || newLocation.isProjectile || newLocation.value === 'L') {
        let knockBackDirection = this.reverseDirection(direction);
        dispatch(actions.knockBack(originalLocation, knockBackDirection));
        return false;
      } else {
        return false;
      }
    } else if (direction == "west") {
      newLocationId = originalLocation - 10;
      newLocation = this.props.currentLevel[newLocationId];
      if(newLocationId >= 0 && newLocation.value !== 'W') {
        return newLocationId;
      } else if (newLocation.isEnemy !== '' || newLocation.isProjectile || newLocation.value === 'L') {
        let knockBackDirection = this.reverseDirection(direction);
        dispatch(actions.knockBack(originalLocation, knockBackDirection));
        return false;
      } else {
        return false;
      }
    }
  }
  //check for tile effects
  squareCheck() {
    const { dispatch } = this.props;
    let square = this.props.currentLevel[this.props.player.location];
    if (square.value === 'E') {
      alert("you win!");
      this.generateLevelFromTemplate(this.props.game.levelId + 1);
    }
  }
  //reverse direction for knockback effects
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

//Handle Enemies

  handleUpdateEnemyLocation(enemyId, location, direction) {
    const { dispatch} = this.props;
    //update new square
    dispatch(actions.updateIsEnemy(location, enemyId));
    let newSprite = this.props.enemies[enemyId].sprites.move[direction];
    dispatch(actions.updateSprite(location, newSprite))
    //update enemy location property to match
    dispatch(actions.updateEnemyLocation(enemyId, location));
  }

  handleUpdateEnemyDirection(enemyId, newDirection) {
    const { dispatch} = this.props;
    dispatch(actions.updateEnemyDirection(enemyId, newDirection));
  }

  handleUpdateEnemyHealth(enemyId, newHealth) {
    const { dispatch} = this.props;
    dispatch(actions.updateEnemyLocation(enemyId, newHealth));
  }

  enemyTurn(enemyId) {
    const { dispatch} = this.props;
    if (this.props.game.gameState === 'active') {
      let enemy = this.props.enemies[enemyId];
      if (enemy.kind === 'Slime') {
        this.moveRandom(enemyId);
      } else if (enemy.kind === 'Robot') {
        // this.moveVertical(enemyId);
      } else if (enemy.kind === 'Alien') {
        // this.movePursue(enemyId);
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
    dispatch(actions.enemyAttemptMove(currentLocation, direction, this.props.enemies[enemyId].kind));
    let canMove = this.moveCheck(direction, currentLocation);
    if(canMove !== false) {
      dispatch(actions.enemyMove(currentLocation, canMove, direction, enemyId, this.props.enemies[enemyId].kind));
    }
  }

  enemyKnockBack(enemyId, knockBackDirection) {
    const { dispatch } = this.props;
    let enemy = this.props.enemies[enemyId];
    dispatch(actions.enemyTakeDamage(currentLocation, enemy.direction, enemy.health - 10, enemy.kind));
    let canMove = this.moveCheck(knockBackDirection, currentLocation);
    if(canMove !== false) {
      dispatch(actions.enemyKnockBack(currentLocation, canMove, enemyId, enemy.direction, enemy.kind));
      // this.squareCheck();
    } else {
      dispatch(actions.resetEnemySprite(currentLocation, enemy.direction, enemy.kind));
    }
  }

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
      let projectileId = v4();
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
      dispatch(actions.newProjectile(projectileId, this.props.player.weapon.name, direction, location, target));
      this.projectileTimer = setInterval(() =>
        this.handleProjectile(projectileId),
        200
      );
    }
  }

  handleProjectile(projectileId) {
    if (this.props.game.gameState === 'active') {
      const { dispatch } = this.props;
      let projectile = this.props.projectiles[projectileId];
      let location = projectile.location;
      let direction = projectile.direction;
      //if projectile has reached max range...
      if (location == projectile.target) {
        dispatch(actions.destroyProjectile(projectileId, location));
        clearInterval(this.projectileTimer());
      } else {
        let canMove = this.attemptMove(direction, location);
        if (canMove !== false) {
          //if projectile hits enemy...
          let enemyCheck = this.props.currentLevel[canMove].isEnemy;
          if (enemyCheck !== '') {
            this.enemyKnockBack(enemyId, direction);
            dispatch(actions.destroyProjectile(projectileId, location));
            clearInterval(this.projectileTimer());
          //otherwise, move to next square
          } else {
            dispatch(actions.moveProjectile(projectileId, this.props.player.weapon.name, location, canMove));
          }
        } else {
          dispatch(actions.destroyProjectile(projectileId, location));
          clearInterval(this.projectileTimer());
        }
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
