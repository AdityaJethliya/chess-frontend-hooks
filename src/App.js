import React from 'react';
<<<<<<< HEAD
import { Route, Switch } from 'react-router-dom'
import './App.css';
import Game from './components/Game'
import Join from './components/Join'
=======
import logo from './logo.svg';
import './App.css';
>>>>>>> 7724373ee152bb1e6ec68a84e2726c2942f270cf

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Join} />
        <Route exact path='/game/:gameId/:color' render={routeProps =>
          <Game gameId={routeProps.match.params.gameId} color={routeProps.match.params.color} />
        } />
      </Switch>
    </div>
  );
}

export default App;
