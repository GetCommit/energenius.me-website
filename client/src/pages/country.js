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

  class Country extends Component {

      constructor(props) {
        super(props);
        this.countries = {
          'China':[
            'country/china/china1.png',
            {
              "Total Electricity Production":'5,883.00 bn kWh',
              "Total Electricity Usage":'5,564.00 bn kWh',
              "Energy Shortage":'0',
              "Rank by Renewable Energy Development":'1928',
              "Region":'Electric power',
              'API':'XXX'
              }


          ],

          'United States':[
              'country/usa/usa1.png',
              {
                "Total Electricity Production":'Coal',
                "Total Electricity Usage":'Nuclear Power',
                "Energy Shortage":'0',
                "Rank by Renewable Energy Development":'1928',
                "Region":'Electric power',
                'API':'XXX'
              }
          ],

          'Australia':[
              'country/australia/australia1.png',
              {
                "Type":'Usage',
                "Energy related":'Biomass',
                "CO2 emmision (million metric tons)":'0',
                "Year of Invention":'XXX',
                "Usage Field invovle":'Residential',
                'API':'XXX'
              }

          ],
          'Zambia':[
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

        'Germany':[
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

        'Haiti':[
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


        'Kuwait':[
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

        'India':[
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
        'Japan':[
          'production_usage/wind_turbine/windturbine1.jpg',
          {
            "Type":'Production',
            "Energy related":'Wind Power',
            "CO2 emmision (million metric tons)":'0',
            "Year of Invention":'1888',
            "Usage Field invovle":'Electric power',
            'API':'XXX'
          }
        ]
    };
        this.keys = Object.keys(this.countries);
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
                          <Link to={'/energy/'+this.countries[card][1]['API']}>
                          <Card className={classes.card}>
                              <CardMedia
                              className={classes.cardMedia}

                              image={require('../img/'+this.countries[card][0])}

                              title="Image title"
                              />
                              <CardContent className={classes.cardContent}>
                              <Typography gutterBottom variant="h5" component="h2">
                                  {card}
                              </Typography>
                              <Typography>
                                  <ul>

                                      <li><b>Type: </b>{this.countries[card][1]['Type']}</li>
                                      <li><b>Major Uses: </b>{this.countries[card][1]['Major Uses']}</li>
                                      <li><b>Consumption Rank in US: </b>{this.countries[card][1]['Consumption Rank in US']}</li>
                                      <li><b>Rank by electrical generating: </b>{this.countries[card][1]['Rank by electrical generating']}</li>
                                      <li><b>Top Producing country: </b>{this.countries[card][1]['Top Producing country']}</li>

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

export default withStyles(styles)(Country);
