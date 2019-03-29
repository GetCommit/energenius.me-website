import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import {Jumbotron, Button, Carousel} from 'react-bootstrap'
// import DocumentTitle from 'react-document-title/DocumentTitle';

export default class Home extends Component {
  render() {
    return (
    <div>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>

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
        </Carousel>;

      </div>
      
    </div>
    )
  }
}
