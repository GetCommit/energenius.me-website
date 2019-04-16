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
    // componentDidMount (){
    //     fetch(
    //         'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&explaintext&exsentences=10&origin=*&titles='+this.id['id']
    //     )
    //         .then(response => response.json())
    //         .then(data => {

    //             var v = data['query']['pages'];
    //             var keys = Object.keys(v);
    //             this.states['result'] = data['query']['pages'][keys[0]]['extract'];
    //         //   process the data
    //         this.setState({})
    //         })
    //         .catch(e => {
    //             console.log(e)
    //         })
    //     }
    componentDidMount (){
        fetch(
            'https://www.energenius.me/api/production?name=all'
        )
            .then(response => response.json())
            .then(data => {
                for (var item in data){
                    if(data[item]["Name"] == this.img){
                        this.states['result'] = data[item]['description']
                        this.states['related_country'] = data[item]['Country_API']
                        this.states['related_energy'] = data[item]['Related_Energy']

                        break
                    }
                    
                }
                this.setState({})
            })
            .catch(e => {
                console.log(e)
            })
        }

    render() {



        return (

        <div>
            <div class="row">

                    <div class="col-md-8 blog-main">
                        <h2 class="blog-post-title">{this.title}</h2>
                        <div class="ml-1">
                            <p class="px-5 c font" >
                               {this.states['result']}
                            </p>
                        </div>


                    </div>

                    <aside class="col-md-4 blog-sidebar">
                        <div class="p-4">
                        {/* <img class="img-rounded" src="../bootstrap/img/country/china/china1.png" width = "300"> */}
                        <img src={require('../../img/production_usage/instance/'+this.img+'.jpg')} width="80%" height="80%" />

                        </div>

                        <div class="p-4">
                        <h4 class="font-italic">Related Country</h4>
                        <ol class="list-unstyled mb-0">
                            <li><Link to={'/country/'+this.states['related_country']}>{this.states['related_country']}</Link></li>
                        </ol>
                        </div>

                        <div class="p-4">
                        <h4 class="font-italic">Related Energy</h4>
                        <ol class="list-unstyled">
                            <li><Link to={'/energy/'+this.states['related_energy']}>{this.states['related_energy']}</Link></li>


                        </ol>
                        </div>
                    </aside>

            </div>
        </div>

        )
    }
}

export default ProductionInstance
