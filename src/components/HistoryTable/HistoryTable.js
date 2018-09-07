import React, { Component } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Delete from '@material-ui/icons/Delete';
import More from '@material-ui/icons/More';
import red from '@material-ui/core/colors/red';
import blueGrey from '@material-ui/core/colors/blueGrey';
// import DeleteButton from '../DeleteButton/DeleteButton';
import { EVENT_ACTIONS, triggerGet } from '../../redux/actions/eventActions';
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
  link: {
    textDecoration: 'none',
    color: 'black',
  },
}



class HistoryTable extends Component {
  
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  handleDelete = (event, selectedEvent) => {
    event.preventDefault();
    this.props.dispatch({
      type: EVENT_ACTIONS.DELETE_EVENT,
      payload: selectedEvent.id
    });
    this.props.dispatch(triggerGet());
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
                  <TableCell><Link style={styles.link} to={`/historyDetail/${event.id}`}><Button style={styles.moreButton}><More /></Button></Link></TableCell>
                  <TableCell><Button style={styles.deleteButton} onClick={(e) => this.handleDelete(e, event)}><Delete /></Button></TableCell>
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