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

  drawChart(states2) {
    var states = {
        "Louisiana":897,
        "Wyoming":860,
        "Alaskaa":809,
        "North Dakota":776,
        "Iowa":489,
        "Texas":472,
        "Nebraska":455,
        "South Dakota":445,
        "Indiana":422,
        "West Virginia":419,
        "Oklahoma":417,
        "Alabama":398,
        "Mississippi":391,
        "Kentucky":384,
        "Montana":380,
        "Kansas":376,
        "Arkansas":354,
        "Tennessee":333,
        "South Carolina":333,
        "Minnesota":327,
        "New Mexico":320,
        "Ohio":317,
        "Idaho":315,
        "Wisconsin":309,
        "Illinois":304,
        "Pennsylvania":294,
        "Maine":292,
        "Missouri":292,
        "Delaware":287,
        "Washington":283,
        "Virginia":277,
        "Michigan":277,
        "Georgia":275,
        "Colorado":268,
        "Utah":266,
        "District of Columbia":254,
        "North Carolina":251,
        "New Jersey":247,
        "Oregon":239,
        "Nevada":231,
        "Maryland":226,
        "New Hampshire":225,
        "Arizona":213,
        "Massachusetts":209,
        "Vermont":206,
        "Florida":205,
        "Connecticut":202,
        "California":199,
        "Hawaii":198,
        "New York":185,
        "Rhode Island":176
    }



    var map = {
      'AK': 'Alaska',
      'AL': 'Alabama',
      'AR': 'Arkansas',
      'AS': 'American Samoa',
      'AZ': 'Arizona',
      'CA': 'California',
      'CO': 'Colorado',
      'CT': 'Connecticut',
      'DC': 'District of Columbia',
      'DE': 'Delaware',
      'FL': 'Florida',
      'GA': 'Georgia',
      'GU': 'Guam',
      'HI': 'Hawaii',
      'IA': 'Iowa',
      'ID': 'Idaho',
      'IL': 'Illinois',
      'IN': 'Indiana',
      'KS': 'Kansas',
      'KY': 'Kentucky',
      'LA': 'Louisiana',
      'MA': 'Massachusetts',
      'MD': 'Maryland',
      'ME': 'Maine',
      'MI': 'Michigan',
      'MN': 'Minnesota',
      'MO': 'Missouri',
      'MP': 'Northern Mariana Islands',
      'MS': 'Mississippi',
      'MT': 'Montana',
      'NA': 'National',
      'NC': 'North Carolina',
      'ND': 'North Dakota',
      'NE': 'Nebraska',
      'NH': 'New Hampshire',
      'NJ': 'New Jersey',
      'NM': 'New Mexico',
      'NV': 'Nevada',
      'NY': 'New York',
      'OH': 'Ohio',
      'OK': 'Oklahoma',
      'OR': 'Oregon',
      'PA': 'Pennsylvania',
      'PR': 'Puerto Rico',
      'RI': 'Rhode Island',
      'SC': 'South Carolina',
      'SD': 'South Dakota',
      'TN': 'Tennessee',
      'TX': 'Texas',
      'UT': 'Utah',
      'VA': 'Virginia',
      'VI': 'Virgin Islands',
      'VT': 'Vermont',
      'WA': 'Washington',
      'WI': 'Wisconsin',
      'WV': 'West Virginia',
      'WY': 'Wyoming'
    }
    var map2 = {
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
      "<tr><td>" + ("Production: ") + "</td><td>"+(states2[map2[data]])+"</td></tr>"+
      "</table>";
  }

    var sampleData ={};
    ["HI", "AK", "FL", "SC", "GA", "AL", "NC", "TN", "RI", "CT", "MA",
    "ME", "NH", "VT", "NY", "NJ", "PA", "DE", "MD", "WV", "KY", "OH",
    "MI", "WY", "MT", "ID", "WA", "DC", "TX", "CA", "AZ", "NV", "UT",
    "CO", "NM", "OR", "ND", "SD", "NE", "IA", "MS", "IN", "IL", "MN",
    "WI", "MO", "AR", "OK", "KS", "LA", "VA"]
      .forEach(function(d){
        console.log("SHA REN", d)
        var p = states[d];
        p = states[map[d]]


        sampleData[d]={parks: p,
                       color:d3.interpolate("white", "blue")(p/897)};
      });

    /* draw states on id #statesvg */
    uStates.draw("#statesvg", sampleData, tooltipHtml);

    d3.select(window.frameElement).style("height", "600px");


  }



  render() {

    var s = this.state['states']
    console.log(s, "JE::LOO")
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
