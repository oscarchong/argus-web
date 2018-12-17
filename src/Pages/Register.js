import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import './Login.css';
import ArgusLogo from '../ArgusLogo.png';


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            email:'',
            password:'',
            checkPassword:''
        }
    //     this.handleChange = this.handleChange.bind(this);
    //     this.createUser = this.createUser.bind(this);
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    }

    // createUser(e){
    //   e.preventDefault();
    //   var userName = this.state.name;
    //   var userEmail = this.state.email;
    //   var prop = this.props;
    //   if(this.state.checkPassword === this.state.password){
    //      .then(function(){

    //         .then(function(){
    //            prop.history.push('/dashboard');
    //         })
    //         .catch(function (error) {
    //            alert(error.message);
    //         });
    //      })
    //      .catch(function (error) {
    //         alert(error.message);
    //      });
    //   }
    //   else{
    //      alert("Passwords do not match");
    //   }
    // }

    render() {
        return (
            <div data-aos = "" className = "Home">
                <img src  = {ArgusLogo} alt = "logo"/>

                <Card
                    raised = {true}
                    className = "signUp"
                    data-aos="fade-down"
                    data-aos-easing="linear"
                    data-aos-duration="500">
                <Typography
                    component="h2"
                    variant="display2"
                    gutterBottom = {true}
                    style={{color:'black'}}
                >
                    Create your account
                </Typography>
                    <form>
                        < TextField className = ""
                            placeholder = "Full Name"
                            onChange={this.handleChange('name')}
                            />

                        <br/>

                        < TextField
                            className = ""
                            type = 'email'
                            placeholder = "Email Address"
                            style = {{marginTop:'15px'}}
                            onChange={this.handleChange('email')}
                        />

                        <br/>

                        < TextField
                            type = "password"
                            className = ""
                            placeholder = "Password"
                            style = {{marginTop:'15px'}}
                            onChange={this.handleChange('password')}
                        />

                        <br/>

                        < TextField
                            type = "password"
                            className = ""
                            placeholder = "Confirm Password"
                            style = {{marginTop:'15px'}}
                            onChange={this.handleChange('checkPassword')}
                        />

                        <br/>

                        <Button
                            onClick={this.createUser}
                            type = 'submit'
                            variant = "outlined"
                            style = {{marginTop:'15px'}}
                        >
                            Sign Up
                        </Button>

                    </form>

                    <p>Already have an account? </p>
                    <Link
                        to = '/Pages/Login'
                        variant = "outlined"
                        style = {{marginTop:'15px'}}
                    >
                        Log In Here
                    </Link>
                </Card>
            </div>
        );
    }
}

export default Register;