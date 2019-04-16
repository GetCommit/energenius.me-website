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
      this.tmp_props = props;

      this.state = {
          activePage: 1,
          info: undefined,
          shownIdx: [0, 1, 2, 3, 4, 5, 6, 7, 8]
      };

      this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount() {
      document.title = "Production and Usage";
      fetch('https://www.energenius.me/api/production?name=all')
          .then(response => response.json())
          .then(data => this.setState({info: data}));
    }

    handlePageChange(pageNumber) {
     const start_idx = (pageNumber - 1) * 3;
     console.log(`active page is ${pageNumber}`);
     this.setState({activePage: pageNumber,
         shownIdx: [start_idx, start_idx + 1, start_idx + 2,
             start_idx + 3, start_idx + 4, start_idx + 5,
             start_idx + 6, start_idx + 7, start_idx + 8]});
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

              {/* Hero unit */}

              <div className={classNames(classes.layout, classes.cardGrid)}>
                {/* End hero unit */}

                <Grid container spacing={40}>
                  <CssBaseline />
                  {this.state.shownIdx.map(idx => (
                    <Grid item key={"card"}>
                        <Link to={'/production/'+this.state.info[idx]['Name']}>
                        <Card className={classes.card}>
                            <CardMedia
                            className={classes.cardMedia}

                            image={require('../img/production_usage/cover_photo/'+this.state.info[idx]['API']+'.jpg')}

                            title={this.state.info[idx]['Name']+" Image"}
                            />
                            <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {this.state.info[idx]['Name']}
                            </Typography>
                            <Typography>
                                <ul>

                                    <li><b>Type: </b>{this.state.info[idx]['Type']}</li>
                                    <li><b>Usage Field: </b>{this.state.info[idx]['Usage_Field']}</li>
                                    <li><b>Related Energy: </b>{this.state.info[idx]['Related_Energy']}</li>
                                    <li><b>Carbon Emission: </b>{this.state.info[idx]['Carbon_Emission']}</li>
                                    <li><b>Year of Invention: </b>{this.state.info[idx]['Year_of_Invention']}</li>

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
