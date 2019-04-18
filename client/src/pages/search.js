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
        
        getBriefInfo(str, target, length)
        {
            var brief = [];
            var targetIndex;
            
            var info = str.split(" ");
            
            // find highlight
            for(let index in info){
                if(info[index] === target){
                targetIndex = index;
                info[index] = "<b>" + target + "</b>";
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
                'https://www.energenius.me/api/energy?name=all'
            )
                .then(response => response.json())
                .then(data => {
                    this.search_results.push(
                        <h2>
                            Energy Results for {this.search}
                        </h2>
                    )
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
                                
                            
                            this.search_results.push(
                            <div>
                                <h5>
                                <li><Link to={'/energy/'+elem[1]['Name']}> {elem[1]['Name']} </Link></li>
                                </h5>
                                

                                <div >
                                    {substr}
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

    
            fetch(
                'https://www.energenius.me/api/production?name=all'
            )
                .then(response => response.json())
                .then(data => {
                    this.search_results.push(
                        <h2>
                            Production Results for {this.search}
                        </h2>
                    )
                    for (const elem of data.entries()) {
                        this.info = {}
                        this.info['API'] = elem[1]['API']
                        this.info["description"] = elem[1]['description']
                        this.info["modelType"] = 'production'

                        this.state[elem[1]['Name']] = this.info
                        var str = elem[1]['description'].replace('\n','')
                        var des = str.split(" ");
                        if(des.includes(this.search)){

                            var str = this.info['description'];
                            
                            var substr = this.getBriefInfo(this.info['description'], this.search, 10)

                                
                            
                            this.search_results.push(
                            <div>
                                <h5>
                                <li><Link to={'/production/'+elem[1]['Name']}>{elem[1]['Name']}</Link></li>
                                </h5>
                                

                                <div >
                                    {substr}
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

            fetch(
                'https://www.energenius.me/api/country?name=all'
            )
                .then(response => response.json())
                .then(data => {
                    this.search_results.push(
                        <h2>
                            Country Results for {this.search}
                        </h2>
                    )
                    for (const elem of data.entries()) {
                        this.info = {}
                        this.info['API'] = elem[1]['API']
                        this.info["description"] = elem[1]['description']
                        this.info["modelType"] = 'country'

                        this.state[elem[1]['Name']] = this.info


                        var str = elem[1]['description'].replace('\n','')
                        var des = str.split(" ");
                        if(des.includes(this.search)){

                            var str = this.info['description'];
                            
                            var idx = str.indexOf(this.search);

                            var substr = this.getBriefInfo(this.info['description'], this.search, 10)

                                
                            
                            this.search_results.push(
                            <div>
                                <h5>
                                <li><Link to={'/country/'+elem[1]['Name']}>{elem[1]['Name']}</Link></li>
                                </h5>
                                

                                <div >
                                    {substr}
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
            
        // componentDidMount (){
        //     document.title = this.img;
    
        //     fetch(
        //         'https://www.energenius.me/api/country?name=all'
        //     )
        //         .then(response => response.json())
        //         .then(data => {
        //             for (const elem of data.entries()) {
        //               this.info = {}
        //               this.info['API'] = elem[1]['API']
        //               this.info["description"] = elem[1]['description']
        //               this.state[elem[1]['Name']] = this.info
        //               if(this.info['description'].includes(this.search)){
        //                 var str = this.info['description'];

                        
        //                 var idx = str.indexOf(this.search);

        //                 if(idx<20){
        //                     var idx1 = 0
        //                 }
        //                 else{
        //                     var idx1 = idx - 20
        //                 }
        //                 if(str.length - idx <10){
        //                     var idx2 = str.length
        //                 }
        //                 else{
        //                     var idx2 = idx+20+this.search.length
        //                 }
        //                 var substr = str.substring(idx1,idx2);

        //                 this.search_results.push(
        //                     <div>
        //                         <h2>
        //                         <li><Link to={'/country/'+elem[1]['Name']}>{elem[1]['Name']}</Link></li>
        //                         </h2>
                                

        //                         <div >
        //                             {substr}
        //                             <br/>
        //                             <br/>


        //                         </div>
        //                     </div>

                            
        //                     )

        //               }

        //             }
        //             this.setState({});
        //         })                .catch(e => {
        //             console.log(e);
        //         })

        //     }

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
