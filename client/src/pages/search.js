import React, { Component } from 'react'
import {Form, Button, Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default class search extends Component {

    constructor (props) {
        super(props)
        this.title = this.id
        this.id = this.props.match.params;
        this.getBriefInfo = this.getBriefInfo.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.search = this.id['id']

        this.state = {};
        this.search_results = []
        console.log("GLOBAL SEARCH")
        }

        getBriefInfo(str, target, length) {
            // Target must be lower case
            var targetIndex;

            var info = str.split(" ");

            // find highlight
            for(let index in info){
                if(info[index].toLowerCase() == target.toLowerCase()){
                targetIndex = index;
                break;
                }
            }

            var left = [];
            var mid = [];
            var right = [];


            for(var i = (+targetIndex - length/2); i < (+targetIndex+length/2); i++){

                if( 0 <= i  && i < info.length){
                    if( i < targetIndex){
                        left.push(info[i]);
                    }
                    if(i == targetIndex){
                        mid=info[i];
                    }
                    if(i > targetIndex){
                        right.push(info[i]);
                    }
                }
            }

            var brief = [];
            brief.push(left);
            brief.push(mid);
            brief.push(right);
            return brief;
        }

        async componentDidMount (){
            document.title = this.img;
            fetch(
                'https://www.energenius.me/api/energy?name=all'
            )
                .then(response => response.json())
                .then(data => {
                    this.search_results.push(
                        <div class = "mt-4">
                        <h2>
                            Energy Results for <b>"{this.search}"</b>
                        </h2>
                        </div>
                    )
                    for (const elem of data.entries()) {
                        this.info = {}
                        this.info['API'] = elem[1]['API']
                        this.info["description"] = elem[1]['description']
                        this.info["modelType"] = 'energy'

                        this.state[elem[1]['Name']] = this.info
                        var str = elem[1]['description'].replace('\n','')
                        var des = str.toLowerCase().split(" ");
                        if(des.includes(this.search.toLowerCase())){

                            str = this.info['description'];

                            var brief = this.getBriefInfo(this.info['description'], this.search, 20)

                            var mid = brief[1];
                            var left = "..."+brief[0].join(" ")
                            var right = brief[2].join(" ")+"..."

                            console.log("HELLO WORLD")

                            this.search_results.push(
                                <div class = "p-3">
                                <h5 class = "px-2">
                                    <Link to={'/country/'+elem[1]['Name']}> {elem[1]['Name']} </Link>
                                </h5>
                                <div className="px-2 text-success"> {'www.energenius.me/country/'+elem[1]['Name']}</div>
                                

                                <div class = "px-2 text-muted">{left} <b>{mid}</b> {right} </div>
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
                        <div class = "mt-4">
                        <h2>
                            Production Results for <b>"{this.search}"</b>
                        </h2>
                        </div>
                    )
                    for (const elem of data.entries()) {
                        this.info = {}
                        this.info['API'] = elem[1]['API']
                        this.info["description"] = elem[1]['description']
                        this.info["modelType"] = 'production'

                        this.state[elem[1]['Name']] = this.info
                        var str = elem[1]['description'].replace('\n','')
                        var des = str.toLowerCase().split(" ");
                        if(des.includes(this.search.toLowerCase())){

                            str = this.info['description'];
                            var brief = this.getBriefInfo(this.info['description'], this.search, 20)

                            var mid = brief[1];
                            var left = "..."+brief[0].join(" ")
                            var right = brief[2].join(" ")+"..."


                            this.search_results.push(
                                <div class = "p-3">
                                <h5 class = "px-2">
                                    <Link to={'/production/'+elem[1]['Name']}> {elem[1]['Name']} </Link>
                                </h5>
                                <div className="px-2 text-success"> {'www.energenius.me/production/'+elem[1]['Name']}</div>
                                

                                <div class = "px-2 text-muted">{left} <b>{mid}</b> {right} </div>
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
                        <div class = "mt-4">
                        <h2>
                            Country Results for <b>"{this.search}"</b>
                        </h2>
                        </div>
                    )
                    for (const elem of data.entries()) {
                        this.info = {}
                        this.info['API'] = elem[1]['API']
                        this.info["description"] = elem[1]['description']
                        this.info["modelType"] = 'country'

                        this.state[elem[1]['Name']] = this.info


                        var str = elem[1]['description'].replace('\n','')
                        var des = str.toLowerCase().split(" ");
                        if(des.includes(this.search.toLowerCase())){

                            str = this.info['description'];

                            var brief = this.getBriefInfo(this.info['description'], this.search, 20)

                            var mid = brief[1];
                            var left = "..."+brief[0].join(" ")
                            var right = brief[2].join(" ")+"..."


                            this.search_results.push(
                            <div class = "p-3">
                                <h5 class = "px-2">
                                    <Link to={'/country/'+elem[1]['Name']}> {elem[1]['Name']} </Link>
                                </h5>
                                <div className="px-2 text-success"> {'www.energenius.me/country/'+elem[1]['Name']}</div>
                                

                                <div class = "px-2 text-muted">{left} <b>{mid}</b> {right} </div>
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
        return (
        <div>

            <div class="col-md-10">
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
