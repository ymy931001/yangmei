import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Consumer from './Consumer/Consumer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path='/' component={App} />
      <Route exact path='/consumer' component={Consumer} />
    </Switch>
  </Router>
  , document.getElementById('root'));
registerServiceWorker();
