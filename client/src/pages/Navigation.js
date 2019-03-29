import React, { Component } from 'react'
import {Navbar,Nav,NavItem, NavDropdown, Form, FormControl, Button, NavbarBrand} from 'react-bootstrap'
import {IndexLinkContainer, LinkContainer} from 'react-router-bootstrap'
import {Link} from 'react-router-dom'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
// import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

// import Home from './home'
// import Energy from './energy'
// import Production from './production'
// import Country from './country'
// import About from './about'
// import Footer from './footer'


export default class Navigation extends Component {
  render(){
    return (
      <Navbar default to collapseOnSelect>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
        <Navbar.Brand href="/">Energenius</Navbar.Brand>
        <Navbar.Collapse>
          <Nav>
           <Nav.Link href="/">Home</Nav.Link>
           <Nav.Link to='/energy'>Energy Category</Nav.Link>
           <Nav.Link to="/production">Production and Usage</Nav.Link>
           <Nav.Link to="/country">Country of Consumtion</Nav.Link>
           <Nav.Link to="/about">About Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

    //   <Navbar default collapseOnSelect>
    //     <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>

    //     <Navbar.Header>
    //       <Navbar.Brand>
    //        <Link to='/'>Energenius</Link>
    //       </Navbar.Brand>
    //       <Navbar.Toggle />
    //     </Navbar.Header>

    //     <Navbar.Collapse>

    //       <Nav pullRight>
    //         <NavItem eventKey={1} componentClass={Link} to="/">
    //           Home
    //         </NavItem>
    //         <NavItem eventKey={2} componentClass={Link} to="/energy">
    //           Energy Category
    //         </NavItem>
    //         <NavItem eventKey={3} componentClass={Link} to="/production">
    //           Production and Usage
    //         </NavItem>
    //         <NavItem eventKey={4} componentClass={Link} to="/country">
    //           Country of Consumption
    //         </NavItem>
    //         <NavItem eventKey={5} componentClass={Link} to="/about">
    //           About Us
    //         </NavItem>
    //       </Nav>
    //     </Navbar.Collapse>

    // </Navbar>

    )

  }
}
