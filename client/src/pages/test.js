import React, { Component } from 'react';
import * as d3 from 'd3';
import axios from 'axios';
import './css/BarChart.css';

//Bar graph for Organizations
class BarChart extends Component {

	constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      items: null,
    };
	}

	create () {
		const sample = [
		  {
		    city: 'TX',
		    value: this.state.items["TX"],
		    color: '#000000'
		  },
		  {
		    city: 'GA',
		    value: this.state.items["GA"],
		    color: '#00a2ee'
		  },
		  {
		    city: 'PA',
		    value: this.state.items["PA"],
		    color: '#fbcb39'
		  },
		  {
		    city: 'MA',
		    value: this.state.items["MA"],
		    color: '#007bc8'
		  },
		  {
		    city: 'WA',
		    value: this.state.items["WA"],
		    color: '#65cedb'
		  },
		  {
		    city: 'OH',
		    value: this.state.items["OH"],
		    color: '#ff6e52'
		  },
		  {
		    city: 'AZ',
		    value: this.state.items["AZ"],
		    color: '#f9de3f'
		  },
		  {
		    city: 'CA',
		    value: this.state.items["CA"],
		    color: '#5d2f8e'
		  },
		  {
		    city: 'OR',
		    value: this.state.items["OR"],
		    color: '#008fc9'
		  },
		  {
		    city: 'FL',
		    value: this.state.items["FL"],
		    color: '#507dca'
		  },
		  {
		    city: 'MD',
		    value: this.state.items["MD"],
		    color: '#507dca'
		  },
		  {
		    city: 'IN',
		    value: this.state.items["IN"],
		    color: '#507dca'
		  },
		  {
		    city: 'CT',
		    value: this.state.items["CT"],
		    color: '#507dca'
		  },
		  {
		    city: 'IL',
		    value: this.state.items["IL"],
		    color: '#507dca'
		  },
		  {
		    city: 'MT',
		    value: this.state.items["MT"],
		    color: '#507dca'
		  },
		  {
		    city: 'IA',
		    value: this.state.items["IA"],
		    color: '#507dca'
		  },
		  {
		    city: 'MO',
		    value: this.state.items["MO"],
		    color: '#507dca'
		  },
		  {
		    city: 'MI',
		    value: this.state.items["MI"],
		    color: '#507dca'
		  },
		  {
		    city: 'UT',
		    value: this.state.items["UT"],
		    color: '#507dca'
		  },
		  {
		    city: 'MO',
		    value: this.state.items["MO"],
		    color: '#507dca'
		  },
		  {
		    city: 'VA',
		    value: this.state.items["VA"],
		    color: '#507dca'
		  },
		  {
		    city: 'AL',
		    value: this.state.items["AL"],
		    color: '#507dca'
		  }
		];

	    const svg = d3.select('#bar-chart');
	    const svgContainer = d3.select('#container');

	    const margin = 80;
	    const width = 1000 - 2 * margin;
	    const height = 600 - 2 * margin;

	    const chart = svg.append('g')
	      .attr('transform', `translate(${margin}, ${margin})`);

	    const xScale = d3.scaleBand()
	      .range([0, width])
	      .domain(sample.map((s) => s.city))
	      .padding(0.4)

	    const yScale = d3.scaleLinear()
	      .range([height, 0])
	      .domain([0, 8]);

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
	      .data(sample)
	      .enter()
	      .append('g')

	    barGroups
	      .append('rect')
	      .attr('class', 'bar')
	      .attr('x', (g) => xScale(g.city))
	      .attr('y', (g) => yScale(g.value))
	      .attr('height', (g) => height - yScale(g.value))
	      .attr('width', xScale.bandwidth())

	    barGroups
	      .append('text')
	      .attr('class', 'value')
	      .attr('x', (a) => xScale(a.city) + xScale.bandwidth() / 2)
	      .attr('y', (a) => yScale(a.value) + 30)
	      .attr('text-anchor', 'middle')

	    svg
	      .append('text')
	      .attr('class', 'label')
	      .attr('x', -(height / 2) - margin)
	      .attr('y', margin / 2.4)
	      .attr('transform', 'rotate(-90)')
	      .attr('text-anchor', 'middle')
	      .text('Amount of Organizations')
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

    getOrgData() {
    	let statecounts = {};
	    axios.get('https://cors.io/?https://api.catastrophe.world/organizations/?page=1&per_page=40').then(response => {
	      response.data.forEach(organization => {
		      const name = organization.stateorprovince;
		      if (!(name in statecounts)) {
		        statecounts[name] = 0;
		      }
		      statecounts[name]++;
	    	});
	    	this.setState({isLoaded: true, items: statecounts});
	    });
	    return statecounts;
    }

    componentDidMount(){
    	this.getOrgData();
    }

    render () {
    	if(this.state.isLoaded)
    		this.create();
	    return (
			  <div id='container'>
			      <svg id="bar-chart"></svg>
			  </div>
			);
    }

}
export default BarChart;
