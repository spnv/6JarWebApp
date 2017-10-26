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
import SignIn from './components/pages/signIn';
import SignUp from './components/pages/signUp';
import Today from './components/pages/today';
import Asset from './components/pages/asset';
import JarSetup from './components/pages/jarSetup';
import SupportUs from './components/pages/supportus';
import ContactUs from './components/pages/contactus';
import AppMenu from './components/app-menu';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={AppMenu}>
      <Route path="signin" component={SignIn}/>
      <Route path="signup" component={SignUp}/>
      <Route path="today" component={Today}/>
      <Route path="support-us" component={SupportUs}/>
      <Route path="asset" component={Asset}/>
      <Route path="contact-us" component={ContactUs}/>
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
