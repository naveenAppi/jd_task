import React from 'react';
import { BrowserRouter as Router , Route , Switch} from 'react-router-dom';
import './App.css';
import ProductMainView from './View/ProductMainView';

function App() {
  return <Router>
  <Switch>
  <Route exact path="/" component={ProductMainView} /> 
  </Switch>  
  </Router>
}

export default App;
