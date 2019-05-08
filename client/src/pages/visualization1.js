import React, { Component } from 'react';
import * as d3 from 'd3'
import {Tabs, Tab} from "react-bootstrap";



export default class Visualization1 extends Component {
    constructor(props) {
      super(props);

      this.state = {
          vis1Loaded: false,
          vis1: undefined
      };

    }


    componentDidMount() {
        fetch('/api/production?name=all')
            .then(response => response.json())
            .then(data => this.setState({vis1: data}));
    }

    componentDidUpdate() {
        if (this.state.vis1 && !this.state.vis1Loaded) {
            this.state.vis1Loaded = true;
            this.renderVis1();
        }
    }


    renderVis1() {
        var data  = {"name": "Production and Usage", "children": []};

        for (var i = 0; i < this.state.vis1.length; i++) {
            var obj = {};
            obj.name = this.state.vis1[i].Name;
            obj.value = this.state.vis1[i].Carbon_Emission + 100;

            data["children"].push(obj);
        }

        var color = d3.scaleLinear()
        .domain([0, 5])
        .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
        .interpolate(d3.interpolateHcl);

          var rootNode = d3.hierarchy(data);
          var packLayout = d3.pack();
          packLayout.size([1000, 1000]);
          packLayout.padding(100)

          rootNode.sum(function(d) {
            return d.value;
          });

          packLayout(rootNode);

          var margin = {
             top: 100, right: 0, bottom: 30, left: 200
          };

        var width = 1500 - margin.left - margin.right,
        height = 1500 - margin.top - margin.bottom;

        var svg = d3.select("#vis").append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

              svg.append("text")
                      .attr("x", (width / 2 - 150))
                      .attr("y", 0 - (margin.top / 2))
                      .attr("text-anchor", "middle")
                      .style("font-size", "20px")
                      .text("Carbon Emission of Energy Production and Usage");

          var nodes = d3.select("#vis svg g")
          .selectAll('g')
          .data(rootNode.descendants())
          .enter()
          .append('g')
          .attr('transform', function(d) {return 'translate(' + [d.x, d.y] + ')'})

        nodes
          .append('circle')
          .attr('r', function(d) { return d.r; })
            .attr("fill", d => color(d.height));

        nodes
        .append('text')
        .style("font", "10px sans-serif")
        .attr("text-anchor", "middle")
        .attr('dx', -nodes.length)
        .attr('dy', 4)
            .text(function(d) {
              return d.children === undefined ? d.data.name : '';
            })
    }



  render() {
      if (this.state.vis1 === undefined ) {
          return (<div>Loading</div>)
      }

    return (
        <div>
            <div id="vis"></div>
          </div>

    )
  }
}
