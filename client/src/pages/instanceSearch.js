import React, { Component } from 'react'
import {Navbar,Nav, Form, FormControl, Button, NavbarBrand} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default class instanceSearch extends Component {
    constructor (props) {
        super(props)
        this.title = this.id
        this.id = this.props.match.params;
        this.search = this.id['id']
        this.state = {};
        this.search_results = []

        }
        
        getBriefInfo(str, target, length)
        {
            var brief = [];
            var targetIndex;
            
            var info = str.split(" ");
            
            // find highlight
            for(let index in info){
                if(info[index] === target){
                targetIndex = index;
                info[index] = target;
                break;
                }
            }
            
            for(var i = (+targetIndex - length/2); i < (+targetIndex+length/2); i++){
            
                // console.log(i < (targetIndex + 5))
                if( 0 <= i  && i < info.length){
                brief.push(info[i]);
                }
            }
            
            return "..."+brief.join(' ')+"...";
        }
        componentDidMount (){
            document.title = this.img;
        
            fetch(
                'https://www.energenius.me/api/'+this.id['type']+'?name=all'
            )
                .then(response => response.json())
                .then(data => {

                    for (const elem of data.entries()) {

                        this.info = {}
                        this.info['API'] = elem[1]['API']
                        this.info["description"] = elem[1]['description']
                        this.info["modelType"] = 'energy'

                        this.state[elem[1]['Name']] = this.info
                        var str = elem[1]['description'].replace('\n','')
                        var des = str.split(" ");

                        if(des.includes(this.search)){

                            var str = this.info['description'];
                            
                            var substr = this.getBriefInfo(this.info['description'], this.search, 10)
                            var left = substr.substring(0,substr.indexOf(this.search)) 
                            var right = substr.substring(substr.indexOf(this.search)+this.search.length+1, substr.length)

                            
                            this.search_results.push(
                            <div>
                                <h5>
                                    <Link to={'/energy/'+elem[1]['Name']}> {elem[1]['Name']} </Link>
                                </h5>
                                

                                <div >
                                    <div className = "Button">{left} <b>{this.search}</b> {right} </div>
                                    <br/>
                                    <br/>


                                </div>
                            </div>
                            )
                        }

                        

                    }
                    this.setState({})

                    
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
                <Link to={'/'+this.id['type']}>

                  <Button variant="outline-primary" className="mt-2 mt-sm-0">
                    Reset
                  </Button>

                </Link> 
            </Form>





        </div>
        )
    }
}
