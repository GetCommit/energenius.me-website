import React, { Component } from 'react'
import {Typography} from '@material-ui/core';

export default class Footer extends Component {
  render() {
    return (
      <div>
        {/* Footer */}
          <Typography variant="h6" align="center" gutterBottom>
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            Copyright © energenius.me 2019
          </Typography>
        {/* End footer */}
      </div>
    )
  }
}
