import React, { Component } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Delete from '@material-ui/icons/Delete';
import More from '@material-ui/icons/More';
import red from '@material-ui/core/colors/red';
import blueGrey from '@material-ui/core/colors/blueGrey';

import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
  event: state.event,
});

const styles = {
  deleteButton: {
    backgroundColor: red[400],
  },
  moreButton: {
    backgroundColor: blueGrey[50],
  },
}



class HistoryTable extends Component {
  
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  render() {

    return (
      <div className="contentContainer">
        <h2>History</h2>
        <Table>
          <TableBody>
          {this.props.event.eventList && this.props.event.eventList.eventName.map( (event) => {
            if (event.completed === true) {
              return ( 
                <TableRow key={event.id}>
                  <TableCell><Moment format="MM/DD/YYYY">{event.date}</Moment></TableCell>
                  <TableCell>{event.title}</TableCell>
                  <TableCell>{event.students}</TableCell>
                  <TableCell>{event.instructor}</TableCell>
                  <TableCell></TableCell>
                  <TableCell><Button style={styles.moreButton}><More /></Button></TableCell>
                  <TableCell><Button style={styles.deleteButton}><Delete /></Button></TableCell>
                </TableRow>
              )
            } else {
              return null;
            }
            })}
          </TableBody>
        </Table>
 
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(HistoryTable);