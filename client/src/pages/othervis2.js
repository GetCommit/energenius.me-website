import React, {Component} from 'react';
import * as d3 from "d3";
import uStates from './uStates';
import './StateMap.css';


class othervis2 extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.drawChart = this.drawChart.bind(this);
  }

   componentDidMount() {

      fetch(
        'http://perfectfitforme-env.bdibh8r7gh.us-east-2.elasticbeanstalk.com/api/cities'
        )
        .then(response => response.json())
        .then(data => {
            this.state['states'] = data
            this.setState({});

        })
        .catch(e => {
            console.log(e);
        })


  }

  drawChart(states) {
		const states2 = {
			"WA": [],
			"DE": [],
			"DC": [],
			"WI": [],
			"WV": [],
			"HI": [],
			"FL": [],
			"WY": [],
			"NH": [],
			"NJ": [],
			"NM": [],
			"TX": [],
			"LA": [],
			"NC": [],
			"ND": [],
			"NE": [],
			"TN": [],
			"NY": [],
			"PA": [],
			"RI": [],
			"NV": [],
			"VA": [],
			"CO": [],
			"AK": [],
			"AL": [],
			"AR": [],
			"VT": [],
			"IL": [],
			"GA": [],
			"IN": [],
			"IA": [],
			"MA": [],
			"AZ": [],
			"CA": [],
			"ID": [],
			"CT": [],
			"ME": [],
			"MD": [],
			"OK": [],
			"OH": [],
			"UT": [],
			"MO": [],
			"MN": [],
			"MI": [],
			"KS": [],
			"MT": [],
			"MS": [],
			"SC": [],
			"KY": [],
			"OR": [],
			"SD": []
		}


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
	
	for (const elem in states){
		const s = states[elem]['location']['state']
		s = map[s]
		const living = states[elem]['qualities']['cost of living']
		if (states2[s] !== undefined){
			states2[s].push(living)
		}
	}



	for (const elem in states2){
		if(states2[elem].length === 0){
			console.log('JYERE', states2[elem])

			states2[elem] = 1000
		}
		else{
			var total = 0;
			for(var i = 0; i < states2[elem].length; i++) {
					total += states2[elem][i];
			}
			var avg = total / states2[elem].length;
			states2[elem] = avg
		}
	}

	console.log(states2)
	states = states2
  function tooltipHtml(data){ /* function to create html content string in tooltip div. */
    return "<h4>"+data+"</h4><table>"+
      "<tr><td>" + ("Cost of living:  ") + "</td><td>"+(states[map[data]])+"</td></tr>"+
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
            color:d3.interpolate("red", "white")(p/10)};
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
        <p>Average Cost of living per state</p>
        <div id="tooltip"></div>
        <svg width="960" height="600" id="statesvg"></svg>
      </div>
    );

  }
}
export default othervis2;
