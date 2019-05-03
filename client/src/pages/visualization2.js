import React, { Component } from 'react';
import * as d3 from 'd3'
import {Tabs, Tab} from "react-bootstrap";



export default class Visualization2 extends Component {
    constructor(props) {
      super(props);

      this.state = {
          vis2Loaded: false,
          vis2: undefined
      };

    }


    componentDidMount() {
        fetch('https://www.energenius.me/api/country?name=all')
            .then(response => response.json())
            .then(data => this.setState({vis2: data}));

    }

    componentDidUpdate() {

        if (this.state.vis2 && !this.state.vis2Loaded) {
            this.state.vis2Loaded = true;
            this.renderVis2();
        }
    }


    renderVis2() {
        var data  = [];

        for (var i = 0; i < this.state.vis2.length; i++) {
            if (this.state.vis2[i].Name === "Wakanda") {
                continue;
            }
            var obj = {};
            obj.name = this.state.vis2[i].Name;
            obj.usage = -this.state.vis2[i].Total_Usage;
            obj.production = this.state.vis2[i].Total_Production - obj.usage;

            data.push(obj);
        }

          data = data.sort(function (a, b) {
                     return d3.ascending(b.production, a.production);
          })
          console.log(data);

          var series = d3.stack().keys(Object.keys(data[0]).slice(1))(data)

          console.log(series);

        //set up svg using margin conventions - we'll need plenty of room on the left for labels
        var margin = {
            top: 100, right: 0, bottom: 30, left: 100
        };

                 var width = 1000 - margin.left - margin.right,
                     height = 1000 - margin.top - margin.bottom;

        var x = d3.scaleLinear()
          .domain([-10000, 6000])
          .range([0, width]);

        var y = d3.scaleBand()
                .domain(data.map(d => d.name))
                .rangeRound([0, height])
                .padding(0.2);

        var color = d3.scaleOrdinal()
                    .domain(series.map(d => d.key))
                    .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), series.length).reverse())
                    .unknown("#ccc");


        var xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickSizeOuter(0))
    .call(g => g.selectAll(".domain").remove());

        var yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(null, "s"))
    .call(g => g.selectAll(".domain").remove());

    var legend = svg => {
  const g = svg
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
      .attr("transform", `translate(${width - margin.right},${margin.top})`)
    .selectAll("g")
    .data(series.slice().reverse())
    .join("g")
      .attr("transform", (d, i) => `translate(0,${i * 20})`);

  g.append("rect")
      .attr("x", -19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", d => color(d.key));

  g.append("text")
      .attr("x", -24)
      .attr("y", 9.5)
      .attr("dy", "0.35em")
      .text(d => d.key);
};

          var svg = d3.select("#vis").append("svg")
                     .attr("width", width + margin.left + margin.right)
                     .attr("height", height + margin.top + margin.bottom);


                     svg.append("g")
                        .selectAll("g")
                        .data(series)
                        .join("g")
                          .attr("fill", d => color(d.key))
                        .selectAll("rect")
                        .data(d => d)
                        .join("rect")
                          .attr("y", (d, i) => y(d.data.name))
                          .attr("x", d => x(Math.min(0, d[1])))
                          .attr("width", d => Math.abs(x(d[1]) - x(0)))
                          .attr("height", y.bandwidth());

                      svg.append("g")
                          .call(xAxis);

                      svg.append("g")
                          .call(yAxis);

                      svg.append("g")
                          .call(legend);
    }


    render() {
        if (this.state.vis2 === undefined ) {
            return (<div>Loading</div>)
        }

      return (
          <div>

              <div id="vis" style={{padding: '18rem'}}><p>Total Energy Production and Usage (bn kWh) of Countries</p></div>
            </div>

      )
    }
}
