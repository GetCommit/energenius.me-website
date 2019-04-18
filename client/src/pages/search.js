import React, { Component } from 'react'
import {Navbar,Nav, Form, FormControl, Button, NavbarBrand} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default class search extends Component {
    constructor (props) {
        super(props)
        this.states = {
            activePage: 1,
            info: undefined,

        };
        this.title = this.id
        this.id = this.props.match.params;
        this.search = this.id['id']

        }

        componentDidMount (){
            document.title = this.img;
    
            fetch(
                'https://www.energenius.me/api/country?name=all'
            )
                .then(response => response.json())
                .then(data => {
                    this.states['query_result'] = data
                    this.setState({});
                })
                .catch(e => {
                    console.log(e);
                })

            }

    render() {
        console.log(this.states)

        

        return (
        <div>

            {/* Reset */}
            <Form  onSubmit={this.handleSubmit} noValidate inline className="justify-content-left col-xs-6" alignRight >
                <Link to={'/'}>

                  <Button variant="outline-primary" className="mt-2 mt-sm-0">
                    Reset
                  </Button>

                </Link> 
            </Form>

            <p>{this.search}</p>




        </div>
        )
    }
}
