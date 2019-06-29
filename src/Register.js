import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './Login';

class Register extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            first_name : '',
            last_name : '',
            bio : '',
            email : '',
            password : '',
            errors: '',
            disableButton: false
        }
    }
    
    componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps);
    }
    
    handleClick(event) {
        this.setState({ disableButton: true });
        var apiBaseUrl = this.props.appContext.state.apiEndpoint;
        var self = this;
        
        var payload = {
            "first_name" : this.state.first_name,
            "last_name" : this.state.last_name,
            "bio" : this.state.bio,
            "email" : this.state.email,
            "password" : this.state.password,
        }
        
        axios.post(apiBaseUrl + '/user/signup', payload)
            .then(function(response) {
                console.log(response);
                if (response.data.success == true) {
                    var loginscreen=[];
                    var activate_msg = "Registration success. Please check your email to activate your account.";
                    
                    // push the Login page using original parent istead of {this}
                    loginscreen.push(<Login
                        msg={activate_msg}
                        parentContext={self.props.parentContext}
                        appContext={self.props.appContext}
                        key={"Login"}
                    />);
                                     
                    var loginmessage = "Not registered yet? Please click Register button below.";
                    self.props.parentContext.setState({
                        loginscreen : loginscreen,
                        loginmessage : loginmessage,
                        buttonLabel : "Register",
                        isLogin : true
                    });
                    
                } else {
                    self.setState({
                        errors : 'Error : ' + response.data.error.join(' ')
                    });
                    
                }
                self.setState({ disableButton: false });
            })
            .catch(function(error) {
                console.log(error);
            });
    }
    
    render() {
        var userhintText, userLabel;
        userhintText = "Enter your Email address";
        userLabel = "Email";
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title = "Register"
                        />
                        <br/>
                        <div>{this.state.errors}</div>
                        <TextField
                             hintText = {userhintText}
                             floatingLabelText = {userLabel}
                             onChange = {(event, newValue) => this.setState({ email : newValue })}
                        />
                        <br/>
                        <TextField
                            type = "password"
                            hintText = "Enter your Password"
                            floatingLabelText = "Password"
                            onChange = {(event, newValue) => this.setState({ password : newValue })}
                        />
                        <br/>
                        <TextField
                            hintText = "Enter your First Name"
                            floatingLabelText = "First Name"
                            onChange = {(event, newValue) => this.setState({ first_name : newValue })}
                        />
                        <br/>
                        <TextField
                            hintText = "Enter your Last Name"
                            floatingLabelText = "Last Name"
                            onChange = {(event, newValue) => this.setState({ last_name : newValue })}
                        />
                        <br/>
                        <TextField
                            hintText = "Enter short brief about you"
                            floatingLabelText = "Bio"
                            onChange = {(event, newValue) => this.setState({ bio : newValue })}
                        />
                        <br/>
                        
                        <RaisedButton
                            label = "Register"
                            primary = {true}
                            disabled = {this.state.disableButton}
                            style = {style}
                            onClick = { (event) => this.handleClick(event) }
                        />
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

const style = {
    margin: 15,
};

export default Register;