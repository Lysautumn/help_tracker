import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './LandingPage.css';

import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import amber from '@material-ui/core/colors/amber';
import grey from '@material-ui/core/colors/grey';

import { USER_ACTIONS } from '../../redux/actions/userActions';

const styles = {
  addButton: {
    backgroundColor: amber[400],
  },
  link: {
    color: grey[900]
  }
}
const mapStateToProps = state => ({
  user: state.user,
});

class LandingPage extends Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  render() {
    let content = null;
    console.log(this.props.user);
    if (this.props.user.userName) {
      content = (
        <div>
          <h1
            id="welcome"
          >
            Welcome, { this.props.user.userName.name }!
          </h1>
          <Link to="/add" style={styles.link}>
            <Button variant="fab" style={styles.addButton}>
              <Add />
            </Button>
          </Link>
        </div>
      );
    }

    return (
      <div className="contentContainer">
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(LandingPage);

