import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import {Jumbotron, Button, Carousel} from 'react-bootstrap'
// import DocumentTitle from 'react-document-title/DocumentTitle';

class ProductionInstance extends Component {
    constructor (props) {
      super(props)
      this.states={}
      this.title = this.id
      this.id = this.props.match.params;
      this.img = this.id['id']
    }
    componentDidMount (){
        fetch(
            'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&explaintext&exsentences=10&origin=*&titles='+this.id['id']
        )
            .then(response => response.json())
            .then(data => {

                var v = data['query']['pages'];
                var keys = Object.keys(v);
                this.states['result'] = data['query']['pages'][keys[0]]['extract'];
            //   process the data
            this.setState({})
            })
            .catch(e => {
                console.log(e)
            })
        }


    render() {



        return (

        <div>
        <head>
            <meta charset="utf-8"></meta>
            <meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
            <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
            <title>Solar Energy</title>

            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>


                <link href="https://fonts.googleapis.com/css?family=Playfair+Display:700,900" rel="stylesheet"></link>
                <link href="../bootstrap/css/blog.css" rel="stylesheet"></link>


        </head>
            <div class="row">

                    <div class="col-md-8 blog-main">
                        <h2 class="blog-post-title">{this.title}</h2>
                        <p>{this.states['result']}</p>


                    </div>

                    <aside class="col-md-4 blog-sidebar">
                        <div class="p-4">
                        {/* <img class="img-rounded" src="../bootstrap/img/country/china/china1.png" width = "300"> */}
                        <img src={require('../../img/production_usage/API/'+this.img+'.jpg')} width="80%" height="80%" />

                        </div>

                        <div class="p-4">
                        <h4 class="font-italic">Energy Category</h4>
                        <ol class="list-unstyled mb-0">
                            <li><Link to={'/energy/'+'Natural_gas'}>Natural Gas</Link></li>
                        </ol>
                        </div>

                        <div class="p-4">
                        <h4 class="font-italic">Country of Consumption</h4>
                        <ol class="list-unstyled">
                            <li><Link to={'/country/'+'Energy_policy_of_China'}>China</Link></li>
                            <li><Link to={'/country/'+'Energy_in_the_United_States'}>United States</Link></li>
                            <li><Link to={'/country/'+'Energy_in_Australia'}>Australia</Link></li>

                        </ol>
                        </div>
                    </aside>

            </div>
        </div>

        )
    }
}

export default ProductionInstance
