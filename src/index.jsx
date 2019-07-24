import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { AppContainer } from 'react-hot-loader';
import { HashRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

// const initialState = {
//   playerStats: {playerHealth: 100, playerWeapon: 'Flare Gun', playerDirection: 'S', playerScore: 0}
// };

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

const render = (Component) => {
  ReactDOM.render(
    <HashRouter>
      <Provider store={store}>
        <Component/>
      </Provider>
    </HashRouter>,
    document.getElementById('react-app-root')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    render(App)
  });
}
