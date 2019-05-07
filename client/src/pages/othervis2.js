import React, { Component } from 'react';
import * as d3 from 'd3';
import axios from 'axios';
import './BarChart.css';

//Bar graph for Organizations
class othervis2 extends Component {

	constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      items: null,

      visLoaded: false,
      vis: undefined
      
    };
	}

	rendervis () {
		const sample = [
		  {
		    language: 'TX',
		    value: this.state.items["TX"],
		    color: '#000000'
		  },
		  {
		    language: 'GA',
		    value: this.state.items["GA"],
		    color: '#00a2ee'
		  },
		  {
		    language: 'PA',
		    value: this.state.items["PA"],
		    color: '#fbcb39'
		  },
		  {
		    language: 'MA',
		    value: this.state.items["MA"],
		    color: '#007bc8'
		  },
		  {
		    language: 'WA',
		    value: this.state.items["WA"],
		    color: '#65cedb'
		  },
		  {
		    language: 'OH',
		    value: this.state.items["OH"],
		    color: '#ff6e52'
		  },
		  {
		    language: 'AZ',
		    value: this.state.items["AZ"],
		    color: '#f9de3f'
		  },
		  {
		    language: 'CA',
		    value: this.state.items["CA"],
		    color: '#5d2f8e'
		  },
		  {
		    language: 'OR',
		    value: this.state.items["OR"],
		    color: '#008fc9'
		  },
		  {
		    language: 'FL',
		    value: this.state.items["FL"],
		    color: '#507dca'
		  },
		  {
		    language: 'MD',
		    value: this.state.items["MD"],
		    color: '#507dca'
		  },
		  {
		    language: 'IN',
		    value: this.state.items["IN"],
		    color: '#507dca'
		  },
		  {
		    language: 'CT',
		    value: this.state.items["CT"],
		    color: '#507dca'
		  },
		  {
		    language: 'IL',
		    value: this.state.items["IL"],
		    color: '#507dca'
		  },
		  {
		    language: 'MT',
		    value: this.state.items["MT"],
		    color: '#507dca'
		  },
		  {
		    language: 'IA',
		    value: this.state.items["IA"],
		    color: '#507dca'
		  },
		  {
		    language: 'MO',
		    value: this.state.items["MO"],
		    color: '#507dca'
		  },
		  {
		    language: 'MI',
		    value: this.state.items["MI"],
		    color: '#507dca'
		  },
		  {
		    language: 'UT',
		    value: this.state.items["UT"],
		    color: '#507dca'
		  },
		  {
		    language: 'MO',
		    value: this.state.items["MO"],
		    color: '#507dca'
		  },
		  {
		    language: 'VA',
		    value: this.state.items["VA"],
		    color: '#507dca'
		  },
		  {
		    language: 'AL',
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
	      .domain(sample.map((s) => s.language))
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
	      .attr('x', (g) => xScale(g.language))
	      .attr('y', (g) => yScale(g.value))
	      .attr('height', (g) => height - yScale(g.value))
	      .attr('width', xScale.bandwidth())

	    barGroups
	      .append('text')
	      .attr('class', 'value')
	      .attr('x', (a) => xScale(a.language) + xScale.bandwidth() / 2)
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
    		this.rendervis();
	    return (
			  <div id='container'>
			      <svg id="bar-chart"></svg>
			  </div>
			);
    }

}
export default othervis2;



// import React, { Component } from 'react';
// import * as d3 from 'd3'
// import {Tabs, Tab} from "react-bootstrap";
// import axios from 'axios';
// import './BarChart.css';


// export default class othervis2 extends Component {
//     constructor(props) {
//       super(props);

//       this.state = {
//           visLoaded: false,
//           vis: undefined,
//           isLoaded: false,
//           items: null
//       };

//     }





//     componentDidMount() {
//         fetch('http://perfectfitforme-env.bdibh8r7gh.us-east-2.elasticbeanstalk.com/api/cities')
//             .then(response => response.json())
//             .then(data => this.setState({vis: data}));

//     }

//     componentDidUpdate() {

//         if (this.state.vis && !this.state.visLoaded) {
//             this.state.visLoaded = true;
//             this.rendervis();

//         }
//     }





// 	rendervis () {
//         console.log(this.state.vis['Anchorage'], "HELLO")

//         const sample = []

//         for (const elem in this.state.vis) {
//             sample.push(
//                 {
//                     city: this.state.vis[elem]['population'],
//                     value: 10,
//                     color: '#507dca'

//                 }
//             )
//         }
//         console.log(sample)

// 		// const sample = [
// 		//   {
// 		//     city: 'TX',
// 		//     value: this.state.items["TX"],
// 		//     color: '#000000'
// 		//   },
// 		//   {
// 		//     city: 'GA',
// 		//     value: this.state.items["GA"],
// 		//     color: '#00a2ee'
// 		//   },
// 		//   {
// 		//     city: 'PA',
// 		//     value: this.state.items["PA"],
// 		//     color: '#fbcb39'
// 		//   },
// 		//   {
// 		//     city: 'MA',
// 		//     value: this.state.items["MA"],
// 		//     color: '#007bc8'
// 		//   },
// 		//   {
// 		//     city: 'WA',
// 		//     value: this.state.items["WA"],
// 		//     color: '#65cedb'
// 		//   },
// 		//   {
// 		//     city: 'OH',
// 		//     value: this.state.items["OH"],
// 		//     color: '#ff6e52'
// 		//   },
// 		//   {
// 		//     city: 'AZ',
// 		//     value: this.state.items["AZ"],
// 		//     color: '#f9de3f'
// 		//   },
// 		//   {
// 		//     city: 'CA',
// 		//     value: this.state.items["CA"],
// 		//     color: '#5d2f8e'
// 		//   },
// 		//   {
// 		//     city: 'OR',
// 		//     value: this.state.items["OR"],
// 		//     color: '#008fc9'
// 		//   },
// 		//   {
// 		//     city: 'FL',
// 		//     value: this.state.items["FL"],
// 		//     color: '#507dca'
// 		//   },
// 		//   {
// 		//     city: 'MD',
// 		//     value: this.state.items["MD"],
// 		//     color: '#507dca'
// 		//   },
// 		//   {
// 		//     city: 'IN',
// 		//     value: this.state.items["IN"],
// 		//     color: '#507dca'
// 		//   },
// 		//   {
// 		//     city: 'CT',
// 		//     value: this.state.items["CT"],
// 		//     color: '#507dca'
// 		//   },
// 		//   {
// 		//     city: 'IL',
// 		//     value: this.state.items["IL"],
// 		//     color: '#507dca'
// 		//   },
// 		//   {
// 		//     city: 'MT',
// 		//     value: this.state.items["MT"],
// 		//     color: '#507dca'
// 		//   },
// 		//   {
// 		//     city: 'IA',
// 		//     value: this.state.items["IA"],
// 		//     color: '#507dca'
// 		//   },
// 		//   {
// 		//     city: 'MO',
// 		//     value: this.state.items["MO"],
// 		//     color: '#507dca'
// 		//   },
// 		//   {
// 		//     city: 'MI',
// 		//     value: this.state.items["MI"],
// 		//     color: '#507dca'
// 		//   },
// 		//   {
// 		//     city: 'UT',
// 		//     value: this.state.items["UT"],
// 		//     color: '#507dca'
// 		//   },
// 		//   {
// 		//     city: 'MO',
// 		//     value: this.state.items["MO"],
// 		//     color: '#507dca'
// 		//   },
// 		//   {
// 		//     city: 'VA',
// 		//     value: this.state.items["VA"],
// 		//     color: '#507dca'
// 		//   },
// 		//   {
// 		//     city: 'AL',
// 		//     value: this.state.items["AL"],
// 		//     color: '#507dca'
// 		//   }
// 		// ];

// 	    const svg = d3.select('#bar-chart');
// 	    const svgContainer = d3.select('#container');

// 	    const margin = 80;
// 	    const width = 1000 - 2 * margin;
// 	    const height = 600 - 2 * margin;

// 	    const chart = svg.append('g')
// 	      .attr('transform', `translate(${margin}, ${margin})`);

// 	    const xScale = d3.scaleBand()
// 	      .range([0, width])
// 	      .domain(sample.map((s) => s.city))
// 	      .padding(0.4)

// 	    const yScale = d3.scaleLinear()
// 	      .range([height, 0])
// 	      .domain([0, 8]);

// 	    const makeYLines = () => d3.axisLeft()
// 	      .scale(yScale)

// 	    chart.append('g')
// 	      .attr('transform', `translate(0, ${height})`)
// 	      .call(d3.axisBottom(xScale))
// 				.selectAll('text')
// 					.style("fill", "white")
// 					.style("font-size", "15px");

// 	    chart.append('g')
// 	      .call(d3.axisLeft(yScale))
// 				.selectAll('text')
// 					.style("fill", "white")
// 					.style("font-size", "15px");

// 	    chart.append('g')
// 	      .attr('class', 'grid')
// 	      .call(makeYLines()
// 	        .tickSize(-width, 0, 0)
// 	        .tickFormat('')
// 	      )

// 	    const barGroups = chart.selectAll()
// 	      .data(sample)
// 	      .enter()
// 	      .append('g')

// 	    barGroups
// 	      .append('rect')
// 	      .attr('class', 'bar')
// 	      .attr('x', (g) => xScale(g.city))
// 	      .attr('y', (g) => yScale(g.value))
// 	      .attr('height', (g) => height - yScale(g.value))
// 	      .attr('width', xScale.bandwidth())

// 	    barGroups
// 	      .append('text')
// 	      .attr('class', 'value')
// 	      .attr('x', (a) => xScale(a.city) + xScale.bandwidth() / 2)
// 	      .attr('y', (a) => yScale(a.value) + 30)
// 	      .attr('text-anchor', 'middle')

// 	    svg
// 	      .append('text')
// 	      .attr('class', 'label')
// 	      .attr('x', -(height / 2) - margin)
// 	      .attr('y', margin / 2.4)
// 	      .attr('transform', 'rotate(-90)')
// 	      .attr('text-anchor', 'middle')
// 	      .text('Amount of Organizations')
// 					.style("font-size", "20px");

// 	    svg.append('text')
// 	      .attr('class', 'label')
// 	      .attr('x', width / 2 + margin)
// 	      .attr('y', height + margin * 1.7)
// 	      .attr('text-anchor', 'middle')
// 	      .text('States')
// 					.style("font-size", "20px");

// 	    svg.append('text')
// 	      .attr('class', 'source')
// 	      .attr('x', width / 5 * 4.3)
// 	      .attr('y', height + margin * 1.8)
// 	      .attr('text-anchor', 'start')
// 	      .text('(Any States not listed have no organizations headquartered)')
// 					.style("font-size", "10px");

// 	}


//     render() {
//         if (this.state.vis === undefined ) {
//             return (<div>Loading</div>)
//         }

//       return (
//           <div>

//               <div id="bar-chart" style={{paddingLeft: '10rem'}}><p>Salary Bar Graph Colored by Education Level</p></div>
//             </div>

//       )
//     }
// }
