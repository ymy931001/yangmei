import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Consumer from './Consumer/Consumer';
import JsConsumer from './JsConsumer/JsConsumer';
import cook from './Cook/Cook';
import jscook from './jscook/jscook';
import pick from './Pick/Pick';
import jspick from './jspick/jspick';
import tspick from './tspick/tspick';
import tscook from './tscook/tscook';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path='/' component={App} />
      <Route exact path='/consumer' component={Consumer} />
      <Route exact path='/jsconsumer' component={JsConsumer} />
      <Route path='/consumer/cook' component={cook} />
      <Route path='/consumer/jscook' component={jscook} />
      <Route path='/consumer/pick' component={pick} />
      <Route path='/consumer/jspick' component={jspick} />
      <Route path='/consumer/tscook' component={tscook} />
      <Route path='/consumer/tspick' component={tspick} />
    </Switch>
  </Router>
  , document.getElementById('root'));
registerServiceWorker();
