import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AddPage.css';

import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import amber from '@material-ui/core/colors/amber';

import { USER_ACTIONS } from '../../redux/actions/userActions';

const styles = {
  addButton: {
    backgroundColor: amber[400],
  }
}
const mapStateToProps = state => ({
  user: state.user,
});

class AddPage extends Component {
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
            <p>Add Page</p>
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
export default connect(mapStateToProps)(AddPage);

