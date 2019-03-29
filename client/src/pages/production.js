  import React, { Component } from 'react'
  import Card from '@material-ui/core/Card';
  import { CardActionArea, CardMedia, Typography, CardContent, Grid } from '@material-ui/core';
  import { Link } from 'react-router-dom';
  import ReactDOM from "react-dom";
  import CssBaseline from "@material-ui/core/CssBaseline";
  import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

  import PropTypes from 'prop-types';
  import classNames from 'classnames';
  import AppBar from '@material-ui/core/AppBar';
  import Button from '@material-ui/core/Button';
  import CardActions from '@material-ui/core/CardActions';
  import Toolbar from '@material-ui/core/Toolbar';
  import { withStyles } from '@material-ui/core/styles';
  import ButtonBase from '@material-ui/core/ButtonBase';
  import Instance from './Instance.js'
  import Pagination from "react-js-pagination";

  const styles = theme => ({
      appBar: {
        position: 'relative',
      },
      icon: {
        marginRight: theme.spacing.unit * 2,
      },
      heroUnit: {
        backgroundColor: theme.palette.background.paper,
      },
      heroContent: {
        maxWidth: 600,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
      },
      heroButtons: {
        marginTop: theme.spacing.unit * 4,
      },
      layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
          width: 1100,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      },
      cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`,
      },
      card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
      cardMedia: {
        paddingTop: '56.25%', // 16:9
      },
      cardContent: {
        flexGrow: 1,
      },
      footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 6,
      },
    });

    // testing reading from directory



  class Production extends Component {

      constructor(props) {
        super(props);
        this.productions = {
                  'Hydraulic Fracturing':[
                      'production_usage/fracking/fracking1.jpg',
                      {
                        "Type":'Production',
                        "Energy related":'Natural Gas',
                        "CO2 emmision (million metric tons)":'1472',
                        "Year of Invention":'1865',
                        "Usage Field invovle":'Industrial',
                        'API':'XXX'
                      }
                  ],

                  'Medical':[
                      'production_usage/medical/medical1.jpg',
                      {
                        "Type":'Coal',
                        "Energy related":'Nuclear Power',
                        "CO2 emmision (million metric tons)":'0',
                        "Year of Invention":'1928',
                        "Usage Field invovle":'Electric power',
                        'API':'XXX'
                      }
                  ],

                  'Heating Residential':[
                      'production_usage/residential/residential1.jpg',
                      {
                        "Type":'Usage',
                        "Energy related":'Biomass',
                        "CO2 emmision (million metric tons)":'0',
                        "Year of Invention":'XXX',
                        "Usage Field invovle":'Residential',
                        'API':'XXX'
                      }

                  ],
                  'Coal Mining':[
                    'production_usage/coalmining/coalmine1.jpg',
                    {
                      "Type":'Production',
                      "Energy related":'Coal',
                      "CO2 emmision (million metric tons)":'1318',
                      "Year of Invention":'XXX',
                      "Usage Field invovle":'Electric power',
                      'API':'XXX'
                    }
                ],

                'Offshore Drilling':[
                  'production_usage/offshore_drilling/offshore1.jpg',
                  {
                    "Type":'Production',
                    "Energy related":'Petroleum',
                    "CO2 emmision (million metric tons)":'2338',
                    "Year of Invention":'1891',
                    "Usage Field invovle":'Transportation',
                    'API':'Offshore_drilling'
                  }
                ],

                'Lightning':[
                  'production_usage/lightning/lightning1.jpg',
                    {
                      "Type":'Usage',
                      "Energy related":'Solar Energy',
                      "CO2 emmision (million metric tons)":'0',
                      "Year of Invention":'1839',
                      "Usage Field invovle":'Residential',
                      'API':'XXX'
                    }
                ],


                'Wind Turbine':[
                  'production_usage/wind_turbine/windturbine1.jpg',
                  {
                    "Type":'Production',
                    "Energy related":'Wind Power',
                    "CO2 emmision (million metric tons)":'0',
                    "Year of Invention":'1888',
                    "Usage Field invovle":'Electric power',
                    'API':'XXX'
                  }
                ],

                  'Geothermal Electric Power Plant':[
                    'production_usage/geothermal_powerplant/geothermal1.jpg',
                    {
                      "Type":'Production',
                      "Energy related":'Geothermal Energy',
                      "CO2 emmision (million metric tons)":'X',
                      "Year of Invention":'9',
                      "Usage Field invovle":'Electric power',
                      'API':'Solar_energy'
                    }
                ],

                'Hydropower Plant':[
                  'production_usage/hydropower_plant/hydroplant1.jpg',
                  {
                    "Type":'Production',
                    "Energy related":'Hydropower',
                    "CO2 emmision (million metric tons)":'0',
                    "Year of Invention":'1831',
                    "Usage Field invovle":'Electric power',
                    'API':'Solar_energy'
                  }
                ],


          };
        this.keys = Object.keys(this.productions);
        this.usingKeys = this.keys.slice(0, 3);

        this.tmp_props = props;

        this.state = {
          activePage: 1
        };

        this.handlePageChange = this.handlePageChange.bind(this)
      }

      handlePageChange(pageNumber){
        const start_idx = (pageNumber - 1) * 3;
        this.usingKeys = this.keys.slice(start_idx, start_idx + 3);
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
      }

      render() {
      const { classes } = this.tmp_props;

        return (
            <React.Fragment>
              <CssBaseline />

              <main>

                {/* Hero unit */}

                <div className={classNames(classes.layout, classes.cardGrid)}>
                  {/* End hero unit */}

                  <Grid container spacing={40}>
                    <CssBaseline />
                    {this.usingKeys.map(card => (
                      <Grid item key={"card"}>
                          <Link to={'/energy/'+this.productions[card][1]['API']}>
                          <Card className={classes.card}>
                              <CardMedia
                              className={classes.cardMedia}

                              image={require('../img/'+this.productions[card][0])}

                              title="Image title"
                              />
                              <CardContent className={classes.cardContent}>
                              <Typography gutterBottom variant="h5" component="h2">
                                  {card}
                              </Typography>
                              <Typography>
                                  <ul>
                                      <li><b>Type: </b>{this.productions[card][1]['Type']}</li>
                                      <li><b>Major Uses: </b>{this.productions[card][1]['Energy related']}</li>
                                      <li><b>Consumption Rank in US: </b>{this.productions[card][1]['CO2 emmision (million metric tons)']}</li>
                                      <li><b>Rank by electrical generating: </b>{this.productions[card][1]['Year of Invention']}</li>
                                      <li><b>Top Producing country: </b>{this.productions[card][1]['Usage Field invovle']}</li>

                                  </ul>
                              </Typography>
                              </CardContent>
                              <CardActions>
                              <Button size="small" color="primary">
                                  Continue Reading
                              </Button>
                              </CardActions>
                          </Card>

                          </Link>


                      </Grid>

                    ))}

                  </Grid>
              </div>

              <div>
              <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={3}
              totalItemsCount={9}
              pageRangeDisplayed={3}
              innerClass="pagination justify-content-center"
              linkClass="page-link"
              itemClass="page-item"
              onChange={this.handlePageChange}
              />
              </div>
              </main>

            </React.Fragment>
        );
      }
    }
    export default withStyles(styles)(Production);
