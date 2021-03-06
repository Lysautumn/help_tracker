import React, { Component } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, TableHead, TableBody, TableCell, TableRow, TableFooter, TablePagination, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, Button, FormControl, InputLabel, Input } from '@material-ui/core';
import { Delete, More } from '@material-ui/icons';
import { red, blueGrey, amber, teal } from '@material-ui/core/colors';
import { EVENT_ACTIONS, triggerGet } from '../../redux/actions/eventActions';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
  event: state.event,
  history: state.history,
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
  table: {
    width: '800px'
  },
}

class HistoryTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      toDelete: false,
      eventToDelete: '',
      page: 0,
      rowsPerPage: 10,
      filterString: '',
    }
  }
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  }

  handleChangeRowsPerPage = event => {
    this.setState({
      rowsPerPage: event.target.value,
    });
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

  handleFilterString = event => {
    console.log('value', event.target.value);
    this.setState({
      filterString: event.target.value,
    }) 
  }

  render() {
    let listCheck = this.props.history.eventList;

    let historyList;

    if (listCheck && this.state.filterString) {
      historyList = this.props.history.eventList.eventName.filter(event => {
        return event.students.toLowerCase().includes(this.state.filterString.toLowerCase());
      });
    } else if (listCheck) {
      historyList = this.props.history.eventList.eventName.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage);
    }
    
    
    return (
      <div className="contentContainer">
        <h2>History</h2>
        <FormControl>
          <InputLabel htmlFor="filter">Filter</InputLabel>
          <Input
            id="filter"
            type="text"
            value={this.state.filterString}
            onChange={this.handleFilterString}
          />
        </FormControl>

        <Table style={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Students</TableCell>
              <TableCell>Instructor</TableCell>
              <TableCell>Cohort</TableCell>
              <TableCell>Topics</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {listCheck && historyList.map( (event) => {
              return ( 
                <TableRow key={event.id}>
                  <TableCell><Moment format="MM/DD/YYYY">{event.date}</Moment></TableCell>
                  <TableCell>{event.title}</TableCell>
                  <TableCell>{event.students}</TableCell>
                  <TableCell>{event.instructor}</TableCell>
                  <TableCell>{event.cohort_name}</TableCell>
                  <TableCell>{event.topic}</TableCell>
                  <TableCell><Link style={styles.link} to={`/historyDetail/${event.id}`}><Button style={styles.moreButton}><More /></Button></Link></TableCell>
                  <TableCell><Button style={styles.deleteButton} onClick={() => this.handleDelete(event)}><Delete /></Button></TableCell>
                </TableRow>
              )
            })}
          </TableBody>
          <TableFooter>
            {this.props.history.eventList && this.props.history.isLoading === false &&
            <TableRow>
              <TablePagination
                colSpan={8}
                rowsPerPageOptions={[5, 10, 25]}
                count={this.props.history.eventList.eventName.length}
                rowsPerPage={this.state.rowsPerPage}
                page={this.state.page}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
              ></TablePagination>
            </TableRow>
            }
          </TableFooter>
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