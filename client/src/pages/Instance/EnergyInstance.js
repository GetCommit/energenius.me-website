import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import {Jumbotron, Button, Carousel} from 'react-bootstrap'
// import DocumentTitle from 'react-document-title/DocumentTitle';

class EnergyInstance extends Component {
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
            'https://www.energenius.me/api/energy?name=all'
        )
            .then(response => response.json())
            .then(data => {
                for (var item in data){
                    if(data[item]["Name"] == this.img){
                        this.states['result'] = data[item]['description']
                        this.states['related_country'] = data[item]['Country_API']
                        this.states['related_production'] = data[item]['Production_API']
                        this.states['Video'] = data[item]['Video_API']

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
                        <div class="col-sm-6">
                            <div class="embed-responsive embed-responsive-16by9">
                                <iframe allowfullscreen="" class="embed-responsive-item" src={"https://www.youtube.com/embed/"+this.states['Video']}>
                                </iframe>
                            </div>
                        </div>
                    </div>


                    <aside class="col-md-4 blog-sidebar">
                        <div class="p-4">
                            <img src={require('../../img/energy/instance/'+this.img+'.jpg')} width="80%" height="80%" />
                        </div>

                        <div class="p-4">
                        <h4 class="font-italic">Related Country</h4>
                        <ol class="list-unstyled mb-0">

                            <li><Link to={'/country/'+this.states['related_country']}>{this.states['related_country']}</Link></li>

                        </ol>
                        </div>

                        <div class="p-4 mt-0">
                        <h4 class="font-italic">Related Production & Usage</h4>
                        <ol class="list-unstyled">

                            <li><Link to={'/production/'+this.states['related_production']}>{this.states['related_production']}</Link></li>

                        </ol>
                        </div>
                    </aside>

            </div>
        </div>

        )
    }
}

export default EnergyInstance
