import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import HistoryTable from '../HistoryTable/HistoryTable';
import UpcomingTable from '../UpcomingTable/UpcomingTable';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import amber from '@material-ui/core/colors/amber';
import grey from '@material-ui/core/colors/grey';

import { triggerGet } from '../../redux/actions/eventActions';


const styles = {
  addButton: {
    backgroundColor: amber[400],
  },
  link: {
    color: grey[900]
  }
}

const mapStateToProps = state => ({
  user: state.user,
});


class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      greetings: ['Hello', 'Hey', 'Ahoy', 'Greetings', 'Bonjour', 'Hey There', 'Hola', 'Aloha']
    };
  }

  componentDidMount() {
    this.props.dispatch(triggerGet());
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('/home');
    }
    this.props.dispatch(triggerGet());
  }

  getGreeting() {
    return this.state.greetings[Math.floor(Math.random() * this.state.greetings.length)];
  }

  render() {
    let content = null;
    let greeting = this.getGreeting();
    if (this.props.user.userName) {
      content = (
        <div>
          <h1
            id="welcome"
          >
            {greeting}, { this.props.user.userName.name }!
          </h1>
          <Link to="/add" style={styles.link}>
            <Button variant="fab" style={styles.addButton}>
              <Add />
            </Button>
          </Link>
          <UpcomingTable />
          <HistoryTable />
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
export default connect(mapStateToProps)(LandingPage);

