import React, { Component } from 'react';
import './App.css';
import LoginScreen from './Loginscreen';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loginPage : [],
      profileScreen : [],
      apiEndpoint: 'http://localhost/spaceship'
    }
  }
  componentWillMount(){
    var loginPage = [];
    loginPage.push(<LoginScreen appContext={this} key={"login-screen"}/>);
    this.setState({
        loginPage:loginPage
    })
  }
  render() {
    return (
      <div className="App">
        {this.state.loginPage}
        {this.state.profileScreen}
      </div>
    );
  }
}

export default App;
