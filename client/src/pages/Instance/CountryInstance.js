import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import {Jumbotron, Button, Carousel} from 'react-bootstrap'

class CountryInstance extends Component {
    constructor (props) {
      super(props)
      this.states={}
      this.title = this.id
      this.id = this.props.match.params;
      this.img = this.id['id']
    }

    componentDidMount (){
        document.title = this.img;

        fetch(
            'https://www.energenius.me/api/country?name=' + this.img
        )
            .then(response => response.json())
            .then(data => {
                this.states['result'] = data[0]['description'];
                this.states['related_energy'] = data[0]['Energy_API'];
                this.states['related_production'] = data[0]['Production_API'];
                this.states['Video'] = data[0]['Video_API'];
                this.setState({});
            })
            .catch(e => {
                console.log(e);
            })
        }



    render() {
        return (

            <main role="main" class="container">
            <div class="row">
                    <div class="col-md-8 blog-main">
                        <div class="blog-post">
                            <h2 class="blog-post-title">{this.img}</h2>
                                <p>
                                   {this.states['result']}
                                </p>

                                <div class="embed-responsive embed-responsive-16by9">
                                    <iframe allowfullscreen="" class="embed-responsive-item" src={"https://www.youtube.com/embed/"+this.states['Video']}>
                                    </iframe>
                                </div>
                        </div>
                    </div>

                    <aside class="col-md-4 blog-sidebar">
                        <div class="p-4">
                        {/* <img class="img-rounded" src="../bootstrap/img/country/china/china1.png" width = "300"> */}
                        <img src={require('../../img/country/instance/'+this.img+'.jpg')} width="80%" height="80%" />

                        </div>

                        <div class="p-4">
                        <h4 class="font-italic">Related Energy</h4>
                        <ol class="list-unstyled mb-0">

                            <li><Link to={'/energy/'+this.states['related_energy']}>{this.states['related_energy']}</Link></li>

                        </ol>
                        </div>

                        <div class="p-4">
                        <h4 class="font-italic">Related Production and Usage</h4>
                        <ol class="list-unstyled">

                            <li><Link to={'/production/'+this.states['related_production']}>{this.states['related_production']}</Link></li>

                        </ol>
                        </div>
                    </aside>

            </div>
            </main>

        )
    }
}

export default CountryInstance
