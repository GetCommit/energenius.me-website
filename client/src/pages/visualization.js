import React, { Component } from 'react';
import * as d3 from 'd3'
// import DocumentTitle from 'react-document-title/DocumentTitle';

export default class Visualization extends Component {
    constructor(props) {
      super(props);

      this.state = {
          vis1: undefined,
          vis2: undefined
      };

    }


    componentDidMount() {
        document.title = "Production and Usage";
        fetch('https://www.energenius.me/api/production?name=all')
            .then(response => response.json())
            .then(data => this.setState({vis1: data}));


    }

    componentDidUpdate() {
        if (this.state.vis1) {
            this.renderVis1();
        }
    }


    renderVis2() {
        var data = [
            {
              "name": "Vibranium",
              "value": 100
            },
            {
              "name": "Gasoline",
              "value": 35
            },
            {
              "name": "Nuclear Power",
              "value": 230
            },
            {
              "name": "Coal",
              "value": 42
            },
            {
              "name": "Petroleum",
              "value": 37
            },
            {
              "name": "Natural Gas",
              "value": 90
            }
          ];
          data = data.sort(function (a, b) {
                     return d3.ascending(b.value, a.value);
                 })

                 //set up svg using margin conventions - we'll need plenty of room on the left for labels
                 var margin = {
                    top: 20, right: 0, bottom: 30, left: 100
                 };

                 var width = 1000 - margin.left - margin.right,
                     height = 1000 - margin.top - margin.bottom;

          var svg = d3.select("#vis2").append("svg")
                     .attr("width", width + margin.left + margin.right)
                     .attr("height", height + margin.top + margin.bottom)
                     .append("g")
                     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                     var x = d3.scaleBand()
                 .domain(data.map(d => d.name))
                 .range([margin.left, width - margin.right])
                 .padding(0.1);


        var y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)]).nice()
    .range([height - margin.bottom, margin.top]);

                 //make y axis to show bar names
                 var xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickSizeOuter(0));

                 var yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove());
                 svg.append("g")
      .attr("fill", "steelblue")
    .selectAll("rect")
    .data(data)
    .join("rect")
      .attr("x", d => x(d.name))
      .attr("y", d => y(d.value))
      .attr("height", d => y(0) - y(d.value))
      .attr("width", x.bandwidth());

                      svg.append("g")
                           .call(xAxis);

                       svg.append("g")
                           .call(yAxis);
    }

    renderVis1() {
        var data  = {"name": "Production and Usage", "children": []};

        for (var i = 0; i < this.state.vis1.length; i++) {
            var obj = {};
            obj.name = this.state.vis1[i].Name;
            obj.value = this.state.vis1[i].Carbon_Emission / 7 + 70;

            data["children"].push(obj);
        }

        var color = d3.scaleLinear()
        .domain([0, 5])
        .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
        .interpolate(d3.interpolateHcl);

          var rootNode = d3.hierarchy(data);
          var packLayout = d3.pack();
          packLayout.size([1000, 1000]);
          packLayout.padding(10)

          rootNode.sum(function(d) {
            return d.value;
          });

          packLayout(rootNode);

          var margin = {
             top: 20, right: 0, bottom: 30, left: 100
          };

        var width = 1500 - margin.left - margin.right,
              height = 1500 - margin.top - margin.bottom;

        var svg = d3.select("#vis1").append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


          var nodes = d3.select("#vis1 svg g")
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
      if (this.state.vis1 === undefined) {
          return (<div>Loading</div>)
      }
    return (
    <div>

    <div id="vis1"></div>

    <div id="vis2"></div>

    </div>
    )
  }
}
