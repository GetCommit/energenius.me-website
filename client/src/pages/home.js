import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import {Jumbotron, Button, Carousel, Form} from 'react-bootstrap'
import TextField from '@material-ui/core/TextField';

import Visual1 from './visualization1';
import Visual2 from './visualization2';
import Visual3 from './StateMap';


// import DocumentTitle from 'react-document-title/DocumentTitle';


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


export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: null,
      formErrors: {
        query: ""
      }
    };
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange (nativeEvent){
    this.setState({ searchValue: nativeEvent.target.value });
  };

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

  render() {

    return (
    <div>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
      <link rel="stylesheet"  src="https://cdnjs.cloudflare.com/ajax/libs/d3/4.2.2/d3.min.js"></link>
      {/* adding jumbotron */}
      <div>
        <Jumbotron>
          <center>
            <h1>Welcome To Energenius</h1>
          </center>
          <p>
            <center>
              Learn about the energies that power our planet.
            </center>
          </p>

          <p>
            <center>
              <Button variant="primary" href="/about">Learn more</Button>
            </center>
          </p>

        

          <p>
          <center>
              <Link to={'/search/'+this.state.query}>
                  <Button variant="outline-primary" rounded size="sm" className="mt-2 btn btn-primary btn-lg">
                    Global Search
                  </Button>

              </Link>
            </center>
          </p>

          <p>
          <center>
            <Form noValidate className="justify-content-left col-xs-6 " alignRight >
                <TextField
                type="text"
                name="query"
                noValidate
                onChange={this.handleChange}
                id = "inputEmail4"
                placeholder = ""
                />
              </Form>
            </center>
          </p>


{/* Insert Testing here */}




    </Jumbotron>
      </div>


      {/* adding slide bar */}
      <div>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={require('../img/smoke.jpeg')}
              alt="First slide"
            />

          </Carousel.Item>
          
          <Carousel.Item>
          <img
              className="d-block w-100"
              src={require('../img/windmill.jpeg')}
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={require('../img/lightbulb.jpeg')}
              alt="Third slide"
            />


          </Carousel.Item>
{/* 
          <Carousel.Item>
            <Visual1/>
          </Carousel.Item>

          <Carousel.Item>
            <Visual3/>
          </Carousel.Item> */}

        </Carousel>;

      </div>

    </div>
    )
  }
}
