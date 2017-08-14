"use strict"
// REACT
import React from 'react';
import {render} from 'react-dom';
// REACT-ROUTER
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
/* TODO : Template Active - import*/
// import BooksList from './components/pages/booksList';
// import Cart from './components/pages/cart';
import App from './app';
import AccessApp from './components/pages/accessApp';
import SignIn from './components/pages/signIn';
import SignUp from './components/pages/signUp';
import Today from './components/pages/today';
import JarSetup from './components/pages/jarSetup';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="access-app" component={AccessApp}>
        <Route path="/signin" component={SignIn}/>
        <Route path="/signup" component={SignUp}/>
      </Route>
      <Route path="today" component={Today}/>
      <Route path="jar-setup" component={JarSetup}/>
    </Route>
  </Router>
);

/* TODO : Template Active - component
<Route path="/" component={Main}>
  <IndexRoute component={BooksList}/>
  <Route path="/admin" component={BooksForm}/>
  <Route path="/cart" component={Cart}/>
</Route>*/

export default routes;
