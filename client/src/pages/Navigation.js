import React, { Component } from 'react'
import {Navbar, NavDropdown, Nav, Form, Button} from 'react-bootstrap'
import {Link, withRouter} from 'react-router-dom'




class Navigation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: null,
      formErrors: {
        query: ""
      }
    };
    // this.onInputChange = this.onInputChange.bind(this);


    this.globalSearch = this.globalSearch.bind(this);
    this.searchParam = React.createRef();


  }

  globalSearch() {
    console.log('HERER')
    if(this.searchParam.value !== "")
    {
      console.log(this.searchParam.value)
      this.props.history.push('/search/'+this.searchParam.value);
    }
  }



  render(){
    return (
        <Nav variant="pills"  bg="#d9e6f2"
        defaultActiveKey="/" style={{ padding: "10px", backgroundColor: "#d9e6f2" }}>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>

            <Nav.Item>
                <Link to="/" style={{ textDecoration: 'none'}}>
                <Nav.Link href="/"><b>Energeinus</b></Nav.Link>
                </Link>
            </Nav.Item>
            <Nav.Item>
                <Link to="/energy" style={{ textDecoration: 'none'}}>
                <Nav.Link href="/energy" eventKey="1">Energy</Nav.Link>
                </Link>
            </Nav.Item>
            <Nav.Item>
                <Link to="/production" style={{ textDecoration: 'none'}}>
                <Nav.Link href="/production" eventKey="2">Production & Usage</Nav.Link>
                </Link>
            </Nav.Item>
            <Nav.Item>
                <Link to="/country" style={{ textDecoration: 'none'}}>
                <Nav.Link href="/country" eventKey="3">Country</Nav.Link>
                </Link>
            </Nav.Item>


            <NavDropdown title="Visualization" id="basic-nav-dropdown">
              <NavDropdown.Item href="/carbonemission">Visual 1</NavDropdown.Item>
              <NavDropdown.Item href="/countryenergy">Visual 2</NavDropdown.Item>
              <NavDropdown.Item href="/StateMap">Visual 3</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/othervis1">PerfectFit 1</NavDropdown.Item>
              <NavDropdown.Item href="/othervis2">PerfectFit 2</NavDropdown.Item>
              <NavDropdown.Item href="/othervis3">PerfectFit 3</NavDropdown.Item>
            </NavDropdown>

            <Nav.Item>
                <Link to="/about" style={{ textDecoration: 'none' }}>
                <Nav.Link href="/about" eventKey="4">About Us</Nav.Link>
                </Link>
            </Nav.Item>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

              <Nav className="justify-content-end">

                  <Form.Control
                    id="searchbar"
                    type="text"
                    placeholder="Search"
                    className="mr-sm-2"
                    ref={ref => {
                      this.searchParam = ref;
                    }}
                    onKeyPress={event => {
                      if (event.key === "Enter") {
                        this.globalSearch();
                      }
                    }}
                  />
              </Nav>
              <Button variant="outline-primary" className="mt-2 mt-sm-0" onClick={()=>this.globalSearch()}>Global Search</Button>






      </Nav>












    )

  }

}

export default withRouter(Navigation);
