import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { triggerLogin, formError, clearError } from '../../redux/actions/loginActions';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { FormControl, Input, InputLabel, Button } from '@material-ui/core';
import { amber, teal, grey } from '@material-ui/core/colors';
import './LoginPage.css';

const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

const theme = createMuiTheme({
  palette: {
    primary: grey,
  },
});

const styles = {
  loginButton: {
    margin: '20px 20px 0px 0px',
    backgroundColor: teal[400],
  },
  link: {
    textDecoration: 'none',
    color: 'black',
  },
  registerButton: {
    margin: '20px 20px 0px 0px',
    backgroundColor: amber[400],
  }
}

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    this.props.dispatch(clearError());
  }

  
  componentWillReceiveProps(nextProps) {
    if (nextProps.user.userName) {
      this.props.history.push('/user');
    }
  }

  login = (event) => {
    event.preventDefault();

    if (this.state.email === '' || this.state.password === '') {
      this.props.dispatch(formError());
    } else {
      this.props.dispatch(triggerLogin(this.state.email, this.state.password));
    }
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  renderAlert() {
    if (this.props.login.message !== '') {
      return (
        <h2
          className="alert"
          role="alert"
        >
          { this.props.login.message }
        </h2>
      );
    }
    return (<span />);
  }

  render() {
    return (
      <div>
        { this.renderAlert() }
        <form>
          <h1>Login</h1>
          <MuiThemeProvider theme={theme}>
            <FormControl fullWidth>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                type="text"
                value={this.state.email}
                onChange={this.handleInputChangeFor('email')}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                type="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </FormControl>
            <Button style={styles.loginButton} variant="contained" type="submit" onClick={this.login}>Log In</Button>
            {/* <Button style={styles.registerButton} variant="contained" type="submit"><Link style={styles.link} to="/register">Register</Link></Button> */}
            
          </MuiThemeProvider>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(LoginPage);
