import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'


import Navigation from './pages/Navigation'
import Home from './pages/home'
import Energy from './pages/energy'
import Production from './pages/production'
import Country from './pages/country'
import Visualization1 from './pages/visualization1'
import Visualization2 from './pages/visualization2'
import StateMap from './pages/StateMap'

import CountryInstance from './pages/Instance/CountryInstance.js'
import EnergyInstance from './pages/Instance/EnergyInstance.js'
import ProductionInstance from './pages/Instance/ProductionInstance.js'
import Search from './pages/search'
import InstanceSearch from './pages/instanceSearch'

import About from './pages/about'
import Footer from './pages/footer'

import './index.css'


class App extends Component {




  render() {
    return (
      <Router>
        <div>

        <Navigation/>
        <p1> </p1>

        {/* <Switch> */}
          <Route exact path="/" component={Home}/>

          <Route exact path="/energy" component={Energy}/>
          <Route exact path="/energy/:id" component={EnergyInstance}/>

          <Route exact path="/production" component={Production}/>
          <Route exact path="/production/:id" component={ProductionInstance}/>

          <Route exact path="/country" component={Country}/>
          <Route exact path="/country/:id" component={CountryInstance}/>

          <Route exact path="/visualization1" component={Visualization1}/>
          <Route exact path="/visualization2" component={Visualization2}/>

          <Route exact path="/statemap" component={StateMap}/>


          <Route exact path="/search/:id" component={Search}/>
          <Route exact path="/instanceSearch/:type/:id" component={InstanceSearch}/>
          <Route exact path="/about" component={About}/>

        {/* </Switch> */}
        <Footer />
        </div>
      </Router>
    );
  }
}



export default App;
