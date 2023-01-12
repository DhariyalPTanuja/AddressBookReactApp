import React, { Component } from 'react'
import logo from '../../src/assets/logo/address-book-logo.png';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

class HeaderComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar variant="dense">
            <img alt="" src={logo} width="30" height="30" className="d-inline-block align-top" />
            <Typography variant="h6" color="inherit" component="div">
              Address Book
            </Typography>
          </Toolbar>
        </AppBar>

      </div>
    )
  }
}
export default HeaderComponent
