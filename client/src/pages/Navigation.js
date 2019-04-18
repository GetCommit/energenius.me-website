import React, { Component } from 'react'
import {Navbar,Nav, Form, FormControl, Button, NavbarBrand} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

export default class Navigation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: null,
      formErrors: {
        query: ""
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        Query: ${this.state.query}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };
  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
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
              <Form  onSubmit={this.handleSubmit} noValidate inline className="justify-content-left col-xs-6" alignRight >
                <FormControl 

                  placeholder=""
                  type="text"
                  name="query"
                  noValidate
                  onChange={this.handleChange}

                />

                <Link to={'/search/'+this.state.query}>

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
