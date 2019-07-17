import React from "react";
import Level from "./Level";
import { Switch, Route, withRouter  } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import c from './../constants';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentLevel: {
        '1/1' : {
          value: 'empty'
        },
        '1/2' : {
          value: 'empty'
        },
        '1/3' : {
          value: 'empty'
        },
        '1/4' : {
          value: 'empty'
        },
        '1/5' : {
          value: 'empty'
        },
        '1/6' : {
          value: 'empty'
        },
        '2/1' : {
          value: 'empty'
        },
        '2/2' : {
          value: 'empty'
        },
        '2/3' : {
          value: 'empty'
        },
        '2/4' : {
          value: 'empty'
        },
        '2/5' : {
          value: 'empty'
        },
        '2/6' : {
          value: 'empty'
        },
        '3/1' : {
          value: 'empty'
        },
        '3/2' : {
          value: 'empty'
        },
        '3/3' : {
          value: 'empty'
        },
        '3/4' : {
          value: 'empty'
        },
        '3/5' : {
          value: 'empty'
        },
        '3/6' : {
          value: 'empty'
        },
        '4/1' : {
          value: 'empty'
        },
        '4/2' : {
          value: 'empty'
        },
        '4/3' : {
          value: 'empty'
        },
        '4/4' : {
          value: 'empty'
        },
        '4/5' : {
          value: 'empty'
        },
        '4/6' : {
          value: 'empty'
        },
        '5/1' : {
          value: 'empty'
        },
        '5/2' : {
          value: 'empty'
        },
        '5/3' : {
          value: 'empty'
        },
        '5/4' : {
          value: 'empty'
        },
        '5/5' : {
          value: 'empty'
        },
        '5/6' : {
          value: 'empty'
        },
        '6/1' : {
          value: 'empty'
        },
        '6/2' : {
          value: 'empty'
        },
        '6/3' : {
          value: 'empty'
        },
        '6/4' : {
          value: 'empty'
        },
        '6/5' : {
          value: 'empty'
        },
        '6/6' : {
          value: 'empty'
        }
      },
      selectedSquare: null
    };
    this.handleAddingSquareToLevel = this.handleAddingSquareToLevel.bind(this);
  }

  handleAddingSquareToLevel(newSquare) {
    var newCurrentLevel = this.state.currentLevel.slice();
    newCurrentLevel.push(newSquare);
    this.setState({currentLevel: newCurrentLevel});
  }

  handleChangingSelectedSquare(squareId){
    this.setState({selectedSquare: squareId});
  }

  render(){
    return (
      <div>
          <Route exact path='/' render={()=><Level level={this.state.currentLevel}
            onSquareSelection={this.handleChangingSelectedSquare}
            selectedSquare={this.state.selectedSquare}/>} />
      </div>
    );
  }
}

App.propTypes = {
  currentLevel: PropTypes.object
};

const mapStateToProps = state => {
  return {
    currentLevel: state
  }
};

export default withRouter(connect(mapStateToProps)(App));
