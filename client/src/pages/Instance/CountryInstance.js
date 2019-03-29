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
            <title>China</title>

            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>


                <link href="https://fonts.googleapis.com/css?family=Playfair+Display:700,900" rel="stylesheet"></link>
                <link href="../bootstrap/css/blog.css" rel="stylesheet"></link>


        </head>
            <div class="row">

                    <div class="col-md-8 blog-main">
                        <h2 class="blog-post-title">China</h2>
                        <p>Ensuring adequate energy supply to sustain economic growth has been a core concern of the Chinese government since 1949. Primary energy use in China was 26,250 TWh and 20 TWh per million persons in 2009. According to the International Energy Agency, the primary energy use grew 40% and electricity use 70% from 2004 to 2009.</p>
                        <img src={require('../../img/country/china/china3.png')} width="50%" height="50%" />


                        {/* <p>In 2006, 16 million tons of corn have been used to produce ethanol. However, because food prices in China rose sharply during 2007, China has decided to ban the further expansion of the corn ethanol industry.</p> */}
                    </div>
                    
                    <aside class="col-md-4 blog-sidebar">
                        <div class="p-4">
                        {/* <img class="img-rounded" src="../bootstrap/img/country/china/china1.png" width = "300"> */}
                        <img src={require('../../img/country/china/china1.png')} width="80%" height="75%"/>

                        </div>

                        <div class="p-4">
                        <h4 class="font-italic">Production & Usage</h4>
                        <ol class="list-unstyled mb-0">
                            <li><Link to={'/country/'+'1'}>Residential</Link></li>
                            <li><Link to={'/production/'+'2'}>Medical</Link></li>
                            <li><Link to={'/production/'+'1'}>Hydraulic Fracturing</Link></li>
                        </ol>
                        </div>

                        <div class="p-4">
                        <h4 class="font-italic">Energy Categories</h4>
                        <ol class="list-unstyled">
                            <li><Link to={'/energy/'+'1'}>Solar</Link></li>
                            <li><Link to={'/energy/'+'2'}>Nuclear</Link></li>
                            <li><Link to={'/energy/'+'3'}>Natural Gas</Link></li>
  
                        </ol>
                        </div>
                    </aside>

            </div>
        </div>

        )
    }
}
