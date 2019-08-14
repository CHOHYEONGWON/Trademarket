import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from './trademarket/Home';
import Footer from './trademarket/Footer';
import Header from './trademarket/Header';
import Login from './trademarket/Login';
import StuffDetail from './trademarket/StuffDetail'
import MyStuffs from './trademarket/MyStuffs'
import Category from './trademarket/Category'

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path='/stuffs/:stuffId' component={StuffDetail} />
        <Route exact path="/me/stuffs" component={MyStuffs} />
        <Route exact path='/categories/:categoryId' component = {Category} />
      </Switch>
      <Footer />
    </Router>
  
  );
}

export default App;

