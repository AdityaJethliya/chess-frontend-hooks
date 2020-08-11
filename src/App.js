import React from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';
import Game from './components/Game'
import Join from './components/Join'

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
