
import React, { Component } from 'react';
import * as d3 from 'd3'
import {Tabs, Tab} from "react-bootstrap";



export default class othervis1 extends Component {
    constructor(props) {
      super(props);

      this.state = {
          visLoaded: false,
          vis: undefined
      };

    }


    componentDidMount() {
        fetch('http://perfectfitforme-env.bdibh8r7gh.us-east-2.elasticbeanstalk.com/api/jobs')
            .then(response => response.json())
            .then(data => this.setState({vis: data.Jobs}));

    }

    componentDidUpdate() {

        if (this.state.vis && !this.state.visLoaded) {
            this.state.visLoaded = true;
            this.rendervis();
        }
    }


    rendervis() {
        var data  = [];

        for (var i = 0; i < this.state.vis.length; i++) {
            var obj = {};
            obj.name = this.state.vis[i].id
            obj.edu = this.state.vis[i]["education"];
            obj.salary = this.state.vis[i]["annual salary"];

            data.push(obj);
        }

          data = data.sort(function (a, b) {
                     return d3.ascending(a.salary, b.salary);
          })


        //set up svg using margin conventions - we'll need plenty of room on the left for labels
        var margin = {
            top: 100, right: 0, bottom: 30, left: 100
        };

                 var width = 1000 - margin.left - margin.right,
                     height = 1000 - margin.top - margin.bottom;


        var x = d3.scaleBand()
    .domain(data.map(d => d.name))
    .range([margin.left, width - margin.right])
    .padding(0.1);

        var y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.salary)]).nice()
    .range([height - margin.bottom, margin.top])

        var color = {
        "No formal educational credential": "#98abc5",
        "High school diploma or equivalent": "#8a89a6",
        "Associate's degree": "#7b6888",
        "Bachelor's degree": "#6b486b",
        "Master's degree": "#a05d56",
        "Doctoral or professional degree": "#d0743c"};


        var xAxis =g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickSizeOuter(0));

        var yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove());

    var tmp = [{"edu":"No formal educational credential"},
{"edu":"High school diploma or equivalent"},
{"edu":"Associate's degree"},
{"edu":"Bachelor's degree"},
{"edu":"Master's degree"},
{"edu":"Doctoral or professional degree"}]

    var legend = svg => {
  const g = svg
      .attr("transform", `translate(${width},0)`)
      .attr("text-anchor", "end")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
    .selectAll("g")
    .data(tmp)
    .enter().append("g")
      .attr("transform", (d, i) => `translate(0,${i * 20})`);

      g.append("rect")
      .attr("x", -19)
      .attr("width", 19)
      .attr("height", 19)
        .style("fill", (d, i) => { return color[d.edu]; });

      g.append("text")
      .attr("x", -24)
      .attr("y", 9.5)
      .attr("dy", "0.35em")
        .text(function(d) { return d.edu; });
}


          var svg = d3.select("#vis").append("svg")
                     .attr("width", width + margin.left + margin.right)
                     .attr("height", height + margin.top + margin.bottom);


                     svg.append("g")
                    .selectAll("rect")
                    .data(data)
                    .join("rect")
                        .attr("fill", d => color[d.edu])
                      .attr("x", d => x(d.name))
                      .attr("y", d => y(d.salary))
                      .attr("height", d => y(0) - y(d.salary))
                      .attr("width", x.bandwidth());

                      svg.append("g")
                          .call(xAxis);

                      svg.append("g")
                          .call(yAxis);

                    svg.append("g")
                              .call(legend);
    }


    render() {
        if (this.state.vis === undefined ) {
            return (<div>Loading</div>)
        }

      return (
          <div>
              <h5 style={{padding:'2rem 25rem'}}>Salary Bar Graph Colored by Education Level</h5>
              <div id="vis" style={{paddingLeft: '10rem'}}></div>
            </div>

      )
    }
}
