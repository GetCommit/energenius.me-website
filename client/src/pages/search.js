import React, { Component } from 'react'

export default class search extends Component {
    constructor (props) {
        super(props)
        this.states={}
        this.title = this.id
        this.id = this.props.match.params;
        this.img = this.id['id']
        console.log(this.id)
        console.log("HELlO")
        }

        componentDidMount (){
            document.title = this.img;
    
            fetch(
                'https://www.energenius.me/api/energy?name=all'
            )
                .then(response => response.json())
                .then(data => {
                    this.states['energy'] = data[0]
                    this.setState({});
                })
                .catch(e => {
                    console.log(e);
                })
                
            fetch(
                'https://www.energenius.me/api/production?name=all'
            )
                .then(response => response.json())
                .then(data => {
                    this.states['production'] = data[0]
                    this.setState({});
                })
                .catch(e => {
                    console.log(e);
                })

            fetch(
                'https://www.energenius.me/api/country?name=all'
            )
                .then(response => response.json())
                .then(data => {
                    this.states['country'] = data[0]
                    this.setState({});
                })
                .catch(e => {
                    console.log(e);
                })




            }

    render() {
        return (
        <div>
            <p>{this.img}</p>
            WENYUAN WU
        </div>
        )
    }
}
