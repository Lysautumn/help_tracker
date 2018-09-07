import React, { Component } from 'react';
import { connect } from 'react-redux';
import { EVENT_ACTIONS } from '../../redux/actions/eventActions';
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';

const mapStateToProps = state => ({
    user: state.user,
    event: state.event,
  });

const styles = {
  deleteButton: {
    margin: '20px 0px 0px 10px',
    backgroundColor: red[400],
  }
}

class DeleteButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
    }
  }

  handleDelete = () => {
    this.props.dispatch({
      type: EVENT_ACTIONS.DELETE_EVENT,
      payload: this.state.id
    });
    this.props.history.push('/user');
  }

  render() {
      return (
        <Button style={styles.deleteButton} variant="contained" onClick={this.handleDelete}>Delete</Button>
      )
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(DeleteButton);

