import React, { Component } from 'react'
import {Navbar,Nav, Form, FormControl, Button, NavbarBrand} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default class search extends Component {
    constructor (props) {
        super(props)
        this.title = this.id
        this.id = this.props.match.params;
        this.search = this.id['id']

        this.state = {};
        this.search_results = []
        }

        componentDidMount (){
            document.title = this.img;
    
            fetch(
                'https://www.energenius.me/api/country?name=all'
            )
                .then(response => response.json())
                .then(data => {
                    for (const elem of data.entries()) {
                      this.info = {}
                      this.info["description"] = elem[1]['description']

                      this.state[elem[1]['Name']] = this.info
                      if(this.info['description'].includes(this.search)){
                        var str = this.info['description'];

                        
                        var idx = str.indexOf(this.search);

                        if(idx<20){
                            var idx1 = 0
                        }
                        else{
                            var idx1 = idx - 20
                        }
                        if(str.length - idx <10){
                            var idx2 = str.length
                        }
                        else{
                            var idx2 = idx+20+this.search.length
                        }
                        var substr = str.substring(idx1,idx2);

                        this.search_results.push(
                            <div>
                                <h2>
                                    {elem[1]['Name']}
                                </h2>
                                

                                <div >
                                    {substr}
                                    <br/>
                                    <br/>


                                </div>
                            </div>

                            
                            )

                      }

                    }
                    this.setState({});
                })                .catch(e => {
                    console.log(e);
                })

            }

    render() {
        console.log("HEY HEY")
        return (
        <div>

            <script>
                console.log("Helllo");
            </script>

            <h1>Search results for <b>{this.search}</b></h1>

            <div>
                
                <p>{this.search_results}</p>
                
            </div>


            {/* Reset */}
            <Form  onSubmit={this.handleSubmit} noValidate inline className="justify-content-left col-xs-6" alignRight >
                <Link to={'/'}>

                  <Button variant="outline-primary" className="mt-2 mt-sm-0">
                    Reset
                  </Button>

                </Link> 
            </Form>





        </div>
        )
    }
}
