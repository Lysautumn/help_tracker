import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { SELECT_ACTIONS } from '../../redux/actions/selectActions';
import { EVENT_ACTIONS } from '../../redux/actions/eventActions';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import grey from '@material-ui/core/colors/grey';
import Button from '@material-ui/core/Button';
import amber from '@material-ui/core/colors/amber';
import red from '@material-ui/core/colors/red';
import ArrowBack from '@material-ui/icons/ArrowBack';
import teal from '@material-ui/core/colors/teal';
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
      event: {
        date: '',
        title: '',
        instructor: '',
        cohort: '',
        students: '',
        assignment: '',
        topics: '',
      },
    }
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch({ type: SELECT_ACTIONS.GET_SELECTS });
    this.props.dispatch({ type: EVENT_ACTIONS.GET_EVENT_INFO, payload: this.props.match.params.id });
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

  handleSubmit = event => {
    event.preventDefault();
    this.editEvent(this.state.event);
    // this.setState({
    //   event: {
    //     date: new Date(),
    //     title: '',
    //     instructor: '',
    //     cohort: '',
    //     students: '',
    //     assignment: '',
    //     topics: '',
    //   }
    // })
  }

  editEvent = editedEvent => {
    axios.post('/events', editedEvent)
      .then(response => {
        console.log('response from post', response);
      }).catch(error => {
        console.log('error in post', error);
      });
  }

  render() {
    
    let content = null;
    if (this.props.user.userName && this.props.select.selectList && this.props.event.eventDetails) {
      content = (
        <div>
          <h1>Edit Event</h1>
          <Link to="/user" style={styles.link}>
            <Button variant="fab" style={styles.backButton}>
              <ArrowBack />
            </Button>
          </Link>
          <form className="form">
            <MuiThemeProvider theme={theme}>
              <FormControl fullWidth>
                <TextField
                  id="date"
                  label="Date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={this.state.event.date}
                  onChange={this.handleChangeFor('date')}
                />
              </FormControl>
              <FormControl fullWidth>
                <Input
                  id="title"
                  placeholder="Title"
                  type="text"
                  value={this.state.event.title}
                  onChange={this.handleChangeFor('title')}
                  />
              </FormControl>
              <FormControl fullWidth>
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
                <Input
                  id="students"
                  placeholder="Students"
                  type="text"
                  value={this.state.event.students}
                  onChange={this.handleChangeFor('students')}
                />
              </FormControl>
              <FormControl fullWidth>
                <Input
                  id="assignment"
                  placeholder="Assignment"
                  type="text"
                  value={this.state.event.assignment}
                  onChange={this.handleChangeFor('assignment')}
                />
              </FormControl>
              <FormControl fullWidth>
                <Input
                  id="topics"
                  placeholder="Topics"
                  type="text"
                  value={this.state.event.topics}
                  onChange={this.handleChangeFor('topics')}
                />
              </FormControl>
              <Button style={styles.addButton} variant="contained" type="submit" onClick={this.handleSubmit}>Save</Button>
              <Button style={styles.deleteButton} variant="contained" type="submit" onClick={this.handleSubmit}>Delete</Button>
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

