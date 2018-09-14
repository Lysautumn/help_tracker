import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import grey from '@material-ui/core/colors/grey';
import amber from '@material-ui/core/colors/amber';
import teal from '@material-ui/core/colors/teal';
import Button from '@material-ui/core/Button';
import './RegisterPage.css';

const theme = createMuiTheme({
  palette: {
    primary: grey,
  },
});

const styles = {
  registerButton: {
    margin: '20px 20px 0px 0px',
    backgroundColor: teal[400],
  },
  link: {
    textDecoration: 'none',
    color: 'black',
  },
  cancelButton: {
    margin: '20px 20px 0px 0px',
    backgroundColor: amber[400],
  }
}

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      message: '',
    };
  }

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.name === '' || this.state.email === '' || this.state.password === '') {
      this.setState({
        message: 'Please fill out all fields!',
      });
    } else {
      const body = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      };

      // making the request to the server to post the new user's registration
      axios.post('/api/user/register/', body)
        .then((response) => {
          if (response.status === 201) {
            this.props.history.push('/home');
          } else {
            this.setState({
              message: 'Ooops! That didn\'t work. The username might already be taken. Try again!',
            });
          }
        })
        .catch(() => {
          this.setState({
            message: 'Ooops! Something went wrong! Is the server running?',
          });
        });
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  renderAlert() {
    if (this.state.message !== '') {
      return (
        <h2
          className="alert"
          role="alert"
        >
          {this.state.message}
        </h2>
      );
    }
    return (<span />);
  }

  render() {
    return (
      <div>
        {this.renderAlert()}
        <form>
          <h1>Register User</h1>
          <MuiThemeProvider theme={theme}>
            <FormControl fullWidth>
              <Input
                type="text"
                placeholder="First Name"
                value={this.state.name}
                onChange={this.handleInputChangeFor('name')}
              />
            
            </FormControl>
            <FormControl fullWidth>
              <Input
                type="text"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleInputChangeFor('email')}
              />
            </FormControl>
            <FormControl fullWidth>
              <Input
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </FormControl>
            <Button style={styles.registerButton} variant="contained" type="submit" onClick={this.registerUser}>Register</Button>
            <Button style={styles.cancelButton} variant="contained"><Link to="/home" style={styles.link}>Cancel</Link></Button>
          </MuiThemeProvider>
        </form>
      </div>
    );
  }
}

export default RegisterPage;

