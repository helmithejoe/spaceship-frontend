# spaceship-frontend

This project is build with React.

## Installation

Clone this repository:
```
$ git clone https://github.com/helmithejoe/spaceship-frontend.git
```
Go to project folder:
```
$ cd spaceship-frontend
```
Set up the API endpoint URL inside src/App.js
```
constructor(props) {
    super(props);
    this.state = {
        loginPage : [],
        profileScreen : [],
        apiEndpoint: 'http://localhost:7000'
    }
}
```
Run npm install to download all package dependencies:
```
$ npm install
```
Run npm start to run the application:
```
$ npm start
```
Application will start on port 3000. Open browser to access the application:

[http://localhost:3000](http://localhost:3000)