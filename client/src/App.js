import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
// import { Container, Nav, NavItem, NavLink, Navbar, NavbarBrand, NavbarToggler, Collapse } from 'reactstrap';


import Navigation from './pages/Navigation'
import Home from './pages/home'
import Energy from './pages/energy'
import Production from './pages/production'
import Country from './pages/country'

import CountryInstance from './pages/Instance/CountryInstance.js'
import EnergyInstance from './pages/Instance/EnergyInstance.js'
import ProductionInstance from './pages/Instance/ProductionInstance.js'


import About from './pages/about'
import Footer from './pages/footer'

import './index.css'


class App extends Component {
  render() {
    return (
      <Router>
        <div>
        <Navigation />
        <Switch>
          <Route path="/energy" component={Energy}/>
          <Route exact path="/" component={Home}/>


          <Route path="/energy/:id" component={EnergyInstance}/>

          <Route path="/production" component={Production}/>
          <Route path="/production/:id" component={ProductionInstance}/>

          <Route path="/country" component={Country}/>
          <Route path="/country/:id" component={CountryInstance}/>

          <Route exact path="/about" component={About}/>

        </Switch>
        <Footer />
        </div>
      </Router>
    );
  }
}



export default App;
