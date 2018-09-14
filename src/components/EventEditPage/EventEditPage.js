import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { SELECT_ACTIONS } from '../../redux/actions/selectActions';
import { EVENT_ACTIONS } from '../../redux/actions/eventActions';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import grey from '@material-ui/core/colors/grey';
import Button from '@material-ui/core/Button';
import amber from '@material-ui/core/colors/amber';
import red from '@material-ui/core/colors/red';
import ArrowBack from '@material-ui/icons/ArrowBack';
import teal from '@material-ui/core/colors/teal';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// import DeleteButton from '../DeleteButton/DeleteButton';

const mapStateToProps = state => ({
  user: state.user,
  select: state.select,
  event: state.event,
});

const theme = createMuiTheme({
  palette: {
    primary: grey,
  },
});

const styles = {
  backButton: {
    backgroundColor: amber[400],
  },
  yesButton: {
    backgroundColor: teal[400],
  },
  addButton: {
    margin: '20px 10px 0px 0px',
    backgroundColor: teal[400],
  },
  deleteButton: {
    margin: '20px 0px 0px 10px',
    backgroundColor: red[400],
  }
}

class EventEditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      id: this.props.match.params.id,
      event: {
        date: '',
        title: '',
        instructor: '',
        cohort: '',
        students: '',
        assignment: '',
        topics: '',
        notes: '',
        completed: '',
      },
    }
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch({ type: SELECT_ACTIONS.FETCH_SELECTS });
    this.props.dispatch({ type: EVENT_ACTIONS.FETCH_EVENT_INFO, payload: this.props.match.params.id });
  }

  componentDidUpdate(prevProps) {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('/home');
    }
    if (this.props.event.eventDetails !== prevProps.event.eventDetails) {
        this.setInitialState();
    }
  }

  setInitialState = () => {
      let currentEvent = this.props.event.eventDetails.eventInfo[0];
      this.setState({
        event: {
            date: currentEvent.date,
            title: currentEvent.title,
            instructor: currentEvent.instructor,
            cohort: currentEvent.cohort_name,
            students: currentEvent.students,
            assignment: currentEvent.assignment,
            topics: currentEvent.topic,
            notes: '',
            completed: false,
          },
      })
  }

  handleChangeFor = propertyName => event => {
    this.setState({
      event: {
        ...this.state.event,
        instructor: this.props.user.userName.id,
        [propertyName]: event.target.value,
      }
    })
  }

  handleSubmit = () => {
    this.props.dispatch({
      type: EVENT_ACTIONS.UPDATE_EVENT,
      payload: this.state,
    });
    this.props.history.push('/user');
  }

  handleOpen = () => {
    this.setState({
      open: true,
    })
  }

  handleNoClose = () => {
    this.setState({
      open:false,
    })
  }
 
  handleYesClose = () => {
    this.setState({
      open: false,
    },
    this.deleteEvent
    )
  }

  deleteEvent = () => {
    this.props.dispatch({
      type: EVENT_ACTIONS.DELETE_EVENT,
      payload: this.state.id
    });
    this.props.history.push('/user');
  }

  render() {
    
    let content = null;
    if (this.props.user.userName && this.props.select.selectList && this.props.event.eventDetails) {
      content = (
        <div>
          <h1>Editing {this.state.event.title}, <Moment format="MM/DD/YYYY">{this.state.event.date}</Moment></h1>
          <Link to="/user" style={styles.link}>
            <Button variant="fab" style={styles.backButton}>
              <ArrowBack />
            </Button>
          </Link>
          <form className="form">
            <MuiThemeProvider theme={theme}>
              <FormControl fullWidth>
                <InputLabel htmlFor="title">Title</InputLabel>
                <Input
                  id="title"
                  type="text"
                  value={this.state.event.title}
                  onChange={this.handleChangeFor('title')}
                  />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor="cohort">Cohort</InputLabel>
                <Select renderValue={value => `${this.state.event.cohort}`} value={this.state.event.cohort} readOnly inputProps={{
                    name: 'Cohort',
                    id: 'cohort'
                }}>
                  {this.props.select.selectList.selects.cohortInfo.map(cohort => {
                    return (<MenuItem key={cohort.id} value={cohort.id}>{cohort.cohort_name}</MenuItem>)
                  })}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor="students">Students</InputLabel>
                <Input
                  id="students"
                  type="text"
                  value={this.state.event.students}
                  onChange={this.handleChangeFor('students')}
                />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor="assignment">Assignment</InputLabel>
                <Input
                  id="assignment"
                  type="text"
                  value={this.state.event.assignment}
                  onChange={this.handleChangeFor('assignment')}
                />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor="topics">Topics</InputLabel>
                <Input
                  id="topics"
                  placeholder="Topics"
                  type="text"
                  value={this.state.event.topics}
                  onChange={this.handleChangeFor('topics')}
                />
              </FormControl>
              <Button style={styles.addButton} variant="contained" onClick={this.handleSubmit}>Save</Button>
              <Button style={styles.deleteButton} variant="contained" onClick={this.handleOpen}>Delete</Button>
              <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="deleteDialogTitle" aria-describedby="deleteConfimationText">
                <DialogTitle id="deleteDialogTitle">{"Are you sure?"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="deleteConfimationText">
                    Are you sure you want to delete this entry? This is a permanent action.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button style={styles.yesButton} onClick={this.handleYesClose}>Yes</Button>
                  <Button style={styles.backButton} onClick={this.handleNoClose}>No</Button>
                </DialogActions>
              </Dialog>
            </MuiThemeProvider>
          </form>
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
export default connect(mapStateToProps)(EventEditPage);

