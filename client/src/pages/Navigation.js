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
    this.textInput = React.createRef();

  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ value: this.textInput.value})
  };


  render(){
    return (
      <Nav class="navbar navbar-light" style={{ backgroundColor: '#e3f2fd' }}>
        <Navbar default to collapseOnSelect >
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
          <Navbar.Brand href = '/'>Energeinus</Navbar.Brand>
          <Navbar.Collapse id = "responsive-navbar-nav">

            <Nav variant="pills" >
              <Link to="/energy" style={{ textDecoration: 'none'}}>
                <Nav.Link href="/energy" eventKey="1">Energy</Nav.Link>
              </Link>

              <Link to="/production" style={{ textDecoration: 'none'}}>
                <Nav.Link href="/production" eventKey="2">Production & Usage</Nav.Link>
              </Link>

              <Link to="/country" style={{ textDecoration: 'none'}}>
                <Nav.Link href="/country" eventKey="3">Country</Nav.Link>
              </Link>

              <Link to="/about" style={{ textDecoration: 'none' }}>
                <Nav.Link href="/about" eventKey="4">About Us</Nav.Link>
              </Link>

            </Nav>

            <Nav fill className="justify-content-end" alignRight>
              <Form inline className="justify-content-left col-xs-6" onSubmit={this.handleSubmit} >
              <input type="text" ref={this.textInput} />
                <Link to={'/search/'+this.textInput.value}>


                  <Button variant="outline-primary" className="mt-2 mt-sm-0">
                    Search
                  </Button>
                </Link>
              </Form>
            </Nav>

          </Navbar.Collapse>
        </Navbar>
      </Nav>
    )

  }
  
}
