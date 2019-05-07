import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import { CardMedia, Typography, CardContent, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import CssBaseline from "@material-ui/core/CssBaseline";

import {Nav, Collapse, Fade} from 'react-bootstrap'
import { fade } from '@material-ui/core/styles/colorManipulator';


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

    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing.unit * 2,
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing.unit * 3,
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing.unit * 9,
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      width: '100%',
    },
    inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200,
      },
    },

  });

class Energy extends Component {

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
          sort: '',
          query: null,
          formErrors: {
            query: ""
          }
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
      document.title = "Energy";
      fetch('https://www.energenius.me/api/energy?name=all')
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

        var checkedType = []
        for (var i in form["Type"]) {
            if (form["Type"][i].checked) {
                checkedType.push(String(form["Type"][i].id));
            }
        }

        var checkedUse = []
        for (i in form["Major_Use"]) {
            if (form["Major_Use"][i].checked) {
                checkedUse.push(String(form["Major_Use"][i].id));
            }
        }

        var checkedCountry = []
        for (i in form["Top_Producing_Country"]) {
            if (form["Top_Producing_Country"][i].checked) {
                checkedCountry.push(String(form["Top_Producing_Country"][i].id));
            }
        }

        var api = "";
        if (checkedType.length === 0 || checkedType.length === 3) {
            api += "Type=all";
        } else {
            api += "Type=";
            api += checkedType.join("|");
        }
        api += "&";

        if (checkedUse.length === 0 || checkedUse.length === 6) {
            api += "Major_Use=all";
        } else {
            api += "Major_Use=";
            api += checkedUse.join("|");
        }

        api += "&";
        if (checkedCountry.length === 0 || checkedCountry.length === 8) {
            api += "Top_Producing_Country=all";
        } else {
            api += "Top_Producing_Country=";
            api += checkedCountry.join("|");
        }

        fetch("https://www.energenius.me/api/filter/energy?" + api)
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
                        <Link to={'/energy/'+this.state.info[idx]['Name']}>
                        <Card className={classes.card} style={{ width: '18rem' }}>
                            <CardMedia
                            className={classes.cardMedia}

                            image={require('../img/energy/cover_photo/'+this.state.info[idx]['API']+'.jpg')}

                            title={this.state.info[idx]['Name']+" Image"}
                            />
                            <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {this.state.info[idx]['Name']}
                            </Typography>
                            <Typography>
                                <ul>

                                    <li><b>Type: </b>{this.state.info[idx]['Type']}</li>
                                    <li><b>Major Use: </b>{this.state.info[idx]['Major_Use']}</li>
                                    <li><b>Consumption Rank in US: </b>{this.state.info[idx]['Consumption_Rank_in_US']}</li>
                                    <li><b>Electrical Generating Rank: </b>{this.state.info[idx]['Electrical_Generating_Rank']}</li>
                                    <li><b>Top Producing Country: </b>{this.state.info[idx]['Top_Producing_Country']}</li>

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
                  class = "rounded border border-grey h-50 w-75"
                  alightLeft
                  placeholder=""
                  type="text"
                  name="query"l
                  noValidate
                  onChange={this.handleChange}
                />
                <Link to={'/instanceSearch/'+'energy/'+this.state.query}>
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
                  Type
                  </Button>
                </Form.Label>
                <Collapse in={this.state.open1}>
                <div key={'type'} className="mb-3">
                  <Form.Check type={'checkbox'} id={'Physical Energy'} name={'Type'} label={'Physical Energy'} />
                  <Form.Check type={'checkbox'} id={'Non-Renewable Energy'} name={'Type'} label={'Non-Renewable Energy'} />
                  <Form.Check type={'checkbox'} id={'Renewable Energy'} name={'Type'} label={'Renewable Energy'} />
                </div>
                </Collapse>
                </div>

                <div>
                <Form.Label><Button
                    class="btn btn-light btn-block"
                    onClick={() => this.setState({ open2: !open2 })}
                    aria-controls="example-collapse-text"
                    aria-expanded={open2}>
                    Major Use
                    </Button>
                  </Form.Label>
                  <Collapse in={this.state.open2}>
                  <div key={'use'} className="mb-3">
                    <Form.Check type={'checkbox'} id={'Industrial'} name={'Major_Use'} label={'Industrial'} />
                    <Form.Check type={'checkbox'} id={'Electric Power'} name={'Major_Use'} label={'Electric Power'} />
                    <Form.Check type={'checkbox'} id={'Residential'} name={'Major_Use'} label={'Residential'} />
                    <Form.Check type={'checkbox'} id={'High Technology'} name={'Major_Use'} label={'High Technology'} />
                    <Form.Check type={'checkbox'} id={'Transportation'} name={'Major_Use'} label={'Transportation'} />
                    <Form.Check type={'checkbox'} id={'Shield'} name={'Major_Use'} label={'Shield'} />
                  </div>
                  </Collapse>
                  </div>


                  <div>
                  <Form.Label><Button
                    class="btn btn-light"
                    onClick={() => this.setState({ open3: !open3 })}
                    aria-controls="example-collapse-text"
                    aria-expanded={open3}>
                    Top Country
                    </Button>
                  </Form.Label>
                  <Collapse in={this.state.open3}>
                  <div key={'country'} className="mb-3">
                    <Form.Check type={'checkbox'} id={'Australia'} name={'Top_Producing_Country'} label={'Australia'} />
                    <Form.Check type={'checkbox'} id={'China'} name={'Top_Producing_Country'} label={'China'} />
                    <Form.Check type={'checkbox'} id={'France'} name={'Top_Producing_Country'} label={'France'} />
                    <Form.Check type={'checkbox'} id={'India'} name={'Top_Producing_Country'} label={'India'} />
                    <Form.Check type={'checkbox'} id={'Japan'} name={'Top_Producing_Country'} label={'Japan'} />
                    <Form.Check type={'checkbox'} id={'Kuwait'} name={'Top_Producing_Country'} label={'Kuwait'} />
                    <Form.Check type={'checkbox'} id={'United States'} name={'Top_Producing_Country'} label={'United States'} />
                    <Form.Check type={'checkbox'} id={'Wakanda'} name={'Top_Producing_Country'} label={'Wakanda'} />
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
                    <MenuItem value="Consumption_Rank_in_US">Consumption Rank in US</MenuItem>
                    <MenuItem value="Electrical_Generating_Rank">Electrical Generating Rank</MenuItem>
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
  export default withStyles(styles)(Energy);
