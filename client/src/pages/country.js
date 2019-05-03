import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import { CardMedia, Typography, CardContent, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import CssBaseline from "@material-ui/core/CssBaseline";
import {Nav, Collapse, Fade} from 'react-bootstrap'

import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import CardActions from '@material-ui/core/CardActions';
import { withStyles } from '@material-ui/core/styles';
import Pagination from "react-js-pagination";
import Form from 'react-bootstrap/Form';


const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};
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
          isReversed: false,
          open1: false,
          open2: false,
          open3: false,
          activePage: 1,
          info: undefined,
          shownIdx: [0, 1, 2, 3, 4, 5, 6, 7, 8],
          sort: ''
      };

      this.handlePageChange = this.handlePageChange.bind(this);
      this.handleFilter = this.handleFilter.bind(this);
      this.handleSort = this.handleSort.bind(this);
    }

    handleSubmit = e => {
      e.preventDefault();

      if (formValid(this.state)) {
        console.log(`
          --SUBMITTING--
          Query: ${this.state.query}
        `);
      } else {
        console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
      }
    };
    handleChange = e => {
      e.preventDefault();
      const { name, value } = e.target;
      let formErrors = { ...this.state.formErrors };

      this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    };

    componentDidMount() {
      document.title = "Country";
      fetch('/api/country?name=all')
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
        for (i in form["Population"]) {
            if (form["Population"][i].checked) {
                checkedPopulation.push(String(form["Population"][i].id));
            }
        }

        var checkedProd = []
        for (i in form["Total_Production"]) {
            if (form["Total_Production"][i].checked) {
                checkedProd.push(String(form["Total_Production"][i].id));
            }
        }

        var api = "";
        if (checkedRegion.length === 0 || checkedRegion.length === 7) {
            api += "Region=all";
        } else {
            api += "Region=";
            api += checkedRegion.join("|");
        }
        api += "&";

        if (checkedPopulation.length === 0 || checkedPopulation.length === 3) {
            api += "Population=all";
        } else {
            api += "Population=";
            api += checkedPopulation.join("|");
        }

        api += "&";
        if (checkedProd.length === 0 || checkedProd.length === 3) {
            api += "Total_Production=all";
        } else {
            api += "Total_Production=";
            api += checkedProd.join("|");
        }

        fetch("/api/filter/country?" + api)
            .then(response => response.json())
            .then(data => this.setState({info: data}));
    }

    GetSortOrder(prop) {
        return function(a, b) {
            if (a[prop] > b[prop]) {
                return 1;
            } else if (a[prop] < b[prop]) {
                return -1;
            }
            return 0;
        }
    }

    handleSort(event) {
      event.preventDefault();
      if(this.state["isReversed"]){
        this.state.info.reverse(this.GetSortOrder(event.target.value));
      }else{
        this.state.info.sort(this.GetSortOrder(event.target.value));
      }
      this.setState({ [event.target.name]: event.target.value });
    }

    render() {

      const { open1, open2, open3, isReversed} = this.state;
      let btn_text = this.state.isReversed ? "Ascend" : "Descend"
      let btn_class = this.state.isReversed ? "btn-warning" : "btn-success"
        if (this.state.info === undefined) {
            return (<div>Loading</div>)
        }

        var tmpIdx = [];
        for (var idx in this.state.shownIdx) {
            if (this.state.shownIdx[idx] < this.state.info.length) {
                tmpIdx.push(this.state.shownIdx[idx]);
            } else {
                break;
            }
        }

        const { classes } = this.tmp_props;

        return (
            <React.Fragment>
              <CssBaseline />

              <main>

              {/* Hero unit */}

              <div class="row">
              <div class="col-md-10">

              <div className={classNames(classes.layout, classes.cardGrid)}>
                {/* End hero unit */}

                <Grid container spacing={40}>
                  <CssBaseline />
                  {tmpIdx.map(idx => (
                    <Grid item key={"card"}>
                        <Link to={'/country/'+this.state.info[idx]['Name']}>
                        <Card className={classes.card} style={{ width: '18rem' }}>
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
            itemsCountPerPage={9}
            totalItemsCount={Object.keys(this.state.info).length}
            pageRangeDisplayed={3}
            innerClass="pagination justify-content-center"
            linkClass="page-link"
            itemClass="page-item"
            onChange={this.handlePageChange}
            />
            </div>
            </div>

            <aside class="col-md-2">
              {/* Local search */}
              <br></br>
                <Form  onSubmit={this.handleSubmit} noValidate inline className="justify-content-left col-xs-6" alignRight >
                  <input
                    class = "rounded border border-grey w-75"
                    alightLeft
                    placeholder=""
                    type="text"
                    name="query"
                    noValidate
                    onChange={this.handleChange}

                  />
                  <Link to={'/instanceSearch/'+'country/'+this.state.query}>
                    <Button  variant="outlined" color="primary">
                      Search
                    </Button>
                  </Link>
                </Form>
                <p></p>


              <Form noValidate onSubmit={this.handleFilter}>
              <div>
                <Form.Label><Button
                  class="btn btn-light"
                  onClick={() => this.setState({ open1: !open1 })}
                  aria-controls="example-collapse-text"
                  aria-expanded={open1}>
                  Region
                  </Button>
                </Form.Label>
                <Collapse in={this.state.open1}>
                  <div key={'type'} className="mb-3">
                    <Form.Check type={'checkbox'} id={'Africa'} name={'Region'} label={'Africa'} />
                    <Form.Check type={'checkbox'} id={'Asia'} name={'Region'} label={'Asia'} />
                    <Form.Check type={'checkbox'} id={'Europe'} name={'Region'} label={'Europe'} />
                    <Form.Check type={'checkbox'} id={'Latin America'} name={'Region'} label={'Latin America'} />
                    <Form.Check type={'checkbox'} id={'Middle East'} name={'Region'} label={'Middle East'} />
                    <Form.Check type={'checkbox'} id={'North America'} name={'Region'} label={'North America'} />
                    <Form.Check type={'checkbox'} id={'Pacific'} name={'Region'} label={'Pacific'} />
                  </div>
                </Collapse>
              </div>

              <div>
                <Form.Label><Button
                  class="btn btn-light"
                  onClick={() => this.setState({ open2: !open2 })}
                  aria-controls="example-collapse-text"
                  aria-expanded={open2}>
                  Population(Million)
                  </Button>
                </Form.Label>
                <Collapse in={this.state.open2}>
                <div key={'use'} className="mb-3">
                  <Form.Check type={'checkbox'} id={'0-100'} name={'Population'} label={'0-100'} />
                  <Form.Check type={'checkbox'} id={'100-500'} name={'Population'} label={'100-500'} />
                  <Form.Check type={'checkbox'} id={'>500'} name={'Population'} label={'>500'} />
                </div>
                </Collapse>
              </div>


              <div>
                <Form.Label><Button
                  class="btn btn-light"
                  onClick={() => this.setState({ open3: !open3 })}
                  aria-controls="example-collapse-text"
                  aria-expanded={open3}>
                  Production(bn/kWh)
                  </Button>
                </Form.Label>
                <Collapse in={this.state.open3}>
                <div key={'country'} className="mb-3">
                  <Form.Check type={'checkbox'} id={'0-1000'} name={'Total_Production'} label={'0-1000'} />
                  <Form.Check type={'checkbox'} id={'1000-2000'} name={'Total_Production'} label={'1000-2000'} />
                  <Form.Check type={'checkbox'} id={'>2000'} name={'Total_Production'} label={'>2000'} />
                </div>
                </Collapse>
              </div>

                <Button variant="outlined" color="primary" type="submit">Apply Filter</Button>
                <p>

                </p>
            </Form>




            <Form>
            <FormControl variant="outlined" color="primary" style={{ width: '10rem'}}>
            <InputLabel> Sort by</InputLabel>
            <Select value={this.state.sort} onChange={this.handleSort} input={<OutlinedInput name="sort" id="sort" />} >
                <MenuItem value=""> <em>None</em> </MenuItem>
                <MenuItem value="Total_Production">Total Production(bn kWh)</MenuItem>
                <MenuItem value="Total_Usage">Total Usage(bn kWh)</MenuItem>
                <MenuItem value="Energy_Shortage">Energy Shortage(days/year)</MenuItem>
                <MenuItem value="Population">Population(Million)</MenuItem>
            </Select>
            <button type="button" class={"btn "+btn_class} onClick={() => this.setState({ isReversed: !isReversed })}>{btn_text}</button>
            </FormControl>
            </Form>


            </aside>
            </div>
            </main>

          </React.Fragment>
      );
    }
  }

export default withStyles(styles)(Country);
