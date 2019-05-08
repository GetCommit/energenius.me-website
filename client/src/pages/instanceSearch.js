import React, { Component } from 'react'
import {Form, Button, Card, CardColumns, CardDeck} from 'react-bootstrap'
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
            // return "..."+brief.join(' ')+"...";
            return brief;
        }

        componentDidMount (){
            document.title = this.img;
            fetch(
                '/api/'+this.id['type']+'?name=all'
                )
                .then(response => response.json())
                .then(data => {

                    const allData = data.entries()
                    var emptySearch = true
                    for (const elem of allData) {

                        this.info = {}
                        this.info['API'] = elem[1]['API']
                        this.info["description"] = elem[1]['description']
                        this.info["modelType"] = 'energy'

                        this.state[elem[1]['Name']] = this.info
                        var str = elem[1]['description'].replace('\n','')
                        var des = str.toLowerCase().split(" ");

                        if(des.includes(this.search.toLowerCase())){
                            emptySearch = false
                            str = this.info['description'];

                            var brief = this.getBriefInfo(this.info['description'], this.search, 20)

                            var mid = brief[1];
                            var left = "..."+brief[0].join(" ")
                            var right = brief[2].join(" ")+"..."


                            this.search_results.push(

                            <div class = "p-3">
                                <h5 class = "px-2">
                                    <Link to={'/'+this.id['type']+'/'+elem[1]['Name']}> {elem[1]['Name']} </Link>
                                </h5>
                                <div className="px-2 text-success"> {'www.energenius.me/'+this.id['type']+'/'+elem[1]['Name']}</div>


                                <div class = "px-2 text-muted">{left} <b>{mid}</b> {right} </div>
                            </div>
                            )
                        }

                    }
                    if(emptySearch){
                        this.search_results.push(
                            <h5 class = "px-2">
                                Oops, we can't find your search.
                            </h5>

                        )
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

            <div class="mt-4 px-3">
            <h1>Search results for <b>"{this.search}"</b></h1>
            </div>

            <div class="col-md-10">
            {this.search_results}
            </div>


            {/* Reset */}
            <Form  onSubmit={this.handleSubmit} noValidate inline className="justify-content-left px-3 col-xs-6" alignRight >
                <Link to={'/'+this.id['type']}>

                  <Button variant="outline-primary" className="px-5 mt-2 mt-sm-0">
                    Reset
                  </Button>

                </Link>
            </Form>





        </div>
        )
    }
}
