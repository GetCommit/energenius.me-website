import React, {Component} from 'react';
import * as d3 from "d3";
import uStates from './uStates';
import './StateMap.css';
class StateMap extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.drawChart = this.drawChart.bind(this);
  }

   componentDidMount() {

      fetch(
        '/api/getD3'
        )
        .then(response => response.json())
        .then(data => {
            this.state['states'] = data
            console.log(this.state)
            this.setState({});

        })
        .catch(e => {
            console.log(e);
        })


  }

  drawChart(states) {

    var map = {
      'Alabama': 'AL',
      'Alaska': 'AK',
      'Arizona': 'AZ',
      'Arkansas': 'AR',
      'California': 'CA',
      'Colorado': 'CO',
      'Connecticut': 'CT',
      'Delaware': 'DE',
      'Florida': 'FL',
      'Georgia': 'GA',
      'Hawaii': 'HI',
      'Idaho': 'ID',
      'Illinois': 'IL',
      'Indiana': 'IN',
      'Iowa': 'IA',
      'Kansas': 'KS',
      'Kentucky': 'KY',
      'Louisiana': 'LA',
      'Maine': 'ME',
      'Maryland': 'MD',
      'Massachusetts': 'MA',
      'Michigan': 'MI',
      'Minnesota': 'MN',
      'Mississippi': 'MS',
      'Missouri': 'MO',
      'Montana': 'MT',
      'Nebraska': 'NE',
      'Nevada': 'NV',
      'New Hampshire': 'NH',
      'New Jersey': 'NJ',
      'New Mexico': 'NM',
      'New York': 'NY',
      'North Carolina': 'NC',
      'North Dakota': 'ND',
      'Ohio': 'OH',
      'Oklahoma': 'OK',
      'Oregon': 'OR',
      'Pennsylvania': 'PA',
      'Rhode Island': 'RI',
      'South Carolina': 'SC',
      'South Dakota': 'SD',
      'Tennessee': 'TN',
      'Texas': 'TX',
      'Utah': 'UT',
      'Vermont': 'VT',
      'Virginia': 'VA',
      'Washington': 'WA',
      'West Virginia': 'WV',
      'Wisconsin': 'WI',
      'Wyoming': 'WY',
  }

  function tooltipHtml(data){ /* function to create html content string in tooltip div. */
    return "<h4>"+data+"</h4><table>"+
      "<tr><td>" + ("Production:  ") + "</td><td>"+(states[map[data]])+"</td></tr>"+
      "</table>";
  }

    var sampleData ={};
    ["HI", "AK", "FL", "SC", "GA", "AL", "NC", "TN", "RI", "CT", "MA",
    "ME", "NH", "VT", "NY", "NJ", "PA", "DE", "MD", "WV", "KY", "OH",
    "MI", "WY", "MT", "ID", "WA", "DC", "TX", "CA", "AZ", "NV", "UT",
    "CO", "NM", "OR", "ND", "SD", "NE", "IA", "MS", "IN", "IL", "MN",
    "WI", "MO", "AR", "OK", "KS", "LA", "VA"]
      .forEach(function(d){
        var p = 1;

        if(states === undefined){
          var x = 1;
        }
        else{

          p = states[d]
          sampleData[d]={parks: p,
            color:d3.interpolate("white", "blue")(p/897)};
        }

      });

    /* draw states on id #statesvg */
    uStates.draw("#statesvg", sampleData, tooltipHtml);

    d3.select(window.frameElement).style("height", "600px");


  }



  render() {

    var s = this.state['states']
    this.drawChart(s);

    return (
      <div className="container">
        <div id="tooltip"></div>
        <svg width="960" height="600" id="statesvg"></svg>
      </div>
    );

  }
}
export default StateMap;
