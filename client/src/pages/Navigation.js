import React, { Component } from 'react'
import {Navbar,Nav,NavItem, NavDropdown, Form, FormControl, Button, NavbarBrand} from 'react-bootstrap'
import {IndexLinkContainer, LinkContainer} from 'react-router-bootstrap'
import {Link} from 'react-router-dom'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import Home from './home'
import Energy from './energy'
import Production from './production'
import Country from './country'
import About from './about'
import Footer from './footer'


export default class Navigation extends Component {
  constructor(props) {
    super(props)
    this.state = {name: "Default"}
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.setState ( {name : "Change"})
  }

  render(){
    return (
      <Nav class="navbar navbar-dark bg-dark">
        <Navbar default to collapseOnSelect >
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
          <Navbar.Brand href = '/'>Energeinus</Navbar.Brand>
          <Navbar.Collapse id = "responsive-navbar-nav">

            <Nav variant="pills" >
              <Link to="/energy">              
                <Nav.Link href="/energy" eventKey="1">Category</Nav.Link>
              </Link>
              
              <Link to="/production">              
                <Nav.Link href="/production" eventKey="2">Production & Usage</Nav.Link>
              </Link>

              <Link to="/country">              
                <Nav.Link href="/country" eventKey="3">Country</Nav.Link>
              </Link>
              
              <Link to="/about">
                <Nav.Link href="/about" eventKey="4">About Us</Nav.Link>
              </Link>

            </Nav>

            <Nav fill className="justify-content-end" alignRight>
              <Form inline className="justify-content-left col-xs-6">
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-primary" className="mt-2 mt-sm-0">Search</Button>
              </Form>
            </Nav>

          </Navbar.Collapse>
        </Navbar>
      </Nav>
    )

  }
}
