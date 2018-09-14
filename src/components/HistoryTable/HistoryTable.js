import React, { Component } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Delete from '@material-ui/icons/Delete';
import More from '@material-ui/icons/More';
import red from '@material-ui/core/colors/red';
import blueGrey from '@material-ui/core/colors/blueGrey';
import amber from '@material-ui/core/colors/amber';
import teal from '@material-ui/core/colors/teal';
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
  noButton: {
    backgroundColor: amber[400],
  },
  yesButton: {
    backgroundColor: teal[400],
  },
}



class HistoryTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      toDelete: false,
      eventToDelete: '',
    }
  }
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  handleOpen = () => {
    this.setState({
      open: true,
    })
  }

  handleNoClose = () => {
    this.setState({
      open: false,
    })
  }

  handleYesClose = () => {
    this.setState({
      open: false,
      toDelete: true,
    },
    this.finishDelete
    )
  }

  handleDelete = (selectedEvent) => {
    this.setState({
      eventToDelete: selectedEvent.id,
    })
    this.handleOpen();
  }

  finishDelete = () => {
    this.props.dispatch({
      type: EVENT_ACTIONS.DELETE_EVENT,
      payload: this.state.eventToDelete
    });
    this.props.dispatch(triggerGet());
    this.setState({
      toDelete: false,
    })
  }

  render() {

    return (
      <div className="contentContainer">
        <h2>History</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Students</TableCell>
              <TableCell>Instructor</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
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
                  <TableCell><Button style={styles.deleteButton} onClick={() => this.handleDelete(event)}><Delete /></Button></TableCell>
                </TableRow>
              )
            } else {
              return null;
            }
            })}
          </TableBody>
        </Table>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="deleteDialogTitle" aria-describedby="deleteConfimationText">
          <DialogTitle id="deleteDialogTitle">{"Are you sure?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="deleteConfimationText">
              Are you sure you want to delete this entry? This is a permanent action.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button style={styles.yesButton} onClick={this.handleYesClose}>Yes</Button>
            <Button style={styles.noButton} onClick={this.handleNoClose}>No</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
  
  

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(HistoryTable);