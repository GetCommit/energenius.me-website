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



class Energy extends Component {

    constructor(props) {
      super(props);

      this.sates={}
      



      this.energies = {
                    'Solar Energy':[
                        'energy/solar/solar1.jpg',
                        {
                          "Type":'Reneable Energy',
                          "Major Uses":'Residential',
                          "Consumption Rank in US":'8',
                          "Rank by electrical generating":'2',
                          "Top Producing country":'China',
                          'API':'Solar_energy'
                        }


                    ],

                    'Nuclear Energy':[
                        'energy/nuclear/nuclear1.jpg',
                        {
                          "Type":'Non-Renewable Energy',
                          "Major Uses":'Electric power',
                          "Consumption Rank in US":'4',
                          "Rank by electrical generating":'5',
                          "Top Producing country":'US',
                          'API':'Nuclear_power'
                        }
                    ],

                     'Natural Gas':[
                        'energy/natural_gas/natural_gas1.jpg',
                        {
                          "Type":'Non-Renewable Energy',
                          "Major Uses":'Industrial',
                          "Consumption Rank in US":'2',
                          "Rank by electrical generating":'7',
                          "Top Producing country":'US',
                          'API':'Natural_gas'
                        }

                     ],
                    'Coal':[
                      'energy/coal/coal1.jpg',
                      {
                        "Type":'Non-Renewable Energy',
                        "Major Uses":'Electric power',
                        "Consumption Rank in US":'3',
                        "Rank by electrical generating":'6',
                        "Top Producing country":'Australia',
                        'API':'Coal'
                      }
                  ],

                   'Petroleum':[
                    'energy/petroleum/petroleum1.jpg',
                    {
                      "Type":'Non-Renewable Energy',
                      "Major Uses":'Transportation',
                      "Consumption Rank in US":'1',
                      "Rank by electrical generating":'9',
                      "Top Producing country":'US',
                      'API':'Petroleum'
                    }
                 ],

                  'Biomass':[
                      'energy/biomass/biomass1.jpg',
                      {
                        "Type":'Reneable Energy',
                        "Major Uses":'Residential',
                        "Consumption Rank in US":'5',
                        "Rank by electrical generating":'8',
                        "Top Producing country":'US',
                        'API':'Biomass'
                      }
                  ],


                  'Hydropower':[
                    'energy/hydropower/hydropower1.jpg',
                    {
                      "Type":'Reneable Energy',
                      "Major Uses":'Electric power',
                      "Consumption Rank in US":'6',
                      "Rank by electrical generating":'4',
                      "Top Producing country":'China',
                      'API':'Hydropower'
                    }
                ],

                    'Geothermal Energy':[
                      'energy/geothermal/geothermal1.jpg',
                      {
                        "Type":'Reneable Energy',
                        "Major Uses":'Electric power',
                        "Consumption Rank in US":'9',
                        "Rank by electrical generating":'3',
                        "Top Producing country":'US',
                        'API':'Geothermal_energy'
                      }
                  ],

                  'Wind Power':[
                    'energy/windpower/windpower1.jpg',
                    {
                      "Type":'Reneable Energy',
                      "Major Uses":'Electric power',
                      "Consumption Rank in US":'7',
                      "Rank by electrical generating":'1',
                      "Top Producing country":'France',
                      'API':'Wind_power'
                    }
                ],


            };
      this.keys = Object.keys(this.energies);
      this.usingKeys = this.keys.slice(0, 3);

      this.tmp_props = props;

      this.state = {
        activePage: 1
      };

      this.handlePageChange = this.handlePageChange.bind(this)
    }

    // fetch above data from API

    componentDidMount (){
      fetch(
          'https://www.energenius.me/api/energy?name=all'
      )
          .then(response => response.json())
          .then(data => {

              // var v = data['query']['pages'];
              // var keys = Object.keys(v);
              // this.states['result'] = data['query']['pages'][keys[0]]['extract'];
              console.log(data)
              console.log("HELLO WORLD")
          //   process the data
          this.setState({})
          })
          .catch(e => {
              console.log(e)
          })
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
                        <Link to={'/energy/'+this.energies[card][1]['API']}>
                        <Card className={classes.card}>
                            <CardMedia
                            className={classes.cardMedia}

                            image={require('../img/'+this.energies[card][0])}

                            title="Image title"
                            />
                            <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {card}
                            </Typography>
                            <Typography>
                                <ul>

                                    <li><b>Type: </b>{this.energies[card][1]['Type']}</li>
                                    <li><b>Major Uses: </b>{this.energies[card][1]['Major Uses']}</li>
                                    <li><b>Consumption Rank in US: </b>{this.energies[card][1]['Consumption Rank in US']}</li>
                                    <li><b>Rank by electrical generating: </b>{this.energies[card][1]['Rank by electrical generating']}</li>
                                    <li><b>Top Producing country: </b>{this.energies[card][1]['Top Producing country']}</li>

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
  export default withStyles(styles)(Energy);
