import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Consumer from './Consumer/Consumer';
import cook from './Cook/Cook';
import pick from './Pick/Pick';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path='/' component={App} />
      <Route exact path='/consumer' component={Consumer} />
      <Route path='/consumer/cook' component={cook} />
      <Route path='/consumer/pick' component={pick} />
    </Switch>
  </Router>
  , document.getElementById('root'));
registerServiceWorker();
