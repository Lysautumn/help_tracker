import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { EVENT_ACTIONS } from '../../redux/actions/eventActions';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { SELECT_ACTIONS } from '../../redux/actions/selectActions';
import { TextField, FormControl, InputLabel, Input, Select, MenuItem, Button, Dialog, DialogTitle, 
  DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { grey, amber, teal } from '@material-ui/core/colors';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './AddPage.css';

const mapStateToProps = state => ({
  user: state.user,
  select: state.select,
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
    margin: '20px 0px 0px 0px',
    backgroundColor: teal[400],
  },
  addCohortButton: {
    backgroundColor: teal[400],
  }
}

class AddPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newEvent: {
        date: new Date(),
        title: '',
        instructor: '',
        cohort: '',
        students: '',
        assignment: '',
        topics: '',
      },
      open: false,
      newCohort: '',
    };
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch({ type: SELECT_ACTIONS.FETCH_SELECTS });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('/home');
    }
  }

  handleChangeFor = propertyName => event => {
    this.setState({
      newEvent: {
        ...this.state.newEvent,
        instructor: this.props.user.userName.id,
        [propertyName]: event.target.value,
      }
    })
  }

  handleSubmit = () => {
    this.postEvent(this.state.newEvent);
    this.setState({
      newEvent: {
        date: new Date(),
        title: '',
        instructor: '',
        cohort: '',
        students: '',
        assignment: '',
        topics: '',
      }
    })
  }

  postEvent = () => {
    this.props.dispatch({type:EVENT_ACTIONS.CREATE_EVENT, payload: this.state.newEvent});
    this.props.history.push('/user');
  }

  handleOpen = () => {
    this.setState({
      open: true,
    })
  }

  handleCohort = event => {
    this.setState({
      newCohort: event.target.value
    })
  }

  handleAddCohort = () => {
    this.setState({
      open: false,
    },
    this.postCohort
    )
  }

  postCohort = () => {
    this.props.dispatch({type: SELECT_ACTIONS.CREATE_COHORT, payload: {newCohort: this.state.newCohort}});
    this.setState({
      newCohort: '',
    })
  }

  handleCancel = () => {
    this.setState({
      open: false,
    })
  }


  render() {
    
    let content = null;
    if (this.props.user.userName && this.props.select.selectList) {
      content = (
        <div>
          <h1>Add New Event</h1>
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
                  value={this.state.newEvent.date}
                  onChange={this.handleChangeFor('date')}
                />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor="title">Title</InputLabel>
                <Input
                  id="title"
                  type="text"
                  value={this.state.newEvent.title}
                  onChange={this.handleChangeFor('title')}
                  />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor="cohort">Cohort</InputLabel>
                <Select value={this.state.newEvent.cohort} onChange={this.handleChangeFor('cohort')} inputProps={{
                    name: 'Cohort',
                    id: 'cohort'
                }}>
                  {this.props.select.selectList.selects.cohortInfo.map(cohort => {
                    return (<MenuItem key={cohort.id} value={cohort.id}>{cohort.cohort_name}</MenuItem>)
                  })}
                </Select>
              </FormControl>
              <Button style={styles.addButton} onClick={() => this.handleOpen()}>
                  Add New Cohort
              </Button>
              <FormControl fullWidth>
                <InputLabel htmlFor="students">Students</InputLabel>
                <Input
                  id="students"
                  type="text"
                  value={this.state.newEvent.students}
                  onChange={this.handleChangeFor('students')}
                />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor="assignment">Assignment</InputLabel>
                <Input
                  id="assignment"
                  type="text"
                  value={this.state.newEvent.assignment}
                  onChange={this.handleChangeFor('assignment')}
                />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor="topics">Topics</InputLabel>
                <Input
                  id="topics"
                  type="text"
                  value={this.state.newEvent.topics}
                  onChange={this.handleChangeFor('topics')}
                />
              </FormControl>
              <Button style={styles.addButton} variant="contained" type="submit" onClick={this.handleSubmit}>Add</Button>
            </MuiThemeProvider>
          </form>
          <Dialog open={this.state.open} aria-labelledby="newCohortDialog" aria-describedby="addNewCohort">
            <DialogTitle id="newCohortDialog">{"Add New Cohort"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="addNewCohort">
                  Enter the name of the new cohort:
                </DialogContentText>
                <FormControl fullWidth>
                  <InputLabel htmlFor="newCohortName">Cohort Name</InputLabel>
                  <Input
                    id="newCohortName"
                    type="text"
                    label="Cohort Name"
                    value={this.state.newCohort}
                    onChange={this.handleCohort}
                  />
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button style={styles.addCohortButton} onClick={this.handleAddCohort}>Add</Button>
                <Button style={styles.backButton} onClick={this.handleCancel}>Cancel</Button>
              </DialogActions>
          </Dialog>
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

