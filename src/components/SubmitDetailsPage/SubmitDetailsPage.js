import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { SELECT_ACTIONS } from '../../redux/actions/selectActions';
import { EVENT_ACTIONS } from '../../redux/actions/eventActions';
import { FormControl, Input, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import { grey, amber, teal } from '@material-ui/core/colors';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

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
  submitButton: {
    margin: '20px 10px 0px 0px',
    backgroundColor: teal[400],
  }
}

class SubmitDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
          ...this.state.event,
            date: currentEvent.date,
            title: currentEvent.title,
            instructor: currentEvent.instructor,
            cohort: currentEvent.cohort_name,
            students: currentEvent.students,
            assignment: currentEvent.assignment,
            topics: currentEvent.topic,
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

  handleComplete = () => {
    this.setState({
      event: {
        ...this.state.event,
        completed: true,
      }
    },
    this.handleSubmit
    )
  }

  handleSubmit = () => {
    this.props.dispatch({
      type: EVENT_ACTIONS.UPDATE_EVENT,
      payload: this.state,
    });
    this.props.history.push('/user');
  }

  render() {
    
    let content = null;
    if (this.props.user.userName && this.props.select.selectList && this.props.event.eventDetails) {
      content = (
        <div>
          <h1>Completing {this.state.event.title}, <Moment format="MM/DD/YYYY">{this.state.event.date}</Moment></h1>
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
                  name="Title"
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
                  type="text"
                  value={this.state.event.topics}
                  onChange={this.handleChangeFor('topics')}
                />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor="notes">Notes</InputLabel>
                <Input
                  multiline
                  rows="5"
                  id="notes"
                  type="text"
                  value={this.state.event.notes}
                  onChange={this.handleChangeFor('notes')}
                  />
              </FormControl>
              <Button style={styles.submitButton} variant="contained" onClick={this.handleComplete}>Submit</Button>
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
export default connect(mapStateToProps)(SubmitDetailsPage);

