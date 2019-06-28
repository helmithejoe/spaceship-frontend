import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import ProfilePage from './ProfilePage';

class Login extends Component {
  constructor(props){
    super(props);
    
    var loginmessage = "Not registered yet? Please click Register button below.";
    var loginButtons = [];
    loginButtons.push(
      <div key={"Login-Div"}>
      <MuiThemeProvider>
        <div>
           <RaisedButton label={"Register"} primary={true} style={style} onClick={(event) => this.props.parentContext.handleClick(event)}/>
       </div>
       </MuiThemeProvider>
       
      </div>
    );
    
    props.parentContext.setState({ loginmessage: loginmessage });
    props.parentContext.setState({ loginButtons: loginButtons });

    var localloginComponent=[];
    localloginComponent.push(
      <MuiThemeProvider key={"theme"}>
        <div>
         <TextField
           hintText="Enter your email address"
           floatingLabelText="Email"
           onChange={(event,newValue) => this.setState({email:newValue})}
           />
         <br/>
           <TextField
             type="password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <RaisedButton label="Login" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
       </div>
       </MuiThemeProvider>
    )
    this.state={
      email:'',
      password:'',
      loginComponent:localloginComponent,
        errors:'',
        token : ''
    }
  }
  
  handleClick(event){
    var apiBaseUrl = "http://localhost/spaceship";
    var self = this;
    var payload={
      "email":this.state.email,
	    "password":this.state.password,
    }
    axios.post(apiBaseUrl+'/user/login', payload)
   .then(function (response) {
     console.log(response);
     if(response.data.success == true){
       var profileScreen=[];
        self.setState({
            token : response.data.data.jwt_token
        });
       profileScreen.push(<ProfilePage parentContext={self} appContext={self.props.appContext} token={self.state.token} key={"ProfilePage"} />)
       self.props.appContext.setState({loginPage:[], profileScreen:profileScreen})
     }
     else{
       self.setState({
            errors : 'Error : ' + response.data.error.join(' ')
        });
     }
   })
   .catch(function (error) {
     console.log(error);
   });
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
        <AppBar
             title="Login"
           />
        <br/>
        {this.state.errors}
        {this.props.msg}
        </MuiThemeProvider>
        {this.state.loginComponent}
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default Login;
