import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import { CardActionArea, CardMedia, Typography, CardContent, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

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
import Form from 'react-bootstrap/Form';

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

class Country extends Component {

    constructor(props) {
      super(props);
      this.tmp_props = props;

      this.state = {
          activePage: 1,
          info: undefined,
          shownIdx: [0, 1, 2, 3, 4, 5, 6, 7, 8]
      };

      this.handlePageChange = this.handlePageChange.bind(this);
      // this.handleFilter = this.handleFilter.bind(this);
    }

    componentDidMount() {
      document.title = "Country";
      fetch('https://www.energenius.me/api/country?name=all')
          .then(response => response.json())
          .then(data => this.setState({info: data}));
    }

    handlePageChange(pageNumber) {
     const start_idx = (pageNumber - 1) * 9;
     this.setState({activePage: pageNumber,
         shownIdx: [start_idx, start_idx + 1, start_idx + 2,
             start_idx + 3, start_idx + 4, start_idx + 5,
             start_idx + 6, start_idx + 7, start_idx + 8]});
    }

    handleFilter(event) {
        event.preventDefault();
        const form = event.currentTarget;

        var checkedRegion = []
        for (var i in form["Region"]) {
            if (form["Region"][i].checked) {
                checkedRegion.push(String(form["Region"][i].id));
            }
        }

        var checkedPopulation = []
        for (var i in form["Population"]) {
            if (form["Population"][i].checked) {
                checkedPopulation.push(String(form["Population"][i].id));
            }
        }

        var checkedProd = []
        for (var i in form["Total_Production"]) {
            if (form["Total_Production"][i].checked) {
                checkedProd.push(String(form["Total_Production"][i].id));
            }
        }

        var api = "";
        if (checkedRegion.length == 0 || checkedRegion.length == 7) {
            api += "Region=all";
        } else {
            api += "Region=";
            api += checkedRegion.join("|");
        }
        api += "&";

        if (checkedPopulation.length == 0 || checkedPopulation.length == 3) {
            api += "Population=all";
        } else {
            api += "Population=";
            api += checkedPopulation.join("|");
        }

        api += "&";
        if (checkedProd.length == 0 || checkedProd.length == 3) {
            api += "Total_Production=all";
        } else {
            api += "Total_Production=";
            api += checkedProd.join("|");
        }

        console.log("https://www.energenius.me/api/country?" + api);

    }

    render() {
        if (this.state.info === undefined) {
            return (<div>Loading</div>)
        }

        const { classes } = this.tmp_props;

        return (
            <React.Fragment>
              <CssBaseline />

              <main>


              <DropdownButton id="dropdown-item-button" title="Filter">
                <Dropdown.Item as="button"><Form.Check
                  type={'checkbox'}
                  id={'Type'}
                  name={'Type'}
                  label={'Physical Energy'}
                /></Dropdown.Item>
                <Dropdown.Item as="button"><Form.Check
                  type={'checkbox'}
                  id={'Type'}
                  name={'Type'}
                  label={'Non-Renewable Energy'}
                /></Dropdown.Item>
                <Dropdown.Item as="button"><Form.Check
                  type={'checkbox'}
                  id={'Type'}
                  name={'Type'}
                  label={'Reneable Energy'}
                /></Dropdown.Item>
              </DropdownButton>

              {/* Hero unit */}

              <div class="row">
              <div class="col-md-10">

              <div className={classNames(classes.layout, classes.cardGrid)}>
                {/* End hero unit */}

                <Grid container spacing={40}>
                  <CssBaseline />
                  {this.state.shownIdx.map(idx => (
                    <Grid item key={"card"}>
                        <Link to={'/country/'+this.state.info[idx]['Name']}>
                        <Card className={classes.card}>
                            <CardMedia
                            className={classes.cardMedia}

                            image={require('../img/country/cover_photo/'+this.state.info[idx]['API']+'.jpg')}

                            title={this.state.info[idx]['Name']+" Image"}
                            />
                            <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {this.state.info[idx]['Name']}
                            </Typography>
                            <Typography>
                                <ul>

                                    <li><b>Region: </b>{this.state.info[idx]['Region']}</li>
                                    <li><b>Population: </b>{this.state.info[idx]['Population']}</li>
                                    <li><b>Total Production: </b>{this.state.info[idx]['Total_Production']}</li>
                                    <li><b>Total Usage: </b>{this.state.info[idx]['Total_Usage']}</li>
                                    <li><b>Energy Shortage: </b>{this.state.info[idx]['Energy_Shortage']}</li>

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
            itemsCountPerPage={10}
            totalItemsCount={30}
            pageRangeDisplayed={3}
            innerClass="pagination justify-content-center"
            linkClass="page-link"
            itemClass="page-item"
            onChange={this.handlePageChange}
            />
            </div>
            </div>

            <aside class="col-md-2">
            <Form noValidate onSubmit={this.handleFilter}>
                <Form.Label>Region</Form.Label>
                <div key={'type'} className="mb-3">
                  <Form.Check type={'checkbox'} id={'Africa'} name={'Region'} label={'Africa'} />
                  <Form.Check type={'checkbox'} id={'Asia'} name={'Region'} label={'Asia'} />
                  <Form.Check type={'checkbox'} id={'Europe'} name={'Region'} label={'Europe'} />
                  <Form.Check type={'checkbox'} id={'Latin America'} name={'Region'} label={'Latin America'} />
                  <Form.Check type={'checkbox'} id={'Middle East'} name={'Region'} label={'Middle East'} />
                  <Form.Check type={'checkbox'} id={'North America'} name={'Region'} label={'North America'} />
                  <Form.Check type={'checkbox'} id={'Pacific'} name={'Region'} label={'Pacific'} />
                </div>

                <Form.Label>Population(Million)</Form.Label>
                <div key={'use'} className="mb-3">
                  <Form.Check type={'checkbox'} id={'0-100'} name={'Population'} label={'0-100'} />
                  <Form.Check type={'checkbox'} id={'100-500'} name={'Population'} label={'100-500'} />
                  <Form.Check type={'checkbox'} id={'>500'} name={'Population'} label={'>500'} />
                </div>

                <Form.Label>Total Production(bn kWh)</Form.Label>
                <div key={'country'} className="mb-3">
                  <Form.Check type={'checkbox'} id={'0-1000'} name={'Total_Production'} label={'0-1000'} />
                  <Form.Check type={'checkbox'} id={'1000-2000'} name={'Total_Production'} label={'1000-2000'} />
                  <Form.Check type={'checkbox'} id={'>2000'} name={'Total_Production'} label={'>2000'} />
                </div>
                <Button variant="outlined" color="primary" type="submit">Apply Filter</Button>
            </Form>

            </aside>
            </div>
            </main>

          </React.Fragment>
      );
    }
  }

export default withStyles(styles)(Country);
