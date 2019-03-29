import React, { Component } from 'react'

export default class Instance extends Component {
  render() {
    return (
        <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="../index.html">Home</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">

                <li class="nav-item">
                    <a class="nav-link" href="../energy/energy.html">Energy Category</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="../production_usage/production_usage.html">Production and Usage</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="../country/country.html">Country of Consumption</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="../about.html">About Us</a>
                </li>

            </ul>
            <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
            </div>
        </nav>
      </div>
    )
  }
}
