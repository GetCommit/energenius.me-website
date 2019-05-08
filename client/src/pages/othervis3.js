import React, { Component } from 'react';
import * as d3 from 'd3';
import axios from 'axios';
import './BarChart.css';

//Bar graph for Organizations
class othervis3 extends Component {

	constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      items: null,

      visLoaded: false,
      vis: undefined

    };
	}

    componentDidMount() {
        fetch('https://d1u00tbnbhznv0.cloudfront.net/api/events')
            .then(response => response.json())
            .then(data => this.setState({vis: data}));

            

    }

    componentDidUpdate() {

        if (this.state.vis && !this.state.visLoaded) {
            this.state.visLoaded = true;
            this.rendervis();
        }
    }

    
	rendervis () {
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


        console.log(this.state.vis)
        console.log('HELLo')
const data = [
		  {
		    population: 'TX',
		    value: 0,
		    color: '#000000'
		  },
		  {
		    population: 'GA',
		    value: 0,
		    color: '#00a2ee'
		  },
		  {
		    population: 'PA',
		    value: 0,
		    color: '#fbcb39'
		  },
		  {
		    population: 'MA',
		    value: 0,
		    color: '#007bc8'
		  },
		  {
		    population: 'WA',
		    value: 0,
		    color: '#65cedb'
		  },
		  {
		    population: 'OH',
		    value: 0,
		    color: '#ff6e52'
		  },
		  {
		    population: 'AZ',
		    value: 0,
		    color: '#f9de3f'
		  },
		  {
		    population: 'CA',
		    value: 0,
		    color: '#5d2f8e'
		  },
		  {
		    population: 'OR',
		    value: 0,
		    color: '#008fc9'
		  },
		  {
		    population: 'FL',
		    value: 0,
		    color: '#507dca'
		  },
		  {
		    population: 'MD',
		    value: 0,
		    color: '#507dca'
		  },
		  {
		    population: 'IN',
		    value: 0,
		    color: '#507dca'
		  },
		  {
		    population: 'CT',
		    value: 0,
		    color: '#507dca'
		  },
		  {
		    population: 'IL',
		    value: 0,
		    color: '#507dca'
		  },
		  {
		    population: 'MT',
		    value: 0,
		    color: '#507dca'
		  },
		  {
		    population: 'IA',
		    value: 0,
		    color: '#507dca'
		  },
		  {
		    population: 'MO',
		    value: 0,
		    color: '#507dca'
		  },
		  {
		    population: 'MI',
		    value: 0,
		    color: '#507dca'
		  },
		  {
		    population: 'UT',
		    value: 0,
		    color: '#507dca'
		  },
		  {
		    population: 'MO',
		    value: 0,
		    color: '#507dca'
		  },
		  {
		    population: 'VA',
		    value: 0,
		    color: '#507dca'
		  },
		  {
		    population: 'AL',
		    value: 0,
		    color: '#507dca'
		  }
		];


        for(const elem in this.state.vis){
            const state = this.state.vis[elem]['state']
            for (const i in data){
                if(data[i]['population'] == state){
                    data[i]['value']+=1
                }
            }

        }
  


	    const svg = d3.select('#bar-chart');
	    const svgContainer = d3.select('#container');

	    const margin = 80;
	    const width = 1000 - 2 * margin;
	    const height = 600 - 2 * margin;

	    const chart = svg.append('g')
	      .attr('transform', `translate(${margin}, ${margin})`);

	    const xScale = d3.scaleBand()
	      .range([0, width])
	      .domain(data.map((s) => s.population))
	      .padding(0.4)

	    const yScale = d3.scaleLinear()
	      .range([height, 0])
	      .domain([0, 100]);

	    const makeYLines = () => d3.axisLeft()
	      .scale(yScale)

	    chart.append('g')
	      .attr('transform', `translate(0, ${height})`)
	      .call(d3.axisBottom(xScale))
				.selectAll('text')
					.style("fill", "white")
					.style("font-size", "15px");

	    chart.append('g')
	      .call(d3.axisLeft(yScale))
				.selectAll('text')
					.style("fill", "white")
					.style("font-size", "15px");

	    chart.append('g')
	      .attr('class', 'grid')
	      .call(makeYLines()
	        .tickSize(-width, 0, 0)
	        .tickFormat('')
	      )

	    const barGroups = chart.selectAll()
	      .data(data)
	      .enter()
	      .append('g')

	    barGroups
	      .append('rect')
	      .attr('class', 'bar')
	      .attr('x', (g) => xScale(g.population))
	      .attr('y', (g) => yScale(g.value))
	      .attr('height', (g) => height - yScale(g.value))
	      .attr('width', xScale.bandwidth())

	    barGroups
	      .append('text')
	      .attr('class', 'value')
	      .attr('x', (a) => xScale(a.population) + xScale.bandwidth() / 2)
	      .attr('y', (a) => yScale(a.value) + 30)
	      .attr('text-anchor', 'middle')

	    svg
	      .append('text')
	      .attr('class', 'label')
	      .attr('x', -(height / 2) - margin)
	      .attr('y', margin / 2.4)
	      .attr('transform', 'rotate(-90)')
	      .attr('text-anchor', 'middle')
	      .text('Number of events by state')
					.style("font-size", "20px");

	    svg.append('text')
	      .attr('class', 'label')
	      .attr('x', width / 2 + margin)
	      .attr('y', height + margin * 1.7)
	      .attr('text-anchor', 'middle')
	      .text('States')
					.style("font-size", "20px");

	    svg.append('text')
	      .attr('class', 'source')
	      .attr('x', width / 5 * 4.3)
	      .attr('y', height + margin * 1.8)
	      .attr('text-anchor', 'start')
	      .text('(Any States not listed have no organizations headquartered)')
					.style("font-size", "10px");



	}


    render () {
    	if(this.state.isLoaded)
    		this.rendervis();
	    return (
				<div>
					
					<div id='container'>
							<h5 style={{paddingTop:'1rem', paddingLeft:'30rem',color:'white'} }>Population Density</h5>
							<svg id="bar-chart"></svg>
					</div>
				</div>
			);
    }

}
export default othervis3;

