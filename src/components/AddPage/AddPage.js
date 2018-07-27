import React, { Component } from 'react';
import { connect } from 'react-redux';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import TextField from '@material-ui/core/TextField';

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
        <form>
          <TextField />
        </form>
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

