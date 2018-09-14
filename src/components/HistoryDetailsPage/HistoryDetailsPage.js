import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { EVENT_ACTIONS } from '../../redux/actions/eventActions';
import Edit from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import amber from '@material-ui/core/colors/amber';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import teal from '@material-ui/core/colors/teal';

const mapStateToProps = state => ({
  user: state.user,
  select: state.select,
  event: state.event,
});

const styles = {
  backButton: {
    backgroundColor: amber[400],
  },
  editButton: {
    backgroundColor: amber[400],
    marginLeft: '10px',
  },
  addButton: {
    margin: '20px 10px 0px 0px',
    backgroundColor: teal[400],
  },
}

class HistoryDetailsPage extends Component {
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

  render() {
    
    let content = null;
    if (this.props.user.userName && this.props.event.eventDetails) {
        let event = this.props.event.eventDetails.eventInfo[0];
      content = (
        <div>
            <div>
                <h1>{this.state.event.title}, <Moment format="MM/DD/YYYY">{this.state.event.date}</Moment>
                <Link to={`/editHistory/${this.state.id}`} style={styles.link}>
                    <Button variant="fab" style={styles.editButton}>
                        <Edit />
                    </Button>
                </Link></h1>
            </div>
          <Link to="/user" style={styles.link}>
            <Button variant="fab" style={styles.backButton}>
              <ArrowBack />
            </Button>
          </Link>
          <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Cohort</TableCell>
                        <TableCell>Instructor</TableCell>
                        <TableCell>Students</TableCell>
                        <TableCell>Assignments</TableCell>
                        <TableCell>Topics</TableCell>
                        <TableCell>Notes</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key={event.id}>
                        <TableCell>{event.cohort_name}</TableCell>
                        <TableCell>{event.instructor}</TableCell>
                        <TableCell>{event.students}</TableCell>
                        <TableCell>{event.assignment}</TableCell>
                        <TableCell>{event.topic}</TableCell>
                        <TableCell>{event.notes}</TableCell>
                    </TableRow>
            </TableBody>
          </Table>
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
export default connect(mapStateToProps)(HistoryDetailsPage);

