import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { SELECT_ACTIONS } from '../../redux/actions/selectActions';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import grey from '@material-ui/core/colors/grey';
import Button from '@material-ui/core/Button';
import amber from '@material-ui/core/colors/amber';
import ArrowBack from '@material-ui/icons/ArrowBack';
import teal from '@material-ui/core/colors/teal';
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
    };
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch({ type: SELECT_ACTIONS.GET_SELECTS });
    console.log('cohort select', this.props.select)
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('/home');
    }
  }

  handleChangeFor = propertyName => event => {
    console.log(this.props.user);
    this.setState({
      newEvent: {
        ...this.state.newEvent,
        instructor: this.props.user.userName.id,
        [propertyName]: event.target.value,
      }
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log('button clicked', this.state.newEvent);
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

  postEvent = newEvent => {
    axios.post('/events', newEvent)
      .then(response => {
        console.log('response from post', response);
      }).catch(error => {
        console.log('error in post', error);
      });
  }

  render() {
    
    let content = null;
    //let selectContent = this.props.select.selectList.selects;
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
                <Input
                  id="title"
                  placeholder="Title"
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
              <FormControl fullWidth>
                <Input
                  id="students"
                  placeholder="Students"
                  type="text"
                  value={this.state.newEvent.students}
                  onChange={this.handleChangeFor('students')}
                />
              </FormControl>
              <FormControl fullWidth>
                <Input
                  id="assignment"
                  placeholder="Assignment"
                  type="text"
                  value={this.state.newEvent.assignment}
                  onChange={this.handleChangeFor('assignment')}
                />
              </FormControl>
              <FormControl fullWidth>
                <Input
                  id="topics"
                  placeholder="Topics"
                  type="text"
                  value={this.state.newEvent.topics}
                  onChange={this.handleChangeFor('topics')}
                />
              </FormControl>
              <Button style={styles.addButton} variant="contained" type="submit" onClick={this.handleSubmit}>Add</Button>
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
export default connect(mapStateToProps)(AddPage);

