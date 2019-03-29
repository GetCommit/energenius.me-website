import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import {Jumbotron, Button, Carousel} from 'react-bootstrap'
// import DocumentTitle from 'react-document-title/DocumentTitle';

export default class Production extends Component {
    
    render() {
        const{id} = this.props.match.params
        return (

        <div>
        <head>
            <meta charset="utf-8"></meta>
            <meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
            <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
            <title>Hydraulic Fracturing</title>

            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>


                <link href="https://fonts.googleapis.com/css?family=Playfair+Display:700,900" rel="stylesheet"></link>
                <link href="../bootstrap/css/blog.css" rel="stylesheet"></link>


        </head>
            <div class="row">

                    <div class="col-md-8 blog-main">
                        <h2 class="blog-post-title">Hydraulic Fracturing</h2>
                      <p>Hydraulic fracturing (also fracking) is a well stimulation technique in which rock is fractured by a pressurized liquid. The process involves the high-pressure injection of 'fracking fluid' into a wellbore to create cracks in the deep-rock formations through which natural gas, petroleum, and brine will flow more freely.</p> 
                       <img src={require('../../img/production_usage/fracking/fracking2.jpg')} width="50%" height="50%" />

                        
                    </div>
                    
                    <aside class="col-md-4 blog-sidebar">
                        <div class="p-4">
                        {/* <img class="img-rounded" src="../bootstrap/img/country/china/china1.png" width = "300"> */}
                        <img src={require('../../img/production_usage/fracking/fracking1.jpg')} width="80%" height="80%" />

                        </div>

                        <div class="p-4">
                        <h4 class="font-italic">Production & Usage</h4>
                        <ol class="list-unstyled mb-0">
                            <li><Link to={'/enery/'+'3'}>Energy Category</Link></li>
                        </ol>
                        </div>

                        <div class="p-4">
                        <h4 class="font-italic">Country of Consumption</h4>
                        <ol class="list-unstyled">
                            <li><Link to={'/country/'+'1'}>China</Link></li>
                            <li><Link to={'/country/'+'2'}>United States</Link></li>
                            <li><Link to={'/country/'+'3'}>Australia</Link></li>
  
                        </ol>
                        </div>
                    </aside>

            </div>
        </div>

        )
    }
}
