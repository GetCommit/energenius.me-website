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
              "Total Production":'5,883.00 bn kWh',
              "Energy Shortage":'0 days/year',
              "Rank by Renewable Energy Development":'2',
              "Region":'Asia',
              "Population":"1386 Million",
              'API':'Energy_policy_of_China'
              }


          ],

          'United States':[
              'country/usa/usa1.png',
              {
                "Total Production":'4,095.00 bn kWh',
                "Energy Shortage":'0 days/year',
                "Rank by Renewable Energy Development":'6',
                "Region":'North America',
                "Population":"327.2 Million",
                'API':'Energy_in_the_United_States'
              }
          ],

          'Australia':[
              'country/australia/australia1.png',
              {
                "Total Production":'243.00 bn kWh',
                "Energy Shortage":'0 days/year',
                "Rank by Renewable Energy Development":'7',
                "Region":'Pacific',
                "Population":"24.6 Million",
                'API':'Energy_in_Australia'
              }

          ],
          'Zambia':[
            'country/zambia/zambia1.jpg',
            {
              "Total Production":'11.55 bn kWh',
              "Energy Shortage":'30 days/year',
              "Rank by Renewable Energy Development":'1',
              "Region":'Africa',
              "Population":"17.09 Million",
              'API':'Zambia'
            }
        ],

        'Germany':[
          'country/germany/germany1.jpg',
          {
            "Total Production":'612.80 bn kWh',
            "Energy Shortage":'0.23 days/year',
            "Rank by Renewable Energy Development":'3',
            "Region":'Europe',
            "Population":"82.79 Million",
            'API':'Renewable_energy_in_Germany'
          }
        ],

        'Haiti':[
          'country/haiti/haiti1.jpg',
          {
              "Total Production":'1.02 bn kWh',
              "Energy Shortage":'0 days/year',
              "Rank by Renewable Energy Development":'4',
              "Region":'Latin America',
              "Population":"10.98 Million",
              'API':'Electricity_sector_in_Haiti'
            }
        ],


        'Kuwait':[
          'country/kuwait/kuwait1.jpg',
          {
            "Total Production":'65.95 bn kWh',
            "Energy Shortage":'0 days/year',
            "Rank by Renewable Energy Development":'5',
            "Region":'Middle East',
            "Population":"4.137 Million",
            'API':'Energy_in_Kuwait'
          }
        ],

        'India':[
          'country/india/india1.jpg',
          {
            "Total Production":'1387 bn kWh',
            "Energy Shortage":'67.15 days/year',
            "Rank by Renewable Energy Development":'2',
            "Region":'Asia',
            "Population":"1339 Million",
            'API':'Energy_in_India'
          }
        ],
        'Japan':[
          'country/japan/japan1.jpg',
          {
            "Total Production":'1020.00 bn kWh',
            "Energy Shortage":'0 days/year',
            "Rank by Renewable Energy Development":'2',
            "Region":'Aisa',
            "Population":"126.8 Million",
            'API':'Energy_in_Japan'
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
                          <Link to={'/country/'+this.countries[card][1]['API']}>
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

                                      <li><b>Total Production: </b>{this.countries[card][1]['Total Production']}</li>
                                      <li><b>Energy Shortage: </b>{this.countries[card][1]['Energy Shortage']}</li>
                                      <li><b>Rank by Renewable Energy Development: </b>{this.countries[card][1]['Rank by Renewable Energy Development']}</li>
                                      <li><b>Region: </b>{this.countries[card][1]['Region']}</li>
                                      <li><b>Population: </b>{this.countries[card][1]['Population']}</li>

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
