
import React, { Component } from 'react';
import * as d3 from 'd3'
import {Tabs, Tab} from "react-bootstrap";



export default class othervis3 extends Component {
    constructor(props) {
      super(props);

      this.state = {
          visLoaded: false,
          vis: undefined
      };

    }

    

    componentDidMount() {
        fetch('http://perfectfitforme-env.bdibh8r7gh.us-east-2.elasticbeanstalk.com/api/cities')
            .then(response => response.json())
            .then(data => this.setState({vis: data.Jobs}));

    }

    componentDidUpdate() {

        if (this.state.vis && !this.state.visLoaded) {
            this.state.visLoaded = true;
            this.rendervis();

        }
    }

    rendervis() {
        
        

    }


    render() {
        if (this.state.vis === undefined ) {
            return (<div>Loading</div>)
        }

      return (
          <div>

              <div id="vis" style={{paddingLeft: '10rem'}}><p>Salary Bar Graph Colored by Education Level</p></div>
            </div>

      )
    }
}
