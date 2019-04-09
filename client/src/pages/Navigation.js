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
  render(){
    return (
      <Nav class="navbar navbar-dark bg-dark">
        <Navbar default to collapseOnSelect >
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
          <Navbar.Brand href="/">Energenius</Navbar.Brand>
          <Navbar.Collapse id = "responsive-navbar-nav">
            <Nav >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href='/energy'>Energy Category</Nav.Link>
            <Nav.Link href="/production">Production and Usage</Nav.Link>
            <Nav.Link href="/country">Country of Consumption</Nav.Link>
            <Nav.Link href="/about">About Us</Nav.Link>

            <Nav className="justify-content-end" alignRight>
              <Form inline className="justify-content-center col-xs-6">
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-primary" className="mt-2 mt-sm-0">Search</Button>
              </Form>
            </Nav>


            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Nav>
    )

  }
}
