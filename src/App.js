import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './styles/App.css';
import Home from './pages/Home';
import Comidas from './pages/Comidas';
import Bebidas from './pages/Bebidas';
import BebidasPorIngredientes from './pages/BebidasPorIngredientes';
import ComidasPorIngredientes from './pages/ComidasPorIngredientes';
import ExplorarBebidas from './pages/ExplorarBebidas';
import ExplorarComidas from './pages/ExplorarComidas';
import ComidaPorOrigem from './pages/ComidasPorOrigem';
import Explorar from './pages/Explorar';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import Perfil from './pages/Perfil';
import Provider from './hooks/Provider';

function App() {
  return (
    <div className="container-app">
      <Provider>
        <Switch>
          <Route path="/" exact component={ Home } />
          <Route path="/comidas" exact component={ Comidas } />
          <Route path="/bebidas" exact component={ Bebidas } />
          <Route path="/comidas/:id" exact />
          <Route path="/bebidas/:id" exact />
          <Route path="/comidas/:id/in-progress" exact />
          <Route path="/bebidas/:id/in-progress" exact />
          <Route path="/explorar" exact component={ Explorar } />
          <Route path="/explorar/comidas" exact component={ ExplorarComidas } />
          <Route path="/explorar/bebidas" exact component={ ExplorarBebidas } />
          <Route
            path="/explorar/comidas/ingredientes"
            exact
            component={ ComidasPorIngredientes }
          />
          <Route
            path="/explorar/bebidas/ingredientes"
            exact
            component={ BebidasPorIngredientes }
          />
          <Route path="/explorar/comidas/area" exact component={ ComidaPorOrigem } />
          <Route path="/perfil" exact component={ Perfil } />
          <Route path="/receitas-feitas" exact component={ ReceitasFeitas } />
          <Route path="/receitas-favoritas" exact component={ ReceitasFavoritas } />
        </Switch>
      </Provider>
    </div>
  );
}

export default App;
