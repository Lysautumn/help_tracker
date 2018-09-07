import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import './Header.css';
import logo from './logo.png';
import Avatar from '@material-ui/core/Avatar';
import Face from '@material-ui/icons/Face';
import teal from '@material-ui/core/colors/teal';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const styles = {
  tealAvatar: {
    backgroundColor: teal[400],
  },
  logo: {
    height: '80px',
  },
};

const mapStateToProps = state => ({
  user: state.user,
});

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
    };
  };

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  };

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  logout = () => {
    this.props.dispatch(triggerLogout());
    this.handleClose();
  };

  render() {

    const anchorEl = this.state.anchorEl;

    return(
      <div className="headerText">
        <h1><img style={styles.logo} src={logo} alt="Logo"/></h1>
        <Avatar className="faceIcon" style={styles.tealAvatar} aria-owns={anchorEl ? 'simple-menu' : null} aria-haspopup="true" onClick={this.handleClick}>
          <Face />
        </Avatar>
          <Menu id='simple-menu' anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
            <MenuItem onClick={this.logout}>Log Out</MenuItem>
          </Menu>
      </div>
    )
  }
}



export default connect(mapStateToProps)(Header);
