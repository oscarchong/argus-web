import React, { Component } from 'react';
import './Login.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import ArgusLogo from '../ArgusLogo.png';
import constants from '../constants/general';
import axios from 'axios';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
       username:'',
       password:'',
       access_token: ''
    }
}

  handleChange = name => event => {
  this.setState({
      [name]: event.target.value
  });
  }

  handleOnClick = () =>{
    var prop = this.props;
      axios.post(constants.host + '/login', {
          'username': this.state.username,
          'password': this.state.password
      })
      .then(data => {
        console.log(data)
        // alert('successful login')
        const credit_var = data.credit
        localStorage.setItem('username', this.state.username)
        localStorage.setItem('password', this.state.password)
        prop.history.push('/Pages/Dash');
      })
      .catch(err => {
        console.log(err)
        alert ('Please register for an account')
      })
  }
  
  render() {

    return (
      <div data-aos="" className="Home">
        <img src  = {ArgusLogo} alt = "logo"/>

        
        <Card
          raised = {true}
          className = "signIn"
          data-aos = "fade-down"
          data-aos-easing = "linear"
          data-aos-duration = "500"
        >
          <form>
            <Typography
              component="h2"
              variant="display2"
              gutterBottom = {true}
              style={{color:'black'}}
            >
              Log In
            </Typography>
            <TextField
              type = "username"
              className=""
              placeholder ="Enter Your Username"
              onChange={this.handleChange('username')}
            />
            <br/>
            <TextField
              type = "password"
              style={{marginTop:'15px'}}
              placeholder ="Enter Your Password"
              onChange={this.handleChange('password')}
            />
            <br/>
            <Button
              onClick={this.handleOnClick}
              variant="outlined"
              style = {{marginTop:'15px'}}
            >
              Log In
            </Button>
          </form>
          <p>New User? </p>
          <Link
            to = '/Pages/Register'
            variant = "outlined"
            style = {{marginTop:'14px'}}
          >
            Register Here
          </Link>
        </Card>
      </div>

    );
  }
}

export default Login;