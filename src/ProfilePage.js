import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FontIcon from 'material-ui/FontIcon';
import axios from 'axios';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import LoginScreen from './Loginscreen'
import ProfileCard from './ProfileCard'
import Nav from './Nav'
import OnlineList from './OnlineList';
import AppBar from 'material-ui/AppBar';
import Loginscreen from './Loginscreen'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentScreen:[],
            profileScreen:[],
            onlineScreen:[],
            loginScreen:[],
            profile:[],
            title: 'My Profile',
            onlineUsers:[],
            interval: ''
        };
        props.parentContext.setState({ loginButtons: [] });
    }

    componentDidMount(){
        // start updating activity when this component mounted
        // interval is 30 seconds
        var interval = setInterval(() => this.updateLastActivity(), 30000);
        this.setState({ interval : interval });

        var apiBaseUrl = this.props.appContext.state.apiEndpoint;
        var self = this;
    
        const headers = {
            Authorization: 'Bearer ' + this.props.token,
        }
    
        axios.get(apiBaseUrl+'/user/profile', {headers:headers})
        .then(function (response) {
            console.log(response);
            if(response.data.success == true) {
                self.setState({ profile : response.data.data });
                var profileScreen = [];
                
                // when load profile is success then load ProfileCard component
                profileScreen.push(<ProfileCard
                    first_name={self.state.profile.first_name}
                    last_name={self.state.profile.last_name}
                    bio={self.state.profile.bio}
                    appContext={self.props.appContext}
                    key={"ProfileCard"}
                />);
                
                // also don't forget to load the Nav
                profileScreen.push(<Nav
                    appContext={self.props.appContext}
                    parentContext={self}
                    key={"Nav"}
                    navChild="0"
                />);
         
                 self.setState({profileScreen : profileScreen});
                 self.setState({currentScreen : profileScreen});
            } else {
                console.log(response.error);
            }
        })
       .catch(function (error) {
         console.log(error);
       });
        
        // load all other pages here
        
        var onlineScreen = [];
        var loginScreen = [];
        
        onlineScreen.push(<OnlineList
            appContext={self.props.appContext}
            parentContext={self}
            key={"OnlineList"}
            fetchOnlineUsers={self.fetchOnlineUsers()}
        />);
    
        onlineScreen.push(<Nav
            appContext={self.props.appContext}
            parentContext={self}
            key={"Nav"}
            navChild="1"
        />);
                       
       loginScreen.push(<Loginscreen
            appContext={self.props.appContext}
            parentContext={self.props.appContext}
            key={"LoginScreen"}
        />);
        
        self.setState({onlineScreen : onlineScreen});
        self.setState({loginScreen : loginScreen});
    }

    fetchOnlineUsers(){

        var apiBaseUrl = this.props.appContext.state.apiEndpoint;
        var self = this;

        const headers = {
            Authorization: 'Bearer ' + this.props.token,
        }

        axios.get(apiBaseUrl+'/user/online_users', { headers:headers })
        .then(function (response) {
            console.log(response);
            if(response.data.success == true){
                self.setState({ onlineUsers : response.data.data });
            } else {
                console.log(response.error);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    updateLastActivity(){
        var apiBaseUrl = this.props.appContext.state.apiEndpoint;
        var self = this;

        const headers = {
            Authorization: 'Bearer ' + this.props.token,
        }

        axios.get(apiBaseUrl+'/user/update_last_activity', {headers:headers})
        .then(function (response) {
            console.log(response);
            if(response.data.success == true){
                console.log("activity updated.");
            }
            else{
                console.log(response.error);
            }
        })
        .catch(function (error) {
            console.log(error);
        });

    }
    
  render() {
    if(this.state.title != 'Login') return (
      <div className="App">
        <MuiThemeProvider>
          <AppBar
            title={this.state.title}
          />
          {this.state.currentScreen}
            <br/>
            {this.state.navigation}
        </MuiThemeProvider>
      </div>
    );
      
    return (
        <div>{this.state.currentScreen}</div>
    );
  }
}

export default App;