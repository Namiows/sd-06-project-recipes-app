import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Pages
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
